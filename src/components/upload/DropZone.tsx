import React from 'react';
import { useDropzone } from 'react-dropzone';
import { HiUpload } from 'react-icons/hi';
import clsx from 'clsx';

interface DropZoneProps {
  onDrop: (files: File[]) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    }
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
        isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-blue-500'
      )}
    >
      <input {...getInputProps()} />
      <HiUpload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-gray-300">
        {isDragActive ? '放开以上传图片...' : '拖拽图片到此处，或点击选择图片'}
      </p>
    </div>
  );
};