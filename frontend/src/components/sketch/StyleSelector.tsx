import React from 'react';
import { useTranslation } from 'react-i18next';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export interface ArchitecturalStyle {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface StyleSelectorProps {
  styles: ArchitecturalStyle[];
  selectedStyle: string;
  onStyleSelect: (styleId: string) => void;
}

export default function StyleSelector({
  styles,
  selectedStyle,
  onStyleSelect,
}: StyleSelectorProps) {
  const { t } = useTranslation();

  return (
    <RadioGroup value={selectedStyle} onChange={onStyleSelect}>
      <RadioGroup.Label className="sr-only">
        {t('sketch.selectStyle')}
      </RadioGroup.Label>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {styles.map((style) => (
          <RadioGroup.Option
            key={style.id}
            value={style.id}
            className={({ active, checked }) => `
              ${active ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}
              ${checked ? 'bg-indigo-50 border-indigo-500' : 'bg-white border-gray-200'}
              relative border rounded-lg p-4 cursor-pointer focus:outline-none
            `}
          >
            {({ checked }) => (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <RadioGroup.Label
                        as="p"
                        className="font-medium text-gray-900"
                      >
                        {t(`styles.${style.id}`)}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="p"
                        className="text-gray-500"
                      >
                        {style.description}
                      </RadioGroup.Description>
                    </div>
                  </div>
                  {checked && (
                    <CheckCircleIcon
                      className="h-5 w-5 text-indigo-600"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="mt-4">
                  <img
                    src={style.imageUrl}
                    alt={style.name}
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
} 