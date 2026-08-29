/**
 * Test suite: clustering functionality
 */

import { kmeans, euclideanDistance } from '../src/clustering/kmeans.js';

async function testKmeans() {
  console.log('[TEST] k-means clustering');
  try {
    const vectors = [
      [1, 1],
      [1, 2],
      [10, 10],
      [10, 11],
    ];
    const result = kmeans(vectors, 2, 10);
    console.log('[TEST] Result:', result);
  } catch (err) {
    console.error('[TEST] Error:', err);
  }
}

async function testEuclideanDistance() {
  console.log('[TEST] euclidean distance');
  const a = [0, 0];
  const b = [3, 4];
  const distance = euclideanDistance(a, b);
  console.log(`[TEST] Distance between ${JSON.stringify(a)} and ${JSON.stringify(b)}: ${distance}`);
}

async function runTests() {
  await testEuclideanDistance();
  await testKmeans();
}

runTests().catch(console.error);
