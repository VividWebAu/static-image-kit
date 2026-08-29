#!/usr/bin/env node
/**
 * CLI entry point for the static image pipeline
 */

import { runPipeline } from './pipeline.js';

const args = process.argv.slice(2);

function printHelp(): void {
  console.log(`
Static Image Pipeline CLI

Usage:
  static-image-pipeline <command> [options]

Commands:
  run       Run the full image processing pipeline
  help      Show this help message

Options:
  --input   Input directory containing images
  --output  Output manifest file path

Example:
  static-image-pipeline run --input ./images --output ./dist/manifest.json
`);
}

function parseArgs(): { input?: string; output?: string } {
  const parsed: { input?: string; output?: string } = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--input' && i + 1 < args.length) {
      parsed.input = args[i + 1];
      i++;
    } else if (args[i] === '--output' && i + 1 < args.length) {
      parsed.output = args[i + 1];
      i++;
    }
  }
  return parsed;
}

async function main(): Promise<void> {
  if (args.length === 0 || args[0] === 'help' || args[0] === '--help') {
    printHelp();
    return;
  }

  const command = args[0];

  if (command === 'run') {
    const { input, output } = parseArgs();

    if (!input || !output) {
      console.error('[CLI] Error: --input and --output are required');
      printHelp();
      process.exit(1);
    }

    try {
      await runPipeline(input, output);
      console.log('[CLI] Pipeline completed successfully');
    } catch (error) {
      console.error('[CLI] Pipeline failed:', error);
      process.exit(1);
    }
  } else {
    console.error(`[CLI] Unknown command: ${command}`);
    printHelp();
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('[CLI Error]', err);
  process.exit(1);
});
