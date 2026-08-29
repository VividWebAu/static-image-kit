/**
 * Glob pattern utilities
 * File matching with glob patterns
 */

export async function globFiles(
  pattern: string,
  baseDir?: string
): Promise<string[]> {
  console.log(`[glob.globFiles] Pattern: ${pattern}`, baseDir ? `in ${baseDir}` : '');
  // TODO: Implement glob pattern matching using fast-glob
  throw new Error('globFiles not implemented yet');
}

export function isImageFile(filePath: string): boolean {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'];
  const ext = filePath.toLowerCase().substring(filePath.lastIndexOf('.'));
  return imageExtensions.includes(ext);
}
