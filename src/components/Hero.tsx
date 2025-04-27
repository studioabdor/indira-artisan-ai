
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden jali-pattern pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-indira-cream px-3 py-1 text-sm text-indira-blue font-medium mb-2">
              Architectural Visualization Platform
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-indira-navy mb-4">
              Transform Your <span className="text-indira-terracotta">Indian Architectural</span> Visions into Reality
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Indira combines cultural heritage with cutting-edge AI to visualize architectural concepts that honor India's diverse architectural traditions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button size="lg" className="bg-indira-terracotta hover:bg-indira-maroon">
                Try the Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-indira-blue text-indira-blue hover:text-indira-navy">
                Explore Styles
              </Button>
            </div>
            <div className="flex items-center pt-4 space-x-4">
              <div className="flex -space-x-2">
                <img
                  alt="User"
                  className="rounded-full border-2 border-background w-8 h-8"
                  src="https://source.unsplash.com/random/100x100/?architect1"
                />
                <img
                  alt="User"
                  className="rounded-full border-2 border-background w-8 h-8"
                  src="https://source.unsplash.com/random/100x100/?architect2"
                />
                <img
                  alt="User"
                  className="rounded-full border-2 border-background w-8 h-8"
                  src="https://source.unsplash.com/random/100x100/?architect3"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Trusted by <span className="font-medium text-foreground">2,000+</span> architects across India
              </div>
            </div>
          </div>
          <div className="relative lg:pl-10">
            <div className="relative overflow-hidden rounded-xl border bg-background shadow-xl">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  alt="Building render depicting traditional Indian architecture"
                  className="object-cover w-full"
                  src="https://source.unsplash.com/photo-1466442929976-97f336a657be"
                  width={550}
                  height={413}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/5" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-background/95 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Temple Complex Visualization</p>
                    <p className="text-xs text-muted-foreground">Dravidian Style • Tamil Nadu</p>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 h-1/2 w-1/2 rounded-lg bg-indira-mustard/20 blur-2xl" />
            <div className="absolute -top-4 -right-4 h-1/2 w-1/2 rounded-lg bg-indira-blue/20 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
