import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import LanguageSwitcher from './LanguageSwitcher';

const Navigation: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Indira Artisan AI
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/')
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {t('navigation.home')}
              </Link>
              <Link
                to="/architectural-styles"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/architectural-styles')
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {t('navigation.styles')}
              </Link>
              <Link
                to="/create"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/create')
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {t('navigation.create')}
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <div className="hidden md:flex space-x-4">
              <Link
                to="/profile"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/profile')
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {t('navigation.profile')}
              </Link>
              <Link
                to="/settings"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/settings')
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {t('navigation.settings')}
              </Link>
            </div>
            <Button variant="outline" className="hidden md:block">
              {t('auth.login')}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/')
                ? 'bg-gray-900 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t('navigation.home')}
          </Link>
          <Link
            to="/architectural-styles"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/architectural-styles')
                ? 'bg-gray-900 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t('navigation.styles')}
          </Link>
          <Link
            to="/create"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/create')
                ? 'bg-gray-900 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t('navigation.create')}
          </Link>
          <Link
            to="/profile"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/profile')
                ? 'bg-gray-900 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t('navigation.profile')}
          </Link>
          <Link
            to="/settings"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/settings')
                ? 'bg-gray-900 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t('navigation.settings')}
          </Link>
          <div className="px-3 py-2">
            <LanguageSwitcher />
          </div>
          <div className="px-3 py-2">
            <Button variant="outline" className="w-full">
              {t('auth.login')}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 