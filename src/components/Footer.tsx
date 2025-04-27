
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer id="about" className="border-t bg-card">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4">
            <div className="font-serif text-2xl font-bold">
              <span className="text-indira-terracotta">Indira</span>
              <span className="text-indira-blue">AI</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-[300px]">
              Empowering architects to create designs that honor India's rich architectural heritage through AI-powered visualization.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
                <span className="sr-only">Instagram</span>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div className="space-y-4">
              <h3 className="text-base font-medium">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#styles" className="text-muted-foreground hover:text-foreground transition-colors">Architectural Styles</a></li>
                <li><a href="#showcase" className="text-muted-foreground hover:text-foreground transition-colors">Demo</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-base font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-base font-medium">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookies</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Licenses</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-base font-medium">Newsletter</h3>
              <p className="text-sm text-muted-foreground">Subscribe to our newsletter for updates</p>
              <div className="flex space-x-2">
                <Input placeholder="Enter your email" className="max-w-[200px]" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © 2025 Indira AI. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Celebrating and preserving India's architectural heritage.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
