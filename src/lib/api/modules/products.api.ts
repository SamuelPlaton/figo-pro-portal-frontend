import { Product } from '@/types';
import { apiClient, ApiResponse } from '@/lib/api';

const getProducts = (): Promise<ApiResponse<Product[]>> => {
  return apiClient
    .get<ApiResponse<Product[]>>('/products')
    .then(response => response.data)
    .catch(err => {
      console.error(err);
      throw err;
    });
};

export const ProductsModule = {
  getProducts,
};
