/**
 * Glob pattern utilities
 * File matching with glob patterns
 */

import fg from 'fast-glob';
import path from 'path';

export async function globFiles(
  pattern: string,
  baseDir?: string
): Promise<string[]> {
  console.log(`[glob.globFiles] Pattern: ${pattern}`, baseDir ? `in ${baseDir}` : '');
  
  try {
    const files = await fg(pattern, {
      cwd: baseDir,
      absolute: false,
    });
    
    return files.map((file) => (baseDir ? path.join(baseDir, file) : file));
  } catch (error) {
    console.error('[glob.globFiles] Error:', error);
    return [];
  }
}

export function isImageFile(filePath: string): boolean {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'];
  const ext = filePath.toLowerCase().substring(filePath.lastIndexOf('.'));
  return imageExtensions.includes(ext);
}
