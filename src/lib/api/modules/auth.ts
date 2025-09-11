import axios, { AxiosResponse } from 'axios';
import { apiClient } from '@/lib/api';

export interface SignUpBody {
  email: string;
  password: string;
  given_name?: string;
  family_name?: string;
  name?: string;
  phone_number?: string;
}
export interface SignUpResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
}

export interface AuthMeResponse {
  authenticated: boolean;
  error?: string;
  user?: {
    sub: string;
    email: string;
    name: string;
  };
}

const signup = async (body: SignUpBody): Promise<AxiosResponse<SignUpResponse>> => {
  return await axios.post<SignUpResponse>('/api/auth/signup', body);
};

const login = async (body: LoginBody): Promise<AxiosResponse<LoginResponse>> => {
  return axios.post<LoginResponse>('/api/auth/login', body);
};

const isConnected = async (): Promise<boolean> => {
  return apiClient
    .get<AuthMeResponse>('/api/auth/me', { baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL })
    .then(response => response.data.authenticated)
    .catch(() => false);
};

const logout = async (): Promise<void> => {
  return axios.post('/api/auth/logout');
};

export const AuthModule = {
  signup,
  login,
  isConnected,
  logout,
};
