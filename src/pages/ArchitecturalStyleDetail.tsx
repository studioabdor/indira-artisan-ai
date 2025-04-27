import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArchitecturalStyleDetail from '@/components/ArchitecturalStyleDetail';

const ArchitecturalStyleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  if (!id) {
    return <div className="text-center py-8">{t('architecturalStyles.notFound')}</div>;
  }

  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    return <div className="text-center py-8">{t('architecturalStyles.notFound')}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ArchitecturalStyleDetail id={numericId} />
    </div>
  );
};

export default ArchitecturalStyleDetailPage; 