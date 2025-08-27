export interface CheckoutItem {
  id: number;
  quantity: number;
}

export interface Checkout {
  items: CheckoutItem[];
}
