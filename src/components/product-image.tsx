import { useState } from "react";

const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0' stop-color='%23d4c0a3'/><stop offset='1' stop-color='%23a87445'/></linearGradient></defs><rect width='600' height='600' fill='url(%23g)'/><circle cx='300' cy='340' r='110' fill='%237c4a26' opacity='0.55'/><ellipse cx='300' cy='450' rx='150' ry='14' fill='%232d1b13' opacity='0.25'/></svg>`,
  );

export function ProductImage({
  src,
  alt,
  className,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const [err, setErr] = useState(false);
  return (
    <img
      src={err ? FALLBACK : src}
      alt={alt}
      onError={() => setErr(true)}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}
