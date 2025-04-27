import React from 'react';
import { useTranslation } from 'react-i18next';

const Profile: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('navigation.profile')}</h1>
      <div className="bg-white shadow rounded-lg p-6">
        {/* TODO: Implement profile content */}
        <p className="text-gray-600">Profile content coming soon...</p>
      </div>
    </div>
  );
};

export default Profile; 