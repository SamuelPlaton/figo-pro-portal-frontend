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
  _id: string;
  email: string;
  email_verified: boolean;
  app_metadata?: object;
  user_metadata?: object;
  error?: {
    code: string;
    message: string;
  };
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
}

export interface AuthUser {
  sub: string;
  email: string;
  name?: string;
}

export interface AuthMeResponse {
  authenticated: boolean;
  error?: string;
  user?: AuthUser;
}

const signup = async (body: SignUpBody): Promise<AxiosResponse<SignUpResponse>> => {
  return await axios.post<SignUpResponse>('/api/auth/signup', body);
};

const login = async (body: LoginBody): Promise<AxiosResponse<LoginResponse>> => {
  return axios.post<LoginResponse>('/api/auth/login', body);
};

const loginSso = async (): Promise<AxiosResponse> => {
  return axios.get<LoginResponse>('/api/auth/sso/google');
};

const me = async (): Promise<AxiosResponse<AuthMeResponse>> => {
  return apiClient.get<AuthMeResponse>('/api/auth/me', {
    baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
  });
};

const logout = async (): Promise<void> => {
  return axios.post('/api/auth/logout');
};

export const AuthModule = {
  signup,
  login,
  loginSso,
  me,
  logout,
};
