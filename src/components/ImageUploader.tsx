import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { compressImage } from '../../utils/imageCompression';
import { uploadToS3 } from '../../lib/s3';
import { DropZone } from './DropZone';
import { ImageList } from './ImageList';
import { UploadProgress } from './UploadProgress';
import type { UploadedImage } from '../../types/image';
import type { UploadProgressItem } from './UploadProgress';

export const ImageUploader: React.FC = () => {
  const [uploads, setUploads] = useState<UploadedImage[]>([]);
  const [uploadProgress, setUploadProgress] = useState<UploadProgressItem[]>([]);

  const handleDrop = useCallback(async (acceptedFiles: File[]) => {
    // 初始化进度条状态
    const newProgress = acceptedFiles.map(file => ({
      fileName: file.name,
      progress: 0
    }));
    setUploadProgress(newProgress);

    const uploadPromises = acceptedFiles.map(async (file, index) => {
      try {
        // 压缩图片
        const compressedFile = await compressImage(file);
        const key = `images/${Date.now()}-${file.name}`;
        
        // 模拟上传进度
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => {
            const updatedProgress = [...prev];
            updatedProgress[index] = { ...updatedProgress[index], progress: Math.min(updatedProgress[index].progress + 10, 90) };
            return updatedProgress;
          });
        }, 200);

        // 上传到 S3
        const url = await uploadToS3(compressedFile, key);

        clearInterval(progressInterval); // 上传完成，清除进度模拟
        setUploadProgress(prev => {
          const updatedProgress = [...prev];
          updatedProgress[index] = { ...updatedProgress[index], progress: 100 };
          return updatedProgress;
        });

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
    
    // 更新上传成功的图片列表
    setUploads(prev => [...successfulUploads, ...prev]);

    // 延迟清除上传进度
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
