export interface User {
    id: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
}

export interface Project {
    id: string;
    name: string;
    description: string;
    style: ArchitecturalStyle;
    createdAt: string;
    updatedAt: string;
    thumbnailUrl?: string;
    userId: string;
}

export type ArchitecturalStyle = 
    | 'Mughal'
    | 'Dravidian'
    | 'Rajput'
    | 'Bengal'
    | 'Modern'
    | 'Contemporary'
    | 'Indo-Saracenic'
    | 'Buddhist'
    | 'Temple'
    | 'Colonial';

export interface GenerationRequest {
    prompt: string;
    style: ArchitecturalStyle;
    additionalDetails?: Record<string, any>;
}

export interface GenerationResponse {
    id: string;
    imageUrl: string;
    prompt: string;
    style: ArchitecturalStyle;
    createdAt: string;
} 