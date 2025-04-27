import api from './api';
import { User } from '../types';

interface AuthResponse {
  token: string;
  user: User;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

class AuthService {
  private static TOKEN_KEY = 'token';
  private static USER_KEY = 'user';

  static async login(credentials: LoginRequest): Promise<User> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    this.setToken(response.data.token);
    this.setUser(response.data.user);
    return response.data.user;
  }

  static async signup(data: SignupRequest): Promise<User> {
    const response = await api.post<AuthResponse>('/auth/signup', data);
    this.setToken(response.data.token);
    this.setUser(response.data.user);
    return response.data.user;
  }

  static async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      this.clearAuth();
    }
  }

  static async getCurrentUser(): Promise<User | null> {
    const user = this.getUser();
    if (!user) return null;

    try {
      const response = await api.get<User>('/auth/me');
      this.setUser(response.data);
      return response.data;
    } catch (error) {
      this.clearAuth();
      return null;
    }
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static getUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  private static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private static setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private static clearAuth(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
}

export default AuthService; 