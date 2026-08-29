#!/usr/bin/env node
/**
 * CLI entry point for the static image pipeline
 */

const args = process.argv.slice(2);

function printHelp(): void {
  console.log(`
Static Image Pipeline CLI

Usage:
  static-image-pipeline <command> [options]

Commands:
  run       Run the full image processing pipeline
  help      Show this help message

Example:
  static-image-pipeline run --input ./images --output ./dist
`);
}

async function main(): Promise<void> {
  if (args.length === 0 || args[0] === 'help') {
    printHelp();
    return;
  }

  const command = args[0];
  console.log(`[CLI] Command: ${command}`);
  console.log(`[CLI] Arguments:`, args.slice(1));
  console.log('[CLI] Implementation pending...');
  // TODO: Parse CLI arguments and invoke pipeline
}

main().catch((err) => {
  console.error('[CLI Error]', err);
  process.exit(1);
});
