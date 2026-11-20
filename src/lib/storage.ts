import { storage, isFirebaseConfigured } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export interface UploadResult {
  url: string;
  source: "firebase" | "server";
  fileName: string;
}

/**
 * Uploads an image file to Firebase Storage if configured,
 * otherwise safely falls back to the persistent server-side storage endpoint (/api/upload).
 * Never relies only on temporary in-memory FileReader or browser localStorage base64 data.
 */
export async function uploadImageFile(
  file: File,
  folder: string = "profile",
  authToken?: string
): Promise<UploadResult> {
  // Validate file type
  const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
  if (!validTypes.includes(file.type)) {
    throw new Error("Invalid image format. Supported formats: JPEG, PNG, WebP, GIF, SVG.");
  }

  // Max 10MB limit
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("Image file exceeds the 10MB upload limit.");
  }

  const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const uniqueFileName = `${Date.now()}-${cleanFileName}`;

  // 1. Attempt Firebase Storage upload if configured
  if (isFirebaseConfigured && storage) {
    try {
      const storageRef = ref(storage, `${folder}/${uniqueFileName}`);
      const uploadSnapshot = await uploadBytes(storageRef, file, {
        contentType: file.type,
        customMetadata: {
          originalName: file.name,
          uploadedAt: new Date().toISOString(),
        },
      });
      const downloadUrl = await getDownloadURL(uploadSnapshot.ref);

      return {
        url: downloadUrl,
        source: "firebase",
        fileName: uniqueFileName,
      };
    } catch (firebaseError) {
      console.warn(
        "Firebase Storage upload encountered an issue, falling back to server disk storage:",
        firebaseError
      );
    }
  }

  // 2. Persistent Server Disk Storage (/api/upload)
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const headers: Record<string, string> = {};
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const response = await fetch("/api/upload", {
    method: "POST",
    headers,
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Upload failed with HTTP ${response.status}`);
  }

  const result = await response.json();
  return {
    url: result.url,
    source: "server",
    fileName: result.fileName || uniqueFileName,
  };
}
