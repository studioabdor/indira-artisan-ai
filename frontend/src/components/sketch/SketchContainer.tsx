import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SketchUploader from './SketchUploader';
import StyleSelector, { ArchitecturalStyle } from './StyleSelector';
import Visualizer from './Visualizer';

const DEFAULT_STYLES: ArchitecturalStyle[] = [
  {
    id: 'Mughal',
    name: 'Mughal Architecture',
    description: 'Characterized by domes, arches, and intricate geometric patterns',
    imageUrl: '/styles/mughal.jpg'
  },
  {
    id: 'Dravidian',
    name: 'Dravidian Architecture',
    description: 'Known for pyramidal towers and elaborate stone carvings',
    imageUrl: '/styles/dravidian.jpg'
  },
  {
    id: 'Temple',
    name: 'Temple Architecture',
    description: 'Traditional Indian temple design with ornate sculptures',
    imageUrl: '/styles/temple.jpg'
  }
];

export default function SketchContainer() {
  const { t } = useTranslation();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>(DEFAULT_STYLES[0].id);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    try {
      // Create object URL for preview
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);

      // TODO: Implement actual file upload to backend
      setIsProcessing(true);
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      setProcessedImage(imageUrl); // Replace with actual processed image URL
      setIsProcessing(false);
    } catch (error) {
      console.error('Error processing image:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">{t('sketch.title')}</h2>
        <SketchUploader onUpload={handleUpload} isLoading={isProcessing} />
      </div>

      {uploadedImage && (
        <div>
          <h3 className="text-xl font-semibold mb-4">{t('sketch.selectStyle')}</h3>
          <StyleSelector
            styles={DEFAULT_STYLES}
            selectedStyle={selectedStyle}
            onStyleSelect={setSelectedStyle}
          />
        </div>
      )}

      {processedImage && (
        <div>
          <h3 className="text-xl font-semibold mb-4">{t('sketch.visualize')}</h3>
          <Visualizer imageUrl={processedImage} isLoading={isProcessing} />
        </div>
      )}
    </div>
  );
} 