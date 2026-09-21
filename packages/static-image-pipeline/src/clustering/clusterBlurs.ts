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
  k?: number,
): Promise<ClusterResult[]> {
  console.log("[clusterBlurs] Clustering images with k =", k ?? "auto");
  // TODO: Implement clustering orchestration using k-means
  throw new Error("clusterBlurs not implemented yet");
}

export { extractFeatures } from "./extractFeatures.js";
export { kmeans } from "./kmeans.js";
