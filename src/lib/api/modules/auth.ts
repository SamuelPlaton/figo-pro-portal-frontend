import axios, { AxiosResponse } from 'axios';
import { User } from '@/types';

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

export interface AuthMeResponse {
  authenticated: boolean;
  user: User | null;
}

const signup = async (body: SignUpBody): Promise<AxiosResponse<SignUpResponse>> => {
  return await axios.post<SignUpResponse>('/api/auth/signup', body);
};

const login = async (body: LoginBody): Promise<AxiosResponse<LoginResponse>> => {
  return axios.post<LoginResponse>('/api/auth/login', body);
};

const me = async (): Promise<AxiosResponse<AuthMeResponse>> => {
  return axios.get<AuthMeResponse>('/api/auth/me');
};

const logout = async (): Promise<void> => {
  return axios.post('/api/auth/logout');
};

export const AuthModule = {
  signup,
  login,
  logout,
  me,
};
