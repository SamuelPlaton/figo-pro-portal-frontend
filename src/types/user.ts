import { Address } from '@/types';

export interface User {
  id: string;
  email: string;
  address: Address;
  validated_at: string;
  promo_code?: string;
}
