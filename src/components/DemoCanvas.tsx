
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, Wand2, Palette, Download, RotateCcw, Printer } from "lucide-react";

export default function DemoCanvas() {
  const [activeTab, setActiveTab] = useState("sketch");
  const [selectedStyle, setSelectedStyle] = useState("mughal");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  
  const handleGenerate = () => {
    setIsProcessing(true);
    setProgress(0);
    setResult(null);
    
    // Simulate AI processing with progress updates
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + 5;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            // Show a sample result based on the selected style
            if (selectedStyle === "mughal") {
              setResult("https://source.unsplash.com/photo-1493962853295-0fd70327578a");
            } else if (selectedStyle === "dravidian") {
              setResult("https://source.unsplash.com/photo-1466442929976-97f336a657be");
            } else if (selectedStyle === "indo-saracenic") {
              setResult("https://source.unsplash.com/photo-1517022812141-23620dba5c23");
            } else {
              setResult("https://source.unsplash.com/photo-1721322800607-8c38375eef04");
            }
          }, 500);
        }
        
        return newProgress;
      });
    }, 200);
  };
  
  const resetCanvas = () => {
    setIsProcessing(false);
    setProgress(0);
    setResult(null);
  };

  return (
    <section id="showcase" className="py-16 md:py-24 bg-indira-cream/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-indira-gold/20 px-3 py-1 text-sm text-indira-navy font-medium">
              Interactive Demo
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Experience Indira in Action
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Try our architectural visualization tools with this simplified demo.
            </p>
          </div>
        </div>
        
        <div className="mx-auto max-w-4xl mt-12">
          <Card className="border-2">
            <CardHeader>
              <Tabs defaultValue="sketch" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="sketch">Sketch-to-Render</TabsTrigger>
                  <TabsTrigger value="text">Text-to-Image</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="p-6">
              <TabsContent value="sketch" className="space-y-4">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium mb-2">Upload Sketch</h3>
                      <div className="canvas-container border-2 border-dashed border-muted flex items-center justify-center">
                        {!result ? (
                          <div className="text-center p-4">
                            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-sm text-muted-foreground">
                              Drop your architectural sketch here or click to upload
                            </p>
                            <Button variant="outline" size="sm" className="mt-4">
                              Upload Sketch
                            </Button>
                          </div>
                        ) : (
                          <div className="relative w-full h-full">
                            <img 
                              src={result} 
                              alt="Rendered architecture" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          Select Architectural Style
                        </label>
                        <Select 
                          defaultValue="mughal" 
                          onValueChange={setSelectedStyle}
                          disabled={isProcessing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mughal">Mughal</SelectItem>
                            <SelectItem value="dravidian">Dravidian</SelectItem>
                            <SelectItem value="indo-saracenic">Indo-Saracenic</SelectItem>
                            <SelectItem value="vernacular">Vernacular (Regional)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Button 
                          onClick={handleGenerate}
                          disabled={isProcessing}
                          className="bg-indira-blue hover:bg-indira-navy flex gap-2"
                        >
                          <Wand2 size={18} />
                          Generate
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={resetCanvas}
                          disabled={isProcessing && progress < 100}
                        >
                          <RotateCcw size={18} className="mr-2" />
                          Reset
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-2">AI Visualization</h3>
                    <div className="canvas-container border-2 border-muted flex items-center justify-center">
                      {isProcessing ? (
                        <div className="text-center p-6 w-full">
                          <div className="mandala-loader w-24 h-24 mx-auto mb-4 animate-rotate-mandala" />
                          <p className="font-medium text-indira-navy mb-2">Generating Visualization</p>
                          <p className="text-sm text-muted-foreground mb-4">
                            {progress < 30 ? "Analyzing architectural elements..." : 
                             progress < 60 ? "Applying cultural style patterns..." : 
                             progress < 90 ? "Rendering detailed visualization..." : 
                             "Finalizing output..."}
                          </p>
                          <Progress value={progress} className="h-2 mb-2" />
                          <p className="text-xs text-muted-foreground">{progress}% complete</p>
                        </div>
                      ) : result ? (
                        <div className="text-center p-6 w-full">
                          <p className="font-medium text-indira-navy mb-4">Visualization Complete!</p>
                          <div className="flex justify-center space-x-4">
                            <Button variant="outline" size="sm" className="flex gap-2">
                              <Download size={16} />
                              Download
                            </Button>
                            <Button variant="outline" size="sm" className="flex gap-2">
                              <Printer size={16} />
                              Print
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center p-6">
                          <Palette className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-sm text-muted-foreground">
                            Upload a sketch and click generate to see the AI visualization
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="text" className="space-y-4">
                <div className="text-center p-12 border-2 border-dashed rounded-xl">
                  <h3 className="text-xl font-medium mb-3">Text-to-Image Generation</h3>
                  <p className="text-muted-foreground mb-4">
                    Describe your architectural vision in any of our supported languages,
                    and Indira will generate a visualization based on your description.
                  </p>
                  <Button className="bg-indira-blue hover:bg-indira-navy">
                    Coming Soon
                  </Button>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
