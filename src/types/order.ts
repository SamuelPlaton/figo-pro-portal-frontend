import { Address, Product } from '@/types';

export interface Order {
  id: string;
  reference_id: string;
  products: Product[];
  address: Address;
}

export interface CloudPrinterOrder {
  reference: string;
  email: string;
  state: number;
  state_code: string;
  order_date: string;
  addresses: {
    company: string;
    type: 'delivery';
    firstname: string;
    lastname: string;
    street1: string;
    street2?: string;
    zip: string;
    city: string;
    country: string;
    email: string;
    phone: string;
  }[];
  items: {
    title?: string;
    reference: string;
    product: string;
    count: number;
    shipping_level: 'cp_postal' | 'cp_ground' | 'cp_saver' | 'cp_fast';
    files: {
      type: 'product' | 'cover' | 'book';
      url: string;
      md5sum: string;
    }[];
  }[];
}
