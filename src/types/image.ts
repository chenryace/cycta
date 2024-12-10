export interface UploadedImage {
  url: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
}

export interface CompressionOptions {
  maxSizeMB: number;
  maxWidthOrHeight: number;
  useWebWorker: boolean;
}