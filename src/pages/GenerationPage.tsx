import React, { useState } from 'react';
import { SketchCanvas } from '../components/SketchCanvas';
import { StyleSelector, ArchitecturalStyle } from '../components/StyleSelector';
import { generateFromSketch, SketchGenerationParams } from '../lib/api';
import { useTranslation } from 'react-i18next';

export const GenerationPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [sketchDataUrl, setSketchDataUrl] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
    setError(null);
  };

  const handleSketchChange = (dataUrl: string) => {
    setSketchDataUrl(dataUrl);
    setError(null);
  };

  const dataURLtoFile = (dataUrl: string, filename: string): File => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleGenerate = async () => {
    try {
      if (!selectedStyle) {
        setError(t('errors.selectStyle'));
        return;
      }

      if (!sketchDataUrl) {
        setError(t('errors.drawSketch'));
        return;
      }

      setIsGenerating(true);
      setError(null);

      const sketchFile = dataURLtoFile(sketchDataUrl, 'sketch.png');
      
      const params: SketchGenerationParams = {
        sketch: sketchFile,
        prompt: `${selectedStyle} style building, architectural visualization`,
        num_inference_steps: 30,
        guidance_scale: 7.5,
        strength: 0.75,
      };

      const result = await generateFromSketch(params);
      const imageUrl = URL.createObjectURL(result);
      setGeneratedImage(imageUrl);
    } catch (err) {
      setError(t('errors.generation'));
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('generation.title')}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">{t('generation.sketch')}</h2>
          <SketchCanvas onSketchChange={handleSketchChange} />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">{t('generation.style')}</h2>
          <StyleSelector
            selectedStyle={selectedStyle}
            onStyleSelect={handleStyleSelect}
            styles={[]} // Will be populated from props or context
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className={`
            px-8 py-3 rounded-lg text-white font-semibold
            ${isGenerating
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'}
          `}
        >
          {isGenerating ? t('generation.generating') : t('generation.generate')}
        </button>
      </div>

      {generatedImage && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">{t('generation.result')}</h2>
          <div className="rounded-lg overflow-hidden">
            <img
              src={generatedImage}
              alt="Generated architectural visualization"
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}; 