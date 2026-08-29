/**
 * Hashing utilities
 * Generate content hashes for image identification
 */

import { createHash } from 'crypto';

export function hashContent(content: Buffer | string): string {
  const hash = createHash('sha256');
  hash.update(content);
  return hash.digest('hex');
}

export async function hashFile(filePath: string): Promise<string> {
  // TODO: Implement file hashing
  throw new Error('Not implemented');
}
