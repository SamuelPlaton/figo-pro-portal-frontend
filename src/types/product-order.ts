import { ProductOrderStatusEnum } from '@/types/product-order-status-enum';
import { ProductOrderStatusHistory } from '@/types/product-order-status-history';
import { Product } from '@/types/product';

export interface ProductOrder {
  id: number;
  reference_id: string;
  status: ProductOrderStatusEnum;
  shipping_tracking: string | null;
  shipping_option: string | null;
  status_history?: ProductOrderStatusHistory[];
  product?: Product;
}
