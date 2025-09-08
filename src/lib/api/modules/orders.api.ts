import { apiClient, ApiResponse } from '@/lib/api';
import { AxiosResponse } from 'axios';
import { Order } from '@/types';

export interface PostOrderBody {
  address: {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    phoneIndicative?: string;
    company: string;
    email: string;
    street1: string;
    zip: string;
    city: string;
  };
  items: { id: string }[];
}

const getOrders = (): Promise<AxiosResponse<ApiResponse<Order[]>>> => {
  return apiClient.get<ApiResponse<Order[]>>(`/orders`).catch(err => {
    console.error(err);
    throw err;
  });
};

const postOrder = (body: PostOrderBody): Promise<AxiosResponse<ApiResponse<Order>>> => {
  return apiClient.post<ApiResponse<Order>>('/orders', body).catch(err => {
    console.error(err);
    throw err;
  });
};

export const OrdersModule = {
  getOrders,
  postOrder,
};
