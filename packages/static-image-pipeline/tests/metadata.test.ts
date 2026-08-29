/**
 * Test suite: metadata extraction
 */

import { extractMetadata, type ImageMetadata } from '../src/metadata/extractMetadata.js';

async function testExtractMetadata() {
  console.log('[TEST] extractMetadata stub');
  try {
    // TODO: Test with real image file
    console.log('[TEST] Implementation pending...');
  } catch (err) {
    console.error('[TEST] Error:', err);
  }
}

async function runTests() {
  await testExtractMetadata();
}

runTests().catch(console.error);
