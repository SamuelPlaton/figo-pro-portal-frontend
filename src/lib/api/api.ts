import axios from 'axios';
import { AuthModule, OrdersModule, ProductsModule, UsersModule } from '@/lib/api/modules';

/* Define the axios config */
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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
  auth: typeof AuthModule;
  orders: typeof OrdersModule;
  products: typeof ProductsModule;
  users: typeof UsersModule;
};

/**
 * The actual api implementation, built with the default config.
 */
export const api: Api = {
  auth: AuthModule,
  orders: OrdersModule,
  products: ProductsModule,
  users: UsersModule,
};
