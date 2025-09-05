export interface Address {
  id: string;
  first_name: string;
  last_name: string;
  street1: string;
  street2?: string;
  company?: string;
  email?: string;
  zip: string;
  city: string;
}

export interface AddressForm {
  street1: string;
  street2?: string;
  company?: string;
  zip: string;
  city: string;
}
