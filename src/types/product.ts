export interface Product {
  id: string;
  label: string;
  external_reference: string;
  price?: number;
  quantity: number;
  applied_rules?: { can_order: boolean; message?: string };
}
