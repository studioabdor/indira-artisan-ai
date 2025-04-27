import api from './api';
import { Design } from '../components/gallery/Gallery';

interface GenerateDesignRequest {
  prompt: string;
  style: string;
}

class DesignService {
  static async getDesigns(): Promise<Design[]> {
    const response = await api.get<Design[]>('/designs');
    return response.data;
  }

  static async generateDesign(data: GenerateDesignRequest): Promise<Design> {
    const response = await api.post<Design>('/designs/generate', data);
    return response.data;
  }

  static async downloadDesign(designId: string): Promise<Blob> {
    const response = await api.get(`/designs/${designId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  }

  static async shareDesign(designId: string): Promise<{ shareUrl: string }> {
    const response = await api.post<{ shareUrl: string }>(`/designs/${designId}/share`);
    return response.data;
  }

  static getShareableLink(shareUrl: string): string {
    return `${window.location.origin}/shared/${shareUrl}`;
  }

  static downloadFile(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }
}

export default DesignService; 