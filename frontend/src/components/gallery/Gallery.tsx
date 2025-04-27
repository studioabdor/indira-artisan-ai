import React from 'react';
import { motion } from 'framer-motion';
import { CloudDownloadIcon, ShareIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

export interface Design {
  id: string;
  imageUrl: string;
  prompt: string;
  style: string;
  createdAt: string;
}

interface GalleryProps {
  designs: Design[];
  isLoading: boolean;
  error?: string;
  onDownload: (design: Design) => void;
  onShare: (design: Design) => void;
}

export default function Gallery({
  designs,
  isLoading,
  error,
  onDownload,
  onShare,
}: GalleryProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-indigo-600 hover:text-indigo-500"
          >
            {t('common.tryAgain')}
          </button>
        </div>
      </div>
    );
  }

  if (designs.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-gray-500">{t('gallery.noDesigns')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {designs.map((design) => (
        <motion.div
          key={design.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="relative group">
            <img
              src={design.imageUrl}
              alt={design.prompt}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex space-x-4">
                <button
                  onClick={() => onDownload(design)}
                  className="p-2 rounded-full bg-white text-gray-700 hover:text-indigo-600 transition-colors"
                  title={t('gallery.download')}
                >
                  <CloudDownloadIcon className="h-6 w-6" />
                </button>
                <button
                  onClick={() => onShare(design)}
                  className="p-2 rounded-full bg-white text-gray-700 hover:text-indigo-600 transition-colors"
                  title={t('gallery.share')}
                >
                  <ShareIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-500 mb-2">{design.prompt}</p>
            <div className="flex justify-between items-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                {t(`styles.${design.style}`)}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(design.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 