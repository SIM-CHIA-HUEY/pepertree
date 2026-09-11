import { Product } from "./product.model";

export interface CartItem {
  productId: Product;
  quantity: number;
}

export interface Cart {
  _id: string;
  items: CartItem[];
}

export type DeliveryMethod =
  | 'hand_delivery'
  | 'mail_delivery';