import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GenerationPage } from './pages/GenerationPage';
import { useTranslation } from 'react-i18next';
import './App.css';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ArchitecturalStyles from "./pages/ArchitecturalStyles";
import ArchitecturalStyleDetail from "./pages/ArchitecturalStyleDetail";
import ArchitecturalStyleForm from "./pages/ArchitecturalStyleForm";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'bn', name: 'বাংলা' }
];

function App() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main>
              {/* Language Selector */}
              <div className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-3 flex justify-end">
                  <select
                    value={i18n.language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/architectural-styles" element={<ArchitecturalStyles />} />
                <Route path="/architectural-styles/:id" element={<ArchitecturalStyleDetail />} />
                <Route path="/architectural-styles/create" element={<ArchitecturalStyleForm />} />
                <Route path="/architectural-styles/:id/edit" element={<ArchitecturalStyleForm />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
