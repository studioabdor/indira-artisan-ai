
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import StyleShowcase from '@/components/StyleShowcase';
import DemoCanvas from '@/components/DemoCanvas';
import Stats from '@/components/Stats';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <Features />
        <Stats />
        <StyleShowcase />
        <DemoCanvas />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
