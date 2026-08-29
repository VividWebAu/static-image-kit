/**
 * Glob pattern utilities
 * File matching with glob patterns
 */

export async function globFiles(
  pattern: string,
  baseDir?: string
): Promise<string[]> {
  // TODO: Implement glob pattern matching
  throw new Error('Not implemented');
}

export function isImageFile(filePath: string): boolean {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'];
  const ext = filePath.toLowerCase().substring(filePath.lastIndexOf('.'));
  return imageExtensions.includes(ext);
}
