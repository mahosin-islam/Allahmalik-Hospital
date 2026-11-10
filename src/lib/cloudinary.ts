import { v2 as cloudinary } from "cloudinary";
import type { UploadApiResponse, UploadApiOptions } from "cloudinary";

cloudinary.config({
  cloud_name:
    process.env.CLOUDINARY_CLOUD_NAME ??
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    (process.env.CLOUDINARY_CLOUD_NAME ??
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

export async function uploadImage(
  file: File | Buffer,
  options?: UploadApiOptions
): Promise<UploadApiResponse> {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in .env"
    );
  }

  const buffer = Buffer.isBuffer(file)
    ? file
    : Buffer.from(await file.arrayBuffer());

  return new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "allahmalik/doctors",
        resource_type: "image",
        ...options,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }
        resolve(result);
      }
    );
    stream.end(buffer);
  });
}

export async function deleteImage(publicId: string): Promise<UploadApiResponse> {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in .env"
    );
  }

  return cloudinary.uploader.destroy(publicId);
}

export function getCloudName(): string {
  return (
    process.env.CLOUDINARY_CLOUD_NAME ??
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ??
    ""
  );
}

export function isOwnCloudinaryUrl(url: string): boolean {
  const cloudName = getCloudName();
  return Boolean(cloudName) && url.includes(`res.cloudinary.com/${cloudName}/`);
}

/**
 * Returns a Cloudinary delivery URL with automatic format + quality optimization.
 * e.g. .../image/upload/v123/id.jpg -> .../image/upload/f_auto,q_auto/v123/id.jpg
 */
export function getOptimizedUrl(url: string): string {
  if (!url.includes("/image/upload/")) return url;
  return url.replace("/image/upload/", "/image/upload/f_auto,q_auto/");
}

export function getPublicIdFromUrl(url: string): string | null {
  const match = url.match(/\/upload\/(.+)$/);
  if (!match) return null;

  const segments = match[1].split("/");
  // Skip delivery transformation segments (e.g. "f_auto,q_auto") and the
  // version segment ("v123") — the public id is everything after them.
  let i = 0;
  while (i < segments.length - 1) {
    const segment = segments[i];
    if (/^v\d+$/.test(segment)) {
      i++;
      break;
    }
    if (segment.includes(",")) {
      i++;
      continue;
    }
    break;
  }

  const path = segments.slice(i).join("/");
  const dotIndex = path.lastIndexOf(".");
  return dotIndex > 0 ? path.slice(0, dotIndex) : null;
}
