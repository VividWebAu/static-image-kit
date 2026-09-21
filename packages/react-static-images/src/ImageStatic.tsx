import type { ImgHTMLAttributes } from "react";
import { getStaticImageManifest } from "./manifest-registry.js";
import type { ManifestData } from "./types.js";

function resolveImage(manifest: ManifestData, image: string) {
  function normalizeStaticPath(staticPath: string) {
    return staticPath
      .replace(/\\/g, "/") // Windows → POSIX
      .replace(/^\/+/, ""); // Remove leading slashes
  }

  return manifest.images.find(
    (img) => img.staticPath === normalizeStaticPath(image) || img.id === image,
  );
}

export type ImageLayout = "intrinsic" | "responsive" | "fill" | "fixed";

type Px = `${number}px`;
type Vw = `${number}vw`;
type Percent = `${number}%`;
type NumericFraction = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0 | 1;
type SizeValue = Px | Vw | Percent | NumericFraction;
type SizeBreakpoints = "default" |"2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface ImageStaticProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "sizes"> {
  image: string; // TODO: Implement this as relative path to original image (stabel reference)
  layout?: ImageLayout;
  /** Fallback to the global manifest if not provided */
  manifest?: ManifestData;
  /** Whether the image should be prioritized for loading; sets the `loading`, `fetchPriority` and `decoding` attributes accordingly */
  priority?: boolean;
  /** Extend `sizes` to include an object mapping media queries to sizes */
  sizes?: string | { [key in SizeBreakpoints]?: SizeValue };
}

export function ImageStatic({
  alt,
  image,
  layout = "intrinsic",
  manifest,
  priority,
  width,
  height,
  sizes = "100vw",
  ...props
}: ImageStaticProps) {
  const manifestToUse = manifest ?? getStaticImageManifest();

  const manifestItem = manifestToUse ? resolveImage(manifestToUse, image) : null;

  if (!manifestItem) {
    return <img src={image} alt={alt} {...props} />;
  }

  // --- SIZES ---
  const breakpointMap: Record<
    SizeBreakpoints,
    string
  > = {
    default: "0px",
    "2xs": "360px",
    xs: "480px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  };

  const normalizeSizeValue = (value: SizeValue) =>
    typeof value === "string" && value.endsWith("%")
      ? `${value.slice(0, -1)}vw`
      : typeof value === "string" && value.endsWith("px")
        ? value
        : typeof value === "string" && value.endsWith("vw")
          ? value
          : typeof value === "number"
            ? `${value * 100}vw`
            : value;

  if (typeof sizes === "object") {
    sizes = Object.entries(sizes)
      .map(
        ([key, value]) =>
          `(min-width: ${breakpointMap[key as keyof typeof breakpointMap]}) ${normalizeSizeValue(value)}`,
      )
      .join(", ");
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
        const variants = manifestItem.variants.filter((v) => v.format === format);
        if (!variants.length) return null;

        const srcSet = variants.map((v) => `${v.src} ${v.width}w`).join(", ");

        return <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />;
      })}

      {/* Fallback original image: */}
      <img
        alt={alt}
        src={manifestItem.srcUnoptimized}
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
