import { generateSignature } from './generateSignature';

interface ISignOptions {
  data: Record<string, any>;
  exp: number;
  secret: string;
}

export function sign(options: ISignOptions) {
  const { data, exp, secret } = options;

  // Header
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  // Payload
  const payload = {
    ...data,
    // Issued at (iat)
    iat: Math.floor(Date.now() / 1000),
    exp,
  };

  // Signature
  const base64EncodedHeader = Buffer.from(JSON.stringify(header)).toString(
    'base64url',
  );

  const base64EncodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    'base64url',
  );

  const signature = generateSignature({
    header: base64EncodedHeader,
    payload: base64EncodedPayload,
    secret,
  });

  return `${base64EncodedHeader}.${base64EncodedPayload}.${signature}`;
}
