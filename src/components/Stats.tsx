
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export default function Stats() {
  return (
    <section className="py-12 bg-indira-blue text-white">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <Card className="bg-indira-blue/40 border-indira-blue/20">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className="text-3xl md:text-4xl font-bold font-serif text-white">50K+</div>
              <p className="text-indira-cream/90 text-sm mt-1">Architectural Samples</p>
            </CardContent>
          </Card>
          <Card className="bg-indira-blue/40 border-indira-blue/20">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className="text-3xl md:text-4xl font-bold font-serif text-white">10+</div>
              <p className="text-indira-cream/90 text-sm mt-1">Architectural Styles</p>
            </CardContent>
          </Card>
          <Card className="bg-indira-blue/40 border-indira-blue/20">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className="text-3xl md:text-4xl font-bold font-serif text-white">4</div>
              <p className="text-indira-cream/90 text-sm mt-1">Supported Languages</p>
            </CardContent>
          </Card>
          <Card className="bg-indira-blue/40 border-indira-blue/20">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className="text-3xl md:text-4xl font-bold font-serif text-white">&lt;5s</div>
              <p className="text-indira-cream/90 text-sm mt-1">Render Time</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
