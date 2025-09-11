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

const me = (): Promise<User | undefined> => {
  return apiClient
    .get<ApiResponse<User>>('/users/me')
    .then(res => res.data.data)
    .catch(err => {
      console.error('ERR ME', err);
      return undefined;
    });
};

const postUser = (body: PostUserBody): Promise<AxiosResponse<ApiResponse<User>>> => {
  return apiClient.post<ApiResponse<User>>('/users', body).catch(err => {
    console.error(err);
    throw err;
  });
};

export const UsersModule = {
  postUser,
  me,
};
