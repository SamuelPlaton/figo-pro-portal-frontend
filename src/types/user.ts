export interface UserAddress {
  id: string;
  first_name: string;
  last_name: string;
  street1: string;
  street2?: string;
  zip: string;
  city: string;
}

export interface User {
  id: string;
  email: string;
  phone_indicative: string;
  phone_number: string;
  address: UserAddress;
}
