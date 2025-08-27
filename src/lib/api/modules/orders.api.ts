import { apiClient, ApiResponse } from '@/lib/api';
import { AxiosResponse } from 'axios';

export interface PostOrderBody {
  items: { reference: string; count: number };
}

const postOrder = (body: PostOrderBody): Promise<AxiosResponse<ApiResponse<void>>> => {
  return apiClient.post<ApiResponse<void>>('/orders', body).catch(err => {
    console.error(err);
    throw err;
  });
};

export const OrdersModule = {
  postOrder,
};
