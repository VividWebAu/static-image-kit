#!/usr/bin/env node
/**
 * CLI entry point for the static image pipeline
 */

import { runPipeline, type PipelineOptions } from './pipeline.js';

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
  --input          Input directory containing images (required)
  --output         Output manifest file path (required)
  --output-dir     Output directory for generated variants (optional)
  --widths         Comma-separated list of responsive widths (default: 320,640,960,1280)
  --formats        Comma-separated list of formats (default: webp,jpeg)
  --write-variants Generate responsive image variants (default: false)

Example:
  static-image-pipeline run --input ./images --output ./dist/manifest.json --write-variants --output-dir ./dist/images
`);
}

function parseArgs(): {
  input?: string;
  output?: string;
  outputDir?: string;
  widths?: number[];
  formats?: string[];
  writeVariants?: boolean;
} {
  const parsed: {
    input?: string;
    output?: string;
    outputDir?: string;
    widths?: number[];
    formats?: string[];
    writeVariants?: boolean;
  } = {};
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--input' && i + 1 < args.length) {
      parsed.input = args[i + 1];
      i++;
    } else if (args[i] === '--output' && i + 1 < args.length) {
      parsed.output = args[i + 1];
      i++;
    } else if (args[i] === '--output-dir' && i + 1 < args.length) {
      parsed.outputDir = args[i + 1];
      i++;
    } else if (args[i] === '--widths' && i + 1 < args.length) {
      parsed.widths = args[i + 1]
        .split(',')
        .map((w) => parseInt(w.trim(), 10))
        .filter((w) => !isNaN(w));
      i++;
    } else if (args[i] === '--formats' && i + 1 < args.length) {
      parsed.formats = args[i + 1]
        .split(',')
        .map((f) => f.trim());
      i++;
    } else if (args[i] === '--write-variants') {
      parsed.writeVariants = true;
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
    const { input, output, outputDir, widths, formats, writeVariants } = parseArgs();

    if (!input || !output) {
      console.error('[CLI] Error: --input and --output are required');
      printHelp();
      process.exit(1);
    }

    if (writeVariants && !outputDir) {
      console.error('[CLI] Error: --output-dir is required when --write-variants is used');
      printHelp();
      process.exit(1);
    }

    const options: PipelineOptions = {
      widths,
      formats,
      writeVariants: writeVariants ?? false,
      outputDir,
    };

    try {
      const startTime = Date.now();
      await runPipeline(input, output, options);
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`[CLI] Pipeline completed successfully in ${duration}s`);
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
