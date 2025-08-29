import { apiClient, ApiResponse } from '@/lib/api';
import { AxiosResponse } from 'axios';
import { Order, CloudPrinterOrder } from '@/types';

export interface PostOrderBody {
  address: {
    firstName: string;
    lastName: string;
    company: string;
    email: string;
    street1: string;
    zip: string;
    city: string;
  };
  items: { id: string }[];
}

const getOrder = (reference: string): Promise<AxiosResponse<ApiResponse<CloudPrinterOrder>>> => {
  return apiClient.get<ApiResponse<CloudPrinterOrder>>(`/orders/${reference}`).catch(err => {
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
  getOrder,
  postOrder,
};
