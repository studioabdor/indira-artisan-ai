
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Menu, X } from "lucide-react";

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'bn', name: 'বাংলা' }
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode);
    // In a real app, we would update the app's language state here
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="/" className="font-serif text-2xl font-bold text-indira-navy">
            <span className="text-indira-terracotta">Indira</span>
            <span className="text-sm align-top ml-1 text-indira-blue">beta</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium hover:text-indira-terracotta transition-colors">
            Features
          </a>
          <a href="#styles" className="text-sm font-medium hover:text-indira-terracotta transition-colors">
            Architectural Styles
          </a>
          <a href="#showcase" className="text-sm font-medium hover:text-indira-terracotta transition-colors">
            Showcase
          </a>
          <a href="#about" className="text-sm font-medium hover:text-indira-terracotta transition-colors">
            About
          </a>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Globe size={16} />
                <span>{languages.find(lang => lang.code === currentLanguage)?.name || 'English'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((language) => (
                <DropdownMenuItem 
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={currentLanguage === language.code ? "bg-muted" : ""}
                >
                  {language.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="bg-indira-terracotta hover:bg-indira-maroon">Get Started</Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden p-4 pt-0 pb-6 border-b space-y-4 bg-background">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-sm font-medium p-2 rounded hover:bg-indira-cream transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#styles" 
              className="text-sm font-medium p-2 rounded hover:bg-indira-cream transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Architectural Styles
            </a>
            <a 
              href="#showcase" 
              className="text-sm font-medium p-2 rounded hover:bg-indira-cream transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Showcase
            </a>
            <a 
              href="#about" 
              className="text-sm font-medium p-2 rounded hover:bg-indira-cream transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            
            <div className="pt-2 border-t">
              <div className="flex flex-col space-y-2">
                <span className="text-xs text-muted-foreground">Select Language</span>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((language) => (
                    <Button 
                      key={language.code}
                      variant={currentLanguage === language.code ? "default" : "outline"} 
                      size="sm"
                      onClick={() => handleLanguageChange(language.code)}
                      className={currentLanguage === language.code ? "bg-indira-blue" : ""}
                    >
                      {language.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <Button className="bg-indira-terracotta hover:bg-indira-maroon w-full mt-4">
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
