/**
 * Clustering orchestration
 * Manages k-means clustering of image feature vectors
 */

export interface ClusterResult {
  clusterId: number;
  members: string[];
  centerColor?: string;
}

export async function clusterBlurs(
  imageFeatures: Record<string, number[]>,
  k?: number
): Promise<ClusterResult[]> {
  // TODO: Implement clustering orchestration
  throw new Error('Not implemented');
}

export { extractFeatures } from './extractFeatures.js';
export { kmeans } from './kmeans.js';
