import { createHash } from 'crypto';

function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

export function generateRandomHash(length: number): string {
  const randomBytes = generateRandomString(length);
  const hash = createHash('md5').update(randomBytes).digest('hex');
  return hash.substring(0, length);
}