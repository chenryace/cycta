import React from 'react';

export interface UploadProgressItem {
  fileName: string;
  progress: number;
}

interface UploadProgressProps {
  progress: UploadProgressItem[];
}

export const UploadProgress: React.FC<UploadProgressProps> = ({ progress }) => {
  if (progress.length === 0) return null;

  return (
    <div className="mt-4 space-y-2">
      {progress.map((item) => (
        <div key={item.fileName} className="bg-gray-700 p-3 rounded">
          <div className="flex justify-between text-sm text-gray-300 mb-1">
            <span className="truncate">{item.fileName}</span>
            <span>{Math.round(item.progress)}%</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};