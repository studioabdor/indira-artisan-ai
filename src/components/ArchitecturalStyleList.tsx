import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

const ArchitecturalStyleList: React.FC = () => {
  const [styles, setStyles] = useState<ArchitecturalStyle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const { t } = useTranslation();

  const regions = [
    'North India',
    'South India',
    'East India',
    'West India',
    'Central India',
    'Northeast India'
  ];

  useEffect(() => {
    fetchStyles();
  }, []);

  const fetchStyles = async () => {
    try {
      const response = await fetch('/api/v1/architectural-styles');
      const data = await response.json();
      setStyles(data);
    } catch (error) {
      console.error('Error fetching architectural styles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStyles = styles.filter(style => {
    const matchesSearch = style.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         style.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = !selectedRegion || style.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          type="text"
          placeholder={t('Search architectural styles...')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={t('Select Region')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">{t('All Regions')}</SelectItem>
            {regions.map(region => (
              <SelectItem key={region} value={region}>
                {t(region)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStyles.map(style => (
          <Card key={style.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{style.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">{style.description}</p>
                <div>
                  <h4 className="font-semibold mb-2">{t('Region')}:</h4>
                  <p>{style.region}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t('Key Features')}:</h4>
                  <ul className="list-disc list-inside">
                    {Object.entries(style.features).map(([key, value]) => (
                      <li key={key}>{value}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t('Materials')}:</h4>
                  <div className="flex flex-wrap gap-2">
                    {style.materials.map(material => (
                      <span
                        key={material}
                        className="bg-gray-100 px-2 py-1 rounded-full text-sm"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {/* Handle view details */}}
                >
                  {t('View Details')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ArchitecturalStyleList; 