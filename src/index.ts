import type { webcrypto } from "crypto";

export async function decodeJwk(
  secret: webcrypto.JsonWebKey
): Promise<webcrypto.CryptoKey> {
  return await crypto.subtle.importKey(
    "jwk",
    secret,
    {
      name: "HMAC",
      hash: "SHA-1",
    },
    true,
    ["sign"]
  );
}

export async function hotp(
  key: webcrypto.CryptoKey,
  counter: number,
  digits: number
): Promise<string> {
  const buf = new Uint8Array(8);
  for (let i = buf.length - 1; i >= 0; i--) {
    buf[i] = counter & 0xff;
    counter >>= 8;
  }
  const hash = await crypto.subtle.sign("HMAC", key, buf);
  const offset = new DataView(hash).getInt8(hash.byteLength - 1) & 0xf;
  const binary =
    (new DataView(hash).getInt32(offset) & 0x7fffffff) % Math.pow(10, digits);
  console.log("binary", binary);
  return binary.toString().padStart(digits, "0");
}

export async function generateKey(bits: number): Promise<webcrypto.CryptoKey> {
  return await crypto.subtle.generateKey(
    {
      name: "HMAC",
      hash: "SHA-1",
      length: bits,
    },
    true,
    ["sign"]
  );
}
