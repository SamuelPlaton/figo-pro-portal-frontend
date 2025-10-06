import { apiClient, ApiResponse } from '@/lib/api';
import { AxiosResponse } from 'axios';
import { User } from '@/types';

export interface PostUserBody {
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

export interface UpdateUserBody {
  email: string;
  promoCode?: string;
  validate?: boolean;
}

const me = (): Promise<User | null> => {
  return apiClient
    .get<ApiResponse<User>>('/users/me')
    .then(res => res.data.data)
    .catch(err => {
      return null;
    });
};

const postUser = (body: PostUserBody): Promise<AxiosResponse<ApiResponse<User>>> => {
  return apiClient.post<ApiResponse<User>>('/users', body).catch(err => {
    console.error(err);
    throw err;
  });
};

const updateUser = (body: UpdateUserBody): Promise<AxiosResponse<ApiResponse<User>>> => {
  return apiClient.patch<ApiResponse<User>>('/users', body);
};

export const UsersModule = {
  postUser,
  updateUser,
  me,
};
