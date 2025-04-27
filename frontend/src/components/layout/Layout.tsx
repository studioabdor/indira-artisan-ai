import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-white mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Indira Artisan AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
} 