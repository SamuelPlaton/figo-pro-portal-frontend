import { apiClient, ApiResponse } from '@/lib/api';
import { AxiosResponse } from 'axios';
import { User } from '@/types';

export interface UpdateUserBody {
  email: string;
  promoCode?: string;
  validate?: boolean;
}

const updateUser = (body: UpdateUserBody): Promise<AxiosResponse<ApiResponse<User>>> => {
  return apiClient.patch<ApiResponse<User>>('/users', body);
};

export const UsersModule = {
  updateUser,
};
