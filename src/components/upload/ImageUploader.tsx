import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { compressImage } from '../../utils/imageCompression';
import { uploadToS3 } from '../../lib/s3';
import { DropZone } from './DropZone';
import { ImageList } from './ImageList';
import { UploadProgress, type UploadProgressItem } from './UploadProgress';
import type { UploadedImage } from '../../types/image';

export const ImageUploader: React.FC = () => {
  const [uploads, setUploads] = useState<UploadedImage[]>([]);
  const [uploadProgress, setUploadProgress] = useState<UploadProgressItem[]>([]);

  const handleDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploadProgress(acceptedFiles.map(file => ({
      fileName: file.name,
      progress: 0
    })));

    const uploadPromises = acceptedFiles.map(async (file, index) => {
      try {
        const compressedFile = await compressImage(file);
        const key = `images/${Date.now()}-${file.name}`;
        
        // 模拟上传进度
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => prev.map((p, i) => 
            i === index ? { ...p, progress: Math.min(p.progress + 10, 90) } : p
          ));
        }, 200);

        const url = await uploadToS3(compressedFile, key);
        
        clearInterval(progressInterval);
        setUploadProgress(prev => prev.map((p, i) => 
          i === index ? { ...p, progress: 100 } : p
        ));

        return {
          url,
          name: file.name,
          size: compressedFile.size,
          type: compressedFile.type,
          uploadedAt: new Date().toISOString()
        };
      } catch (error) {
        console.error('上传失败:', error);
        toast.error(`${file.name} 上传失败`);
        return null;
      }
    });

    const results = await Promise.all(uploadPromises);
    const successfulUploads = results.filter((result): result is UploadedImage => result !== null);
    
    setUploads(prev => [...successfulUploads, ...prev]);
    setTimeout(() => setUploadProgress([]), 1000); // 清除进度条
    
    toast.success(`成功上传 ${successfulUploads.length} 张图片`);
  }, []);

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <DropZone onDrop={handleDrop} />
      <UploadProgress progress={uploadProgress} />
      <ImageList images={uploads} />
    </div>
  );
};