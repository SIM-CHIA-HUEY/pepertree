import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DeliveryMethod } from '../models/cart.model';

import { environment } from '../../environments/environment';

export interface Customer {
  name: string;
  email: string;
  telephone: string;
}

export interface Delivery {
  pickupPoint?: string;
  address?: string;
  apartment?: string;
  intercom?: string;
  doorCode?: string;
}

export interface CreateOrderData {
  customer: Customer;
  items: {
    productId: string;
    quantity: number;
  }[];
  deliveryMethod: DeliveryMethod;
  delivery: Delivery;
  shippingMethod: 'tracked' | 'untracked' | null;

}

export interface OrderResponse {
  message: string;
  order: any;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // private apiUrl = 'http://localhost:3000/orders';
  private apiUrl = `${environment.apiUrl}/orders`;


  constructor(
    private http: HttpClient
  ) {}

  createOrder(
    orderData: CreateOrderData
  ): Observable<OrderResponse> {

    return this.http.post<OrderResponse>(
      this.apiUrl,
      orderData
    );
  }
}