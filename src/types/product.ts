export interface Product {
  id: number;
  label: string;
  reference: string;
  price?: number;
  count: number;
  conditions: { can_order: boolean; reorder_date?: string };
  max_items: number;
}
