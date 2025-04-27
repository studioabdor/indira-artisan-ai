import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from 'react-i18next';

interface ArchitecturalStyle {
  id: number;
  name: string;
  description: string;
  region: string;
  features: Record<string, string>;
  materials: string[];
  examples: string[];
  image_urls: string[];
  metadata?: Record<string, any>;
}

interface ArchitecturalStyleDetailProps {
  id: number;
}

const ArchitecturalStyleDetail: React.FC<ArchitecturalStyleDetailProps> = ({ id }) => {
  const [style, setStyle] = useState<ArchitecturalStyle | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetchStyleDetails();
  }, [id]);

  const fetchStyleDetails = async () => {
    try {
      const response = await fetch(`/api/v1/architectural-styles/${id}`);
      const data = await response.json();
      setStyle(data);
    } catch (error) {
      console.error('Error fetching architectural style details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>;
  }

  if (!style) {
    return <div className="text-center py-8">{t('Style not found')}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">{style.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-600 mb-6">{style.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">{t('Region')}</h3>
              <p className="text-gray-700">{style.region}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">{t('Materials')}</h3>
              <div className="flex flex-wrap gap-2">
                {style.materials.map(material => (
                  <span
                    key={material}
                    className="bg-gray-100 px-3 py-1 rounded-full"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="features">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="features">{t('Features')}</TabsTrigger>
          <TabsTrigger value="examples">{t('Examples')}</TabsTrigger>
          <TabsTrigger value="gallery">{t('Gallery')}</TabsTrigger>
        </TabsList>

        <TabsContent value="features">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(style.features).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <h4 className="font-semibold">{key}</h4>
                    <p className="text-gray-600">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {style.examples.map((example, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">{example}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {style.image_urls.map((url, index) => (
                  <div key={index} className="aspect-w-16 aspect-h-9">
                    <img
                      src={url}
                      alt={`${style.name} - Example ${index + 1}`}
                      className="object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4 mt-8">
        <Button variant="outline" onClick={() => window.history.back()}>
          {t('Back')}
        </Button>
        <Button onClick={() => {/* Handle edit */}}>
          {t('Edit Style')}
        </Button>
      </div>
    </div>
  );
};

export default ArchitecturalStyleDetail; 