import { generateSignature } from './generateSignature';

interface IVerifyOptions {
  token: string;
  secret: string;
}

export function verify(options: IVerifyOptions) {
  const { token, secret } = options;

  const [headerSent, payloadSent, signatureSent] = token.split('.');

  const signature = generateSignature({
    header: headerSent,
    payload: payloadSent,
    secret,
  });

  if (signature !== signatureSent) {
    throw new Error('Invalid JWT token');
  }

  const decodedPayload = Buffer.from(payloadSent, 'base64url').toString(
    'utf-8',
  );

  const payload = JSON.parse(decodedPayload);

  if ('exp' in payload && payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('Expired JWT token');
  }

  return payload;
}
