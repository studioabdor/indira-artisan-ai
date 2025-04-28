import axios from 'axios';
import { GenerationRequest, GenerationResponse } from '../types';
import AuthService from './auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authentication interceptor
api.interceptors.request.use((config) => {
  const token = AuthService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      AuthService.clearAuth();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const generateDesign = async (request: GenerationRequest): Promise<GenerationResponse> => {
  const response = await api.post<GenerationResponse>('/generation/generate', request);
  return response.data;
};

export default api; 