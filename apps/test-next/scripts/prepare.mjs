#!/usr/bin/env node
/**
 * Prepare test environment
 * Generates sample images and builds manifest
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function runScript(scriptPath, description) {
  return new Promise((resolve, reject) => {
    console.log(`\n[prepare] ${description}...`);

    const proc = spawn('node', [scriptPath]);

    proc.stdout?.on('data', (data) => {
      process.stdout.write(data);
    });

    proc.stderr?.on('data', (data) => {
      process.stderr.write(data);
    });

    proc.on('close', (code) => {
      if (code === 0) {
        console.log(`[prepare] ✓ ${description} completed`);
        resolve(undefined);
      } else {
        reject(new Error(`${description} failed with exit code ${code}`));
      }
    });

    proc.on('error', (error) => {
      reject(error);
    });
  });
}

async function prepare() {
  try {
    console.log('[prepare] Starting test environment preparation...');

    // Step 1: Generate sample images
    await runScript(
      path.join(__dirname, 'generate-sample-images.mjs'),
      'Generating sample test images'
    );

    // Step 2: Build manifest
    await runScript(
      path.join(__dirname, 'build-manifest.mjs'),
      'Building image manifest'
    );

    console.log('\n[prepare] ✓ Test environment ready!');
    process.exit(0);
  } catch (error) {
    console.error('\n[prepare] ✗ Preparation failed:', error);
    process.exit(1);
  }
}

prepare();
