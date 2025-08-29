import { Address } from '@/types';

export interface User {
  id: string;
  email: string;
  phone_indicative: string;
  phone_number: string;
  address: Address;
}
