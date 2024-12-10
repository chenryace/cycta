import React from 'react';
import { HiPhotograph, HiClipboard, HiExternalLink } from 'react-icons/hi';
import { Button } from '../ui/Button';
import { copyToClipboard } from '../../utils/clipboard';
import type { UploadedImage } from '../../types/image';

interface ImageListProps {
  images: UploadedImage[];
}

export const ImageList: React.FC<ImageListProps> = ({ images }) => {
  if (images.length === 0) return null;

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-white mb-4">已上传的图片</h3>
      <div className="space-y-4">
        {images.map((image, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <HiPhotograph className="h-6 w-6 text-blue-500" />
                <div>
                  <span className="text-gray-300 truncate block">{image.name}</span>
                  <span className="text-sm text-gray-400">
                    {formatFileSize(image.size)} • {formatDate(image.uploadedAt)}
                  </span>
                </div>
              </div>
              <a
                href={image.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400"
              >
                <HiExternalLink className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between items-center bg-gray-800 p-2 rounded">
                <span className="text-sm text-gray-400">URL</span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => copyToClipboard(image.url)}
                >
                  <HiClipboard className="h-4 w-4 mr-1" />
                  复制链接
                </Button>
              </div>
              <div className="flex justify-between items-center bg-gray-800 p-2 rounded">
                <span className="text-sm text-gray-400">Markdown</span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => copyToClipboard(`![${image.name}](${image.url})`)}
                >
                  <HiClipboard className="h-4 w-4 mr-1" />
                  复制 Markdown
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};