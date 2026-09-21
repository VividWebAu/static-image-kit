/**
 * Filesystem utilities
 */

import { promises as fs } from "node:fs";

export async function readDirectory(dirPath: string): Promise<string[]> {
  console.log(`[fs.readDirectory] Reading: ${dirPath}`);
  const entries = await fs.readdir(dirPath);
  return entries;
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function ensureDirectory(dirPath: string): Promise<void> {
  console.log(`[fs.ensureDirectory] Creating: ${dirPath}`);
  await fs.mkdir(dirPath, { recursive: true });
}

export async function readFile(filePath: string): Promise<Buffer> {
  return fs.readFile(filePath);
}

export async function writeFile(filePath: string, content: string | Buffer): Promise<void> {
  await fs.writeFile(filePath, content);
}
