import type { ImgHTMLAttributes } from "react";
import staticImageManifest from "../static-image-map.js";
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

export type ImageLayout = "contain" | "cover" | "fill" | "fixed";

type Px = `${number}px`;
type Vw = `${number}vw`;
type Percent = `${number}%`;
type NumericFraction = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0 | 1;
type SizeValue = Px | Vw | Percent | NumericFraction;
type SizeBreakpoints = "default" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface ImageStaticProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "sizes"> {
  /** The source image to be displayed. Can be a path to the image or an image ID from the manifest. */
  image: string;
  /**
   * The layout behavior of the image. Can be one of:
   * - "contain": The image will be scaled to fit within its container while maintaining its aspect ratio.
   * - "cover": The image will be scaled to cover its container while maintaining its aspect ratio.
   * - "fill": The image will stretch to fill its container, ignoring its aspect ratio.
   * - "fixed": The image will have a fixed size based on the `width` and `height` props.
   */
  layout?: ImageLayout;
  /** Fallback to the global manifest if not provided */
  manifest?: ManifestData;
  /**
   * Whether the image should be prioritized for loading; sets the `loading`, `fetchPriority` and `decoding` attributes accordingly.
   */
  priority?: boolean;
  /**
   * The sizes attribute specifies the layout width of the image for different viewport sizes.
   * Can be a string (e.g., "100vw") or an object mapping breakpoints to size values.
   */
  sizes?: string | { [key in SizeBreakpoints]?: SizeValue };
  /** The horizontal position of the image within its container */
  positionX?: "left" | "center" | "right";
  /** The vertical position of the image within its container */
  positionY?: "top" | "center" | "bottom";
}

/**
 * A pure RSC component for displaying static images with support for responsive sizes, layout options, and positioning.
 */
export function ImageStatic({
  alt,
  image,
  layout = "contain",
  manifest,
  priority,
  width,
  height,
  sizes = "100vw",
  positionX,
  positionY,
  ...props
}: ImageStaticProps) {
  const manifestToUse = manifest ?? staticImageManifest;

  const manifestIsEmpty = !manifestToUse?.images || manifestToUse.images.length === 0;
  if (manifestIsEmpty) {
    return <img src={image} alt={alt} {...props} />;
  }

  const manifestItem = manifestToUse ? resolveImage(manifestToUse, image) : null;
  if (!manifestItem) {
    return <img src={image} alt={alt} {...props} />;
  }

  // --- SIZES ---
  const breakpointMap: Record<SizeBreakpoints, string> = {
    "2xl": "1536px",
    xl: "1280px",
    lg: "1024px",
    md: "768px",
    sm: "640px",
    xs: "480px",
    "2xs": "360px",
    default: "0px",
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
    const sizesObject = sizes as Exclude<typeof sizes, string>;
    const responsiveSizes = Object.entries(breakpointMap)
      .filter(([key]) => key in sizesObject)
      .map(
        ([key]) =>
          `(min-width: ${breakpointMap[key as keyof typeof breakpointMap]}) ${normalizeSizeValue(sizesObject[key as keyof typeof sizesObject] ?? "100vw")}`,
      )
      .join(", ");
    sizes = responsiveSizes;
  }

  const imgStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
  };

  // --- LAYOUT LOGIC ---
  if (layout === "fixed") {
    imgStyle.objectFit = "none";
    imgStyle.width = width ? `${width}px` : "auto";
    imgStyle.height = height ? `${height}px` : "auto";
  } else {
    imgStyle.objectFit = layout;
  }

  // --- POSITION LOGIC ---
  imgStyle.objectPosition = `${positionY ?? "center"} ${positionX ?? "center"}`;

  Object.assign(imgStyle, props.style);

  // --- BLUR PLACEHOLDER ---
  const blur = manifestItem.blurDataURL;

  if (blur && layout !== "contain") {
    imgStyle.backgroundImage = `url(${manifestItem.blurDataURL})`;
    imgStyle.backgroundSize = "cover";
    imgStyle.backgroundPosition = "center";
  }

  const formats = ["avif", "webp", "jpeg"];

  return (
    <picture id="image-static-picture">
      {/* Optimized sources: */}
      {formats.map((format) => {
        if (!manifestItem?.variants?.length) return null;
        const variants = manifestItem.variants.filter((v) => v.format === format);
        if (!variants.length) return null;

        const srcSet = variants.map((v) => `${v.src} ${v.width}w`).join(", ");

        return (
          <source
            key={format}
            id={`image-static-source-${format}`}
            type={`image/${format}`}
            srcSet={srcSet}
            sizes={sizes}
          />
        );
      })}

      {/* Fallback original image: */}
      <img
        id="image-static-img"
        alt={alt}
        src={manifestItem.srcUnoptimized}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding={priority ? undefined : "async"}
        width={width ?? manifestItem.width}
        height={height ?? manifestItem.height}
        style={imgStyle}
        {...props}
      />
    </picture>
  );
}
