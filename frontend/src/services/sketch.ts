import api from './api';

export interface ProcessSketchRequest {
  sketch: File;
  style: string;
}

export interface ProcessedSketch {
  id: string;
  originalUrl: string;
  renderedUrl: string;
  style: string;
  createdAt: string;
}

class SketchService {
  static async processSketch(data: ProcessSketchRequest): Promise<ProcessedSketch> {
    const formData = new FormData();
    formData.append('sketch', data.sketch);
    formData.append('style', data.style);

    const response = await api.post<ProcessedSketch>('/sketches/process', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  static async getProcessedSketch(id: string): Promise<ProcessedSketch> {
    const response = await api.get<ProcessedSketch>(`/sketches/${id}`);
    return response.data;
  }

  static async listProcessedSketches(): Promise<ProcessedSketch[]> {
    const response = await api.get<ProcessedSketch[]>('/sketches');
    return response.data;
  }

  static async deleteProcessedSketch(id: string): Promise<void> {
    await api.delete(`/sketches/${id}`);
  }
} 