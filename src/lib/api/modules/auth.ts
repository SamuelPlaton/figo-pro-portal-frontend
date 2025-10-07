import axios, { AxiosResponse } from 'axios';
import { User } from '@/types';

export interface SignUpBody {
  address: {
    firstName?: string;
    lastName?: string;
    company?: string;
    phoneNumber?: string;
    phoneIndicative?: string;
    email: string;
    street1: string;
    zip: string;
    city: string;
  };
  password: string;
  email: string;
}
export interface SignUpResponse {
  access_token: string;
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
