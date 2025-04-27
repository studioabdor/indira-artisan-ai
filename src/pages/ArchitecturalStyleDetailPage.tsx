import React from 'react';
import { useParams } from 'react-router-dom';
import ArchitecturalStyleDetail from '@/components/ArchitecturalStyleDetail';

const ArchitecturalStyleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const parsedId = parseInt(id || '', 10);

  if (isNaN(parsedId)) {
    return <div>Style not found</div>;
  }

  return <ArchitecturalStyleDetail id={parsedId} />;
};

export default ArchitecturalStyleDetailPage; 