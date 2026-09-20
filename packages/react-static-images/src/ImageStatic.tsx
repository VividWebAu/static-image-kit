import type { ImgHTMLAttributes } from "react";
import { ManifestData } from "./types";

function resolveImage(manifest: ManifestData, image: string) {
  return manifest.images.find((img) => img.src === image || img.id === image);
}

export type ImageLayout = "intrinsic" | "responsive" | "fill" | "fixed";

export interface ImageStaticProps extends ImgHTMLAttributes<HTMLImageElement> {
  image: string; // TODO: Implement this as relative path to original image (stabel reference)
  layout?: ImageLayout;
  manifest: ManifestData;
  /** Whether the image should be prioritized for loading; sets the `loading`, `fetchPriority` and `decoding` attributes accordingly */
  priority?: boolean;
}

export function ImageStatic({
  image,
  layout = "intrinsic",
  manifest,
  priority,
  width,
  height,
  sizes = "100vw",
  ...props
}: ImageStaticProps) {
  const manifestItem = resolveImage(manifest, image);

  if (!manifestItem) {
    return <img src={image} {...props} />;
  }

  const wrapperStyle: React.CSSProperties = {};
  const imgStyle: React.CSSProperties = {};

  // --- LAYOUT LOGIC ---
  if (layout === "intrinsic") {
    imgStyle.width = "100%";
    imgStyle.height = "auto";
    Object.assign(imgStyle, props.style);
  }

  if (layout === "responsive") {
    const padding = `${100 / (manifestItem?.aspectRatio ?? 1)}%`;
    wrapperStyle.position = "relative";
    wrapperStyle.width = "100%";
    wrapperStyle.paddingBottom = padding;
    Object.assign(wrapperStyle, props.style);

    imgStyle.position = "absolute";
    imgStyle.inset = "0";
    imgStyle.width = "100%";
    imgStyle.height = "100%";
    imgStyle.objectFit = "cover";
    Object.assign(imgStyle, props.style);
  }

  if (layout === "fill") {
    wrapperStyle.position = "relative";
    wrapperStyle.width = "100%";
    wrapperStyle.height = "100%";
    Object.assign(wrapperStyle, props.style);

    imgStyle.position = "absolute";
    imgStyle.inset = "0";
    imgStyle.width = "100%";
    imgStyle.height = "100%";
    imgStyle.objectFit = props.style?.objectFit ?? "cover";
    Object.assign(imgStyle, props.style);
  }

  if (layout === "fixed") {
    imgStyle.width = width ?? manifestItem?.width;
    imgStyle.height = height ?? manifestItem?.height;
    Object.assign(imgStyle, props.style);
  }

  // --- BLUR PLACEHOLDER ---
  const blur = manifestItem.blurDataURL;
  const consumerOpacity = props.style?.opacity;

  if (blur) {
    imgStyle.backgroundImage = `url(${blur})`;
    imgStyle.backgroundSize = "cover";
    imgStyle.backgroundPosition = "center";
    imgStyle.transition = "opacity 0.4s ease";
    imgStyle.opacity = 0;
  }

  const formats = ["avif", "webp", "jpeg"];

  const pictureElement = (
    <picture>
      {/* Optimized sources: */}
      {formats.map((format) => {
        if (!manifestItem?.variants?.length) return null;
        const variants = manifestItem.variants.filter(
          (v) => v.format === format,
        );
        if (!variants.length) return null;

        const srcSet = variants.map((v) => `${v.src} ${v.width}w`).join(", ");

        return (
          <source
            key={format}
            type={`image/${format}`}
            srcSet={srcSet}
            sizes={sizes}
          />
        );
      })}

      {/* Fallback original image: */}
      <img
        src={manifestItem.src}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding={priority ? undefined : "async"}
        width={width ?? manifestItem.width}
        height={height ?? manifestItem.height}
        style={{ ...imgStyle, opacity: consumerOpacity ?? 1 }}
        {...props}
      />
    </picture>
  );

  if (layout === "fill" || layout === "responsive") {
    return <div style={wrapperStyle}>{pictureElement}</div>;
  }

  return pictureElement;
}
