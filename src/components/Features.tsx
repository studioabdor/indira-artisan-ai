
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, PenTool, Layers, Languages, Building2, Activity, Clock, RefreshCw } from 'lucide-react';

const features = [
  {
    icon: <PenTool className="h-6 w-6 text-indira-terracotta" />,
    title: "Sketch-to-Render Engine",
    description: "Upload hand-drawn sketches and transform them into detailed 3D renders with cultural accuracy."
  },
  {
    icon: <Building2 className="h-6 w-6 text-indira-terracotta" />,
    title: "10+ Indian Architectural Styles",
    description: "Support for Mughal, Dravidian, Indo-Saracenic, Vernacular and more traditional Indian styles."
  },
  {
    icon: <Languages className="h-6 w-6 text-indira-terracotta" />,
    title: "Multilingual Interface",
    description: "Work in Hindi, English, Tamil, and Bengali with specialized architectural terminology."
  },
  {
    icon: <Layers className="h-6 w-6 text-indira-terracotta" />,
    title: "Style Template Library",
    description: "Access 50+ preloaded templates showcasing regional architectural elements and motifs."
  },
  {
    icon: <Globe className="h-6 w-6 text-indira-terracotta" />,
    title: "Material Rendering",
    description: "Authentic rendering of traditional materials like red sandstone, jali screens, and carved wood."
  },
  {
    icon: <RefreshCw className="h-6 w-6 text-indira-terracotta" />,
    title: "2D-to-3D Conversion",
    description: "Convert floor plans and elevations to fully realized 3D models with BIM compatibility."
  },
  {
    icon: <Clock className="h-6 w-6 text-indira-terracotta" />,
    title: "Fast Rendering",
    description: "Experience <5-second render times for 2D sketches and <20 seconds for 3D models."
  },
  {
    icon: <Activity className="h-6 w-6 text-indira-terracotta" />,
    title: "Responsive Design",
    description: "Work seamlessly across desktop, tablet, and mobile devices with a unified experience."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-16 md:py-24 bg-indira-cream/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-indira-blue/10 px-3 py-1 text-sm text-indira-blue font-medium">
              Platform Capabilities
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Features That Blend Tradition With Innovation
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Indira empowers architects to create culturally authentic designs with AI assistance, honoring India's architectural heritage.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="mb-2 h-10 w-10 rounded-lg bg-indira-cream flex items-center justify-center">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
