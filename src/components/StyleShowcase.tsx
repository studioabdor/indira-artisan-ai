
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const architecturalStyles = [
  {
    id: "mughal",
    name: "Mughal",
    description: "Characterized by large bulbous domes, slender minarets, grand halls, and delicate ornamentation with Persian influences.",
    image: "https://source.unsplash.com/photo-1493962853295-0fd70327578a",
    examples: ["Taj Mahal", "Humayun's Tomb", "Red Fort"],
    regions: ["North India", "Delhi", "Agra"]
  },
  {
    id: "dravidian",
    name: "Dravidian",
    description: "Known for pyramid-shaped towers, intricate stone carvings, and massive temple complexes with elaborate pillared halls.",
    image: "https://source.unsplash.com/photo-1466442929976-97f336a657be",
    examples: ["Meenakshi Temple", "Brihadeeswara Temple", "Shore Temple"],
    regions: ["Tamil Nadu", "Karnataka", "Andhra Pradesh"]
  },
  {
    id: "indo-saracenic",
    name: "Indo-Saracenic",
    description: "Fusion of Indian, Islamic, and European Gothic styles featuring domes, spires, arches, and intricate facades.",
    image: "https://source.unsplash.com/photo-1517022812141-23620dba5c23",
    examples: ["Victoria Memorial", "Chhatrapati Shivaji Terminus", "Madras High Court"],
    regions: ["Mumbai", "Kolkata", "Chennai"]
  },
  {
    id: "vernacular",
    name: "Vernacular",
    description: "Regional styles using local materials like wood, stone, and clay, adapted to local climate with courtyards and passive cooling.",
    image: "https://source.unsplash.com/photo-1721322800607-8c38375eef04",
    examples: ["Kerala Nalukettu", "Rajasthani Haveli", "Goan Portuguese Houses"],
    regions: ["Kerala", "Rajasthan", "Gujarat", "Goa"]
  }
];

export default function StyleShowcase() {
  const [activeStyle, setActiveStyle] = useState(architecturalStyles[0]);

  return (
    <section id="styles" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-indira-maroon/10 px-3 py-1 text-sm text-indira-maroon font-medium">
              Architectural Traditions
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Explore India's Rich Architectural Heritage
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Discover the diverse architectural styles that have defined India's built landscape for centuries.
            </p>
          </div>
        </div>
        
        <div className="mt-12">
          <Tabs defaultValue={architecturalStyles[0].id} className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-4 mb-8">
              {architecturalStyles.map((style) => (
                <TabsTrigger 
                  key={style.id} 
                  value={style.id}
                  onClick={() => setActiveStyle(style)}
                  className="rounded-full border px-6 py-3 data-[state=active]:bg-indira-terracotta data-[state=active]:text-white"
                >
                  {style.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {architecturalStyles.map((style) => (
              <TabsContent key={style.id} value={style.id} className="space-y-8">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-indira-navy">{style.name} Architecture</h3>
                    <p className="text-muted-foreground">{style.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm font-medium text-indira-blue">Notable Examples</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                          <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                            {style.examples.map((example, index) => (
                              <li key={index}>{example}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm font-medium text-indira-blue">Common Regions</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                          <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                            {style.regions.map((region, index) => (
                              <li key={index}>{region}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Button variant="outline" className="mt-4">
                      Learn More About {style.name} Architecture
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                    <img
                      alt={`Example of ${style.name} architecture`}
                      className="object-cover w-full h-full"
                      src={style.image}
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
