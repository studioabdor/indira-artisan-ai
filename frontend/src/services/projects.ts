import api from './api';
import { Project } from '../types';

interface CreateProjectRequest {
  name: string;
  description: string;
  style: string;
}

interface UpdateProjectRequest {
  name?: string;
  description?: string;
  style?: string;
}

class ProjectService {
  static async getProjects(): Promise<Project[]> {
    const response = await api.get<Project[]>('/projects');
    return response.data;
  }

  static async getProject(id: string): Promise<Project> {
    const response = await api.get<Project>(`/projects/${id}`);
    return response.data;
  }

  static async createProject(data: CreateProjectRequest): Promise<Project> {
    const response = await api.post<Project>('/projects', data);
    return response.data;
  }

  static async updateProject(id: string, data: UpdateProjectRequest): Promise<Project> {
    const response = await api.put<Project>(`/projects/${id}`, data);
    return response.data;
  }

  static async deleteProject(id: string): Promise<void> {
    await api.delete(`/projects/${id}`);
  }

  static async addGenerationToProject(projectId: string, generationId: string): Promise<Project> {
    const response = await api.post<Project>(`/projects/${projectId}/generations/${generationId}`);
    return response.data;
  }
}

export default ProjectService; 