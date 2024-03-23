# @v19/hotp

A simple implementation of the HMAC-Based One-Time Password Algorithm (HOTP) as specified in [RFC 4226](https://datatracker.ietf.org/doc/html/rfc4226).

## Usage

```typescript
import { generateKey, hotp } from "@v19/hotp";

const key = await generateKey(128); // Generate a 128-bit key
const otp = await hotp(key, 0, 6); // Generate a 6-digit OTP for counter 0
```
