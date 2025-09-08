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
  externalId: string;
  email: string;
}

const postUser = (body: PostUserBody): Promise<AxiosResponse<ApiResponse<User>>> => {
  return apiClient.post<ApiResponse<User>>('/users', body).catch(err => {
    console.error(err);
    throw err;
  });
};

export const UsersModule = {
  postUser,
};
