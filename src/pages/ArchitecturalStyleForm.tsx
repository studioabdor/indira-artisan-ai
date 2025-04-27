import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArchitecturalStyleForm from '@/components/ArchitecturalStyleForm';

const ArchitecturalStyleFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isEditMode = Boolean(id);

  const handleSubmit = async (data: any) => {
    try {
      // TODO: Implement API call to create/update architectural style
      console.log('Form data:', data);
      navigate('/architectural-styles');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {isEditMode ? t('architecturalStyles.edit') : t('architecturalStyles.create')}
      </h1>
      <ArchitecturalStyleForm
        initialData={isEditMode ? undefined : undefined} // TODO: Fetch initial data if in edit mode
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ArchitecturalStyleFormPage; 