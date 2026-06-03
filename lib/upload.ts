import { mkdir, writeFile } from "fs/promises";
import { createHash } from "crypto";
import path from "path";

const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];

function hasCloudinaryConfig() {
  return Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);
}

async function uploadToCloudinary(file: File, folder = "general") {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME as string;
  const apiKey = process.env.CLOUDINARY_API_KEY as string;
  const apiSecret = process.env.CLOUDINARY_API_SECRET as string;
  const timestamp = Math.round(Date.now() / 1000).toString();
  const cloudFolder = `saving-trendz/${folder}`;
  const signatureBase = `folder=${cloudFolder}&timestamp=${timestamp}${apiSecret}`;
  const signature = createHash("sha1").update(signatureBase).digest("hex");

  const body = new FormData();
  body.append("file", file);
  body.append("api_key", apiKey);
  body.append("timestamp", timestamp);
  body.append("folder", cloudFolder);
  body.append("signature", signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error?.message || "Cloudinary image upload failed.");
  }

  return String(data.secure_url || "");
}

async function uploadLocally(file: File, folder = "general") {
  const bytes = Buffer.from(await file.arrayBuffer());
  const safeName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/-+/g, "-");
  const filename = `${Date.now()}-${safeName}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);

  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), bytes);

  return `/uploads/${folder}/${filename}`;
}

export async function saveUploadedFile(file: File | null, folder = "general") {
  if (!file || file.size === 0) return "";

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Only image files are allowed.");
  }

  if (hasCloudinaryConfig()) {
    return uploadToCloudinary(file, folder);
  }

  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    throw new Error("Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in Vercel Environment Variables.");
  }

  return uploadLocally(file, folder);
}

export function formValue(form: FormData, key: string, fallback = "") {
  const value = form.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

export function numberValue(form: FormData, key: string, fallback = 0) {
  const value = Number(form.get(key));
  return Number.isFinite(value) ? value : fallback;
}

export function boolValue(form: FormData, key: string, fallback = false) {
  const value = form.get(key);
  if (value === null) return fallback;
  return value === "on" || value === "true" || value === "1";
}
