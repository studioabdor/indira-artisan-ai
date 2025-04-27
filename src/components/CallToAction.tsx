
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-indira-terracotta p-8 md:p-12">
          <div className="grid gap-6 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white">
                Join the Future of Indian Architecture
              </h2>
              <p className="text-indira-cream max-w-[600px]">
                Be among the first to explore how AI can help preserve and evolve India's rich architectural heritage. Sign up for early access and receive updates as we develop new features.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button size="lg" className="bg-white text-indira-terracotta hover:bg-indira-cream">
                  Request Early Access
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://source.unsplash.com/photo-1472396961693-142e6e269027" 
                alt="Traditional Indian architecture" 
                className="mx-auto max-w-full rounded-xl shadow-lg" 
              />
            </div>
          </div>
          
          {/* Background decorations */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-indira-maroon/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indira-gold/30 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
