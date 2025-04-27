import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from 'react-i18next';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  region: z.string().min(1, 'Region is required'),
  features: z.record(z.string()),
  materials: z.array(z.string()),
  examples: z.array(z.string()),
  image_urls: z.array(z.string()),
  metadata: z.record(z.any()).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface ArchitecturalStyleFormProps {
  initialData?: FormData;
  onSubmit: (data: FormData) => Promise<void>;
}

const ArchitecturalStyleForm: React.FC<ArchitecturalStyleFormProps> = ({
  initialData,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      region: '',
      features: {},
      materials: [],
      examples: [],
      image_urls: [],
      metadata: {},
    },
  });

  const regions = [
    'North India',
    'South India',
    'East India',
    'West India',
    'Central India',
    'Northeast India'
  ];

  const handleSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      await onSubmit(data);
      navigate('/architectural-styles');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>
            {initialData ? t('Edit Architectural Style') : t('Create Architectural Style')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Name')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Description')}</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Region')}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('Select a region')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {regions.map(region => (
                          <SelectItem key={region} value={region}>
                            {t(region)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Add more form fields for features, materials, examples, and images */}
              {/* This would include file upload components and dynamic form arrays */}

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/architectural-styles')}
                >
                  {t('Cancel')}
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? t('Saving...') : t('Save')}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArchitecturalStyleForm; 