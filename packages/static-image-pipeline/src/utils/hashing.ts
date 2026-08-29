/**
 * Hashing utilities
 * Generate content hashes for image identification
 */

import { createHash } from 'crypto';
import { promises as fs } from 'fs';

export function hashContent(content: Buffer | string): string {
  const hash = createHash('sha256');
  hash.update(content);
  return hash.digest('hex');
}

export async function hashFile(filePath: string): Promise<string> {
  console.log(`[hashing.hashFile] Hashing: ${filePath}`);
  const content = await fs.readFile(filePath);
  return hashContent(content);
}
