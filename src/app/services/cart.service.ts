import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem {
  productId: Product;
  quantity: number;
}

export interface Cart {
  _id: string;
  items: CartItem[];
}

export interface CartResponse {
  message: string;
  cart: Cart;
}

export type DeliveryMethod =
  | 'hand_delivery'
  | 'mail_delivery';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:3000/carts';
  private cartStorageKey = 'cartId';
  private deliveryStorageKey = 'deliveryMethod';

  constructor(private http: HttpClient) {}


  addToCart(productId: string, quantity: number): Observable<CartResponse> {

    const cartId = sessionStorage.getItem(this.cartStorageKey);

    // Aucun panier → création
    if (!cartId) {

      return this.http.post<CartResponse>(
        this.apiUrl,
        {
          items: [
            {
              productId,
              quantity
            }
          ]
        }
      ).pipe(

        tap(response => {
          sessionStorage.setItem(
            this.cartStorageKey,
            response.cart._id
          );
        })

      );
    }

    // Panier existant → ajout du produit
    return this.http.patch<CartResponse>(
      `${this.apiUrl}/${cartId}/add`,
      {
        productId,
        quantity
      }
    );
  }


  getCart(): Observable<CartResponse> {

    const cartId = sessionStorage.getItem(this.cartStorageKey);

    return this.http.get<CartResponse>(
      `${this.apiUrl}/${cartId}`
    );
  }


  removeFromCart(
    productId: string,
    quantity: number
  ): Observable<CartResponse> {

    const cartId = sessionStorage.getItem(this.cartStorageKey);

    return this.http.patch<CartResponse>(
      `${this.apiUrl}/${cartId}/remove`,
      {
        productId,
        quantity
      }
    );
  }


  updateQuantity(
    productId: string,
    quantity: number
  ): Observable<CartResponse> {

    const cartId = sessionStorage.getItem(this.cartStorageKey);

    return this.http.patch<CartResponse>(
      `${this.apiUrl}/${cartId}`,
      {
        productId,
        quantity
      }
    );
  }


  deleteCart(): Observable<{ message: string }> {

    const cartId = sessionStorage.getItem(this.cartStorageKey);

    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/${cartId}`
    ).pipe(

      tap(() => {
        sessionStorage.removeItem(this.cartStorageKey);
      })

    );
  }

  setDeliveryMethod(deliveryMethod: 'hand_delivery' | 'mail_delivery'): void {
    sessionStorage.setItem(
      this.deliveryStorageKey,
      deliveryMethod
    );
  }

  getDeliveryMethod(): 'hand_delivery' | 'mail_delivery' | null {
    return sessionStorage.getItem(
      this.deliveryStorageKey
    ) as 'hand_delivery' | 'mail_delivery' | null;
  }
}