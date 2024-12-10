import imageCompression from 'browser-image-compression';
import type { CompressionOptions } from '../types/image';

const defaultOptions: CompressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true
};

export const compressImage = async (
  file: File, 
  options: Partial<CompressionOptions> = {}
): Promise<File> => {
  const finalOptions = { ...defaultOptions, ...options };
  
  try {
    return await imageCompression(file, finalOptions);
  } catch (error) {
    console.error('图片压缩失败:', error);
    return file;
  }
};