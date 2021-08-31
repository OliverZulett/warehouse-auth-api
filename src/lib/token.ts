import fs from 'fs';
import * as jwt from 'jsonwebtoken';
import path from 'path';

export function createToken(payload: any) {
  const PRIVATE_KEY = fs.readFileSync(
    path.join(process.cwd(), '/certs/auth/keypair.pem')
  );
  return jwt.sign(payload, PRIVATE_KEY, {
    expiresIn: '1h',
    algorithm: 'RS256',
  });
}

export function validateToken(token: any) {
  const PUBLIC_KEY = fs.readFileSync(
    path.join(process.cwd(), '/certs/auth/publickey.crt')
  );
  return jwt.verify(token, PUBLIC_KEY);
}
