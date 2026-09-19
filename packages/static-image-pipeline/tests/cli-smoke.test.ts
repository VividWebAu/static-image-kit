import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';

const packageRoot = path.resolve(import.meta.dirname, '..');
const cliPath = path.join(packageRoot, 'dist', 'cli.js');

test('consumer init + run flow creates scaffold and manifest', async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'static-image-kit-cli-'));

  try {
    await fs.mkdir(path.join(tempDir, 'public'), { recursive: true });
    await fs.writeFile(
      path.join(tempDir, 'package.json'),
      JSON.stringify({ name: 'consumer-app', scripts: {} }, null, 2)
    );

    const init = spawnSync(process.execPath, [cliPath, 'init'], {
      cwd: tempDir,
      encoding: 'utf8',
    });

    assert.equal(init.status, 0, init.stderr || init.stdout);

    const staticImagesDir = path.join(tempDir, 'static-images');
    const configPath = path.join(tempDir, '.static-image-kit.config.mjs');
    const manifestPath = path.join(tempDir, 'public', '.processed-static-images', 'manifest.static-images.json');

    await fs.mkdir(staticImagesDir, { recursive: true });

    const sampleImage = path.join(staticImagesDir, 'sample.jpg');
    await sharp({
      create: {
        width: 1200,
        height: 800,
        channels: 3,
        background: { r: 255, g: 0, b: 0 },
      },
    })
      .jpeg({ quality: 80 })
      .toFile(sampleImage);

    const run = spawnSync(process.execPath, [cliPath, 'run'], {
      cwd: tempDir,
      encoding: 'utf8',
    });

    assert.equal(run.status, 0, run.stderr || run.stdout);
    assert.equal(await fs.stat(configPath).then(() => true).catch(() => false), true);
    assert.equal(await fs.stat(manifestPath).then(() => true).catch(() => false), true);
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
});
