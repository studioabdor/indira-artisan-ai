import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const features = [
  {
    name: 'Sketch-to-Render',
    description: 'Transform rough sketches into detailed architectural visualizations',
    icon: '🎨'
  },
  {
    name: 'Indian Styles',
    description: 'Support for multiple traditional and modern Indian architectural styles',
    icon: '🏛️'
  },
  {
    name: 'Multilingual',
    description: 'Interface available in multiple Indian languages',
    icon: '🗣️'
  },
  {
    name: 'Real-time Preview',
    description: 'See changes and adjustments in real-time',
    icon: '⚡'
  }
];

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="relative">
      {/* Hero section */}
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0"
            >
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  {t('home.title')}
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  {t('home.subtitle')}
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    to="/generator"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {t('home.getStarted')}
                  </Link>
                  <Link
                    to="/about"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    {t('home.learnMore')} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Powerful Features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to visualize your architectural designs
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <span className="text-3xl">{feature.icon}</span>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
} 