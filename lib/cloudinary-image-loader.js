/**
 * Cloudinary image loader for Next.js (used when NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is set).
 */
module.exports = function cloudinaryLoader({ src, width, quality }) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const folder = process.env.CLOUDINARY_FOLDER || "letmehelpyourealtor";

  if (!cloudName) {
    return src;
  }

  const path = src.startsWith("http")
    ? src
    : `https://res.cloudinary.com/${cloudName}/image/upload`;

  if (src.startsWith("http")) {
    const params = ["f_auto", "q_" + (quality || 80), "w_" + width].join(",");
    return src.replace("/upload/", "/upload/" + params + "/");
  }

  const publicId = src.startsWith("/") ? src.slice(1) : src;
  const params = ["f_auto", "q_" + (quality || 80), "w_" + width].join(",");
  return `https://res.cloudinary.com/${cloudName}/image/upload/${params}/${folder}/${publicId}`;
};
