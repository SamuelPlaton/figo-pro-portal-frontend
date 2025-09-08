import axios, { AxiosResponse } from 'axios';

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

const signup = async (body: SignUpBody): Promise<AxiosResponse<SignUpResponse>> => {
  const res = await axios.post<SignUpResponse>('/api/auth/signup', body);
  console.log('RES', res.data);
  return res;
};

const login = async (body: LoginBody): Promise<AxiosResponse<LoginResponse>> => {
  return axios.post<LoginResponse>('/api/auth/login', body);
};

export const AuthModule = {
  signup,
  login,
};
