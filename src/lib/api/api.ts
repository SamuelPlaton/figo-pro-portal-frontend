import axios from 'axios';
import { OrdersModule, ProductsModule } from '@/lib/api/modules';

/* Define the axios config */
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Intercepteur pour ajouter le token automatiquement
apiClient.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`;
  return config;
});

export type ApiGetQueryParams = {
  includes?: string[];
};

export type ApiListQueryParams = ApiGetQueryParams & {
  page?: number;
  limit?: number;
  filters?: Record<string, unknown>;
  sort?: Record<string, 'ASC' | 'DESC'>;
};

export type ApiResponse<T> = {
  data: T;
  pagination?: {
    prev_page: string | null;
    next_page: string | null;
  };
};

/**
 * Defines the API endpoints implementation.
 */
export type Api = {
  orders: typeof OrdersModule;
  products: typeof ProductsModule;
};

/**
 * The actual api implementation, built with the default config.
 */
export const api: Api = {
  orders: OrdersModule,
  products: ProductsModule,
};
