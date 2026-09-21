import assert from "node:assert/strict";
import test from "node:test";
import {
  applyDefaultPackageScript,
  DEFAULT_STATIC_IMAGE_CONFIG,
  resolvePipelineConfig,
} from "../src/config.ts";

test("default config provides a safe Next/Vercel-friendly setup", () => {
  assert.equal(DEFAULT_STATIC_IMAGE_CONFIG.input, "./static-images");
  assert.equal(
    DEFAULT_STATIC_IMAGE_CONFIG.output,
    "./public/.processed-static-images/manifest.static-images.json",
  );
  assert.equal(DEFAULT_STATIC_IMAGE_CONFIG.outputDir, "./public/.processed-static-images");
  assert.deepEqual(DEFAULT_STATIC_IMAGE_CONFIG.widths, [160, 320, 640, 960, 1280]);
  assert.deepEqual(DEFAULT_STATIC_IMAGE_CONFIG.formats, ["avif", "webp", "jpeg"]);
  assert.equal(DEFAULT_STATIC_IMAGE_CONFIG.writeVariants, true);
});

test("resolvePipelineConfig falls back to defaults when no config file is present", async () => {
  const config = await resolvePipelineConfig({ cwd: "/tmp/project" });

  assert.equal(config.input, "./static-images");
  assert.equal(config.output, "./public/.processed-static-images/manifest.static-images.json");
  assert.equal(config.outputDir, "./public/.processed-static-images");
  assert.equal(config.writeVariants, true);
});

test("applyDefaultPackageScript adds a prepare:images script when not present", () => {
  const pkg = {
    name: "demo-app",
    scripts: {},
  };

  const result = applyDefaultPackageScript(pkg);

  assert.equal(result.scripts["prepare:images"], "static-image-pipeline run");
  assert.equal(result.scripts["build"], undefined);
});

test("applyDefaultPackageScript preserves an existing script value", () => {
  const pkg = {
    name: "demo-app",
    scripts: {
      "prepare:images": "node scripts/custom.js",
    },
  };

  const result = applyDefaultPackageScript(pkg);

  assert.equal(result.scripts["prepare:images"], "node scripts/custom.js");
});
