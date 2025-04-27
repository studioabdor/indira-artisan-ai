import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArchitecturalStyle } from '../types';

interface GenerationResult {
  imageUrl: string;
  prompt: string;
  style: ArchitecturalStyle;
}

export default function Generator() {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<ArchitecturalStyle>('Contemporary');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);

  const architecturalStyles: ArchitecturalStyle[] = [
    'Mughal',
    'Dravidian',
    'Rajput',
    'Bengal',
    'Modern',
    'Contemporary',
    'Indo-Saracenic',
    'Buddhist',
    'Temple',
    'Colonial'
  ];

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      // TODO: Implement API call to backend
      const response = await fetch('/api/v1/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          style: selectedStyle,
        }),
      });

      if (!response.ok) {
        throw new Error('Generation failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Generation error:', error);
      // TODO: Implement error handling
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-8">
            {t('generator.title')}
          </h1>

          <div className="space-y-6">
            {/* Prompt Input */}
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
                {t('generator.promptLabel')}
              </label>
              <div className="mt-1">
                <textarea
                  id="prompt"
                  rows={4}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
            </div>

            {/* Style Selection */}
            <div>
              <label htmlFor="style" className="block text-sm font-medium text-gray-700">
                {t('generator.styleLabel')}
              </label>
              <select
                id="style"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value as ArchitecturalStyle)}
              >
                {architecturalStyles.map((style) => (
                  <option key={style} value={style}>
                    {t(`styles.${style}`)}
                  </option>
                ))}
              </select>
            </div>

            {/* Generate Button */}
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
            >
              {isGenerating ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {t('generator.generating')}
                </>
              ) : (
                t('generator.generate')
              )}
            </button>
          </div>

          {/* Result Display */}
          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src={result.imageUrl}
                  alt={result.prompt}
                  className="w-full h-auto"
                />
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {/* TODO: Implement download */}}
                >
                  {t('generator.download')}
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {/* TODO: Implement share */}}
                >
                  {t('generator.share')}
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 