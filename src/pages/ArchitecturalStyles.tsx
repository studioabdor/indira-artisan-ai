import React from 'react';
import { useTranslation } from 'react-i18next';
import ArchitecturalStyleList from '@/components/ArchitecturalStyleList';

const ArchitecturalStyles: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('architecturalStyles.title')}</h1>
      <ArchitecturalStyleList />
    </div>
  );
};

export default ArchitecturalStyles; 