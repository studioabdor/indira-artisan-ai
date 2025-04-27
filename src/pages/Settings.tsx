import React from 'react';
import { useTranslation } from 'react-i18next';

const Settings: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('navigation.settings')}</h1>
      <div className="bg-white shadow rounded-lg p-6">
        {/* TODO: Implement settings content */}
        <p className="text-gray-600">Settings content coming soon...</p>
      </div>
    </div>
  );
};

export default Settings; 