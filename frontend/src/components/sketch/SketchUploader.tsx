import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

interface SketchUploaderProps {
  onUpload: (file: File) => void;
  isLoading?: boolean;
}

export default function SketchUploader({ onUpload, isLoading = false }: SketchUploaderProps) {
  const { t } = useTranslation();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.svg']
    },
    maxFiles: 1,
    disabled: isLoading
  });

  return (
    <div
      {...getRootProps()}
      className={`
        w-full p-8 border-2 border-dashed rounded-lg text-center cursor-pointer
        transition-colors duration-200 ease-in-out
        ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <input {...getInputProps()} />
      <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        {isDragActive
          ? t('sketch.dropHere')
          : t('sketch.dragAndDrop')}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        {t('sketch.supportedFormats')}
      </p>
      {isLoading && (
        <div className="mt-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500 mx-auto" />
          <p className="text-sm text-gray-500 mt-2">{t('sketch.uploading')}</p>
        </div>
      )}
    </div>
  );
} 