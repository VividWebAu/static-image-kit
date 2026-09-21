/**
 * Default configuration and bootstrap helpers for consumer apps.
 *
 * This keeps the package easy to consume in a Next.js/Vercel app by providing
 * an opinionated default layout and a simple init command.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

export interface StaticImagePipelineConfig {
  input: string;
  output: string;
  outputDir: string;
  widths: number[];
  formats: string[];
  writeVariants: boolean;
}

export const DEFAULT_STATIC_IMAGE_CONFIG: StaticImagePipelineConfig = {
  input: "./static-images",
  output: "./public/.processed-static-images/manifest.static-images.json",
  outputDir: "./public/.processed-static-images",
  widths: [160, 320, 640, 960, 1280],
  formats: ["avif", "webp", "jpeg"],
  writeVariants: true,
};

export function applyDefaultPackageScript(pkg: { scripts?: Record<string, string> } = {}) {
  const scripts = pkg.scripts ?? {};

  if (!scripts["prepare:images"]) {
    scripts["prepare:images"] = "static-image-pipeline run";
  }

  return { ...pkg, scripts };
}

export async function resolvePipelineConfig(options?: {
  cwd?: string;
  configPath?: string;
}): Promise<StaticImagePipelineConfig> {
  const cwd = options?.cwd ?? process.cwd();
  const candidates = options?.configPath
    ? [options.configPath]
    : [
        path.join(cwd, ".static-image-kit.config.mjs"),
        path.join(cwd, ".static-image-kit.config.js"),
        path.join(cwd, "static-image.config.mjs"),
        path.join(cwd, "static-image.config.js"),
      ];

  for (const candidate of candidates) {
    try {
      const configUrl = pathToFileURL(candidate).href;
      const loaded = await import(configUrl);
      const resolved = loaded.default ?? loaded;

      if (resolved && typeof resolved === "object") {
        return {
          ...DEFAULT_STATIC_IMAGE_CONFIG,
          ...resolved,
          widths: Array.isArray(resolved.widths)
            ? resolved.widths
            : DEFAULT_STATIC_IMAGE_CONFIG.widths,
          formats: Array.isArray(resolved.formats)
            ? resolved.formats
            : DEFAULT_STATIC_IMAGE_CONFIG.formats,
        };
      }
    } catch {
      // Ignore missing or invalid config files and fall back to defaults.
    }
  }

  return { ...DEFAULT_STATIC_IMAGE_CONFIG };
}

export async function initializeStaticImageProject(options?: { cwd?: string }): Promise<{
  cwd: string;
  staticImagesDir: string;
  configPath: string;
  gitignorePath: string;
  packageJsonPath: string;
}> {
  const cwd = options?.cwd ?? process.cwd();
  const staticImagesDir = path.join(cwd, "static-images");
  const configPath = path.join(cwd, ".static-image-kit.config.mjs");
  const gitignorePath = path.join(cwd, ".gitignore");
  const packageJsonPath = path.join(cwd, "package.json");

  await fs.mkdir(staticImagesDir, { recursive: true });

  const configFile = `export default ${JSON.stringify(DEFAULT_STATIC_IMAGE_CONFIG, null, 2)};\n`;
  await fs.writeFile(configPath, configFile, "utf8");

  await updateGitignore(gitignorePath);
  await updatePackageJson(packageJsonPath);

  return {
    cwd,
    staticImagesDir,
    configPath,
    gitignorePath,
    packageJsonPath,
  };
}

async function updateGitignore(gitignorePath: string): Promise<void> {
  let content = "";

  try {
    content = await fs.readFile(gitignorePath, "utf8");
  } catch {
    content = "";
  }

  const line = "public/.processed-static-images/";
  const lines = content.split(/\r?\n/);

  if (!lines.includes(line)) {
    lines.push("", line);
    await fs.writeFile(gitignorePath, `${lines.join("\n").replace(/\n{3,}/g, "\n\n")}\n`, "utf8");
  }
}

async function updatePackageJson(packageJsonPath: string): Promise<void> {
  let pkg: { scripts?: Record<string, string> } = { scripts: {} };

  try {
    const raw = await fs.readFile(packageJsonPath, "utf8");
    pkg = JSON.parse(raw);
  } catch {
    pkg = { scripts: {} };
  }

  const updated = applyDefaultPackageScript(pkg);
  await fs.writeFile(packageJsonPath, `${JSON.stringify(updated, null, 2)}\n`, "utf8");
}
