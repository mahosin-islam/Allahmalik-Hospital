import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { uploadImage, isCloudinaryConfigured, getOptimizedUrl } from "@/lib/cloudinary";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/** Only standard photo formats — SVG is intentionally excluded (script injection risk) */
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

const ALLOWED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp"]);

function getExtension(filename: string): string {
  const parts = filename.toLowerCase().split(".");
  return parts.length > 1 ? parts[parts.length - 1] : "";
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Unauthorized — admin access required." },
      { status: 401 }
    );
  }

  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Cloudinary is not configured. Set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in .env",
      },
      { status: 503 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid form data." },
      { status: 400 }
    );
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { success: false, message: "No file provided (expected field: 'file')." },
      { status: 400 }
    );
  }

  if (file.size === 0) {
    return NextResponse.json(
      { success: false, message: "The selected file is empty." },
      { status: 400 }
    );
  }

  const isAllowedMime = ALLOWED_MIME_TYPES.has(file.type);
  const isAllowedExtension = ALLOWED_EXTENSIONS.has(getExtension(file.name));

  // Trust the extension when the browser reports a generic/empty MIME type,
  // but never accept an explicitly disallowed MIME (e.g. image/svg+xml).
  const formatOk = file.type ? isAllowedMime : isAllowedExtension;
  if (!formatOk || !isAllowedExtension) {
    return NextResponse.json(
      {
        success: false,
        message: "Unsupported image format. Only JPG, PNG or WebP photos are allowed.",
      },
      { status: 415 }
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { success: false, message: "File too large. Maximum size is 5MB." },
      { status: 413 }
    );
  }

  try {
    const result = await uploadImage(file);
    return NextResponse.json(
      {
        success: true,
        message: "Image uploaded successfully.",
        url: getOptimizedUrl(result.secure_url),
        publicId: result.public_id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[UPLOAD_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error && error.message.includes("not a valid image file")
            ? "The file could not be read as an image. Please use a valid JPG, PNG or WebP photo."
            : "Failed to upload image. Please try again.",
      },
      { status: 500 }
    );
  }
}
