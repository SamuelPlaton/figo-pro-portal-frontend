import { ProductOrderStatusEnum } from '@/types/product-order-status-enum';

export interface ProductOrderStatusHistory {
  id: string;
  status: ProductOrderStatusEnum;
  created_at: string;
}
