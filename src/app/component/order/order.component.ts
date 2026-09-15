import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { Cart, DeliveryMethod } from '../../models/cart.model';
import {
  OrderService,
  CreateOrderData,
  Delivery
} from '../../services/order.service';

@Component({
  selector: 'app-order',
  standalone: false,
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  cart: Cart | null = null;

  selectedDelivery: DeliveryMethod | null = null;

  shippingMethod: 'tracked' | 'untracked' | null = null;

  customer = {
    name: '',
    email: '',
    telephone: ''
  };

  delivery: Delivery = {
    pickupPoint: '',
    address: '',
    apartment: '',
    intercom: '',
    doorCode: ''
  };

  formSubmitted = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedDelivery = this.cartService.getDeliveryMethod();

    this.cartService.getCart().subscribe({
      next: (response) => {
        this.cart = response.cart;
      },
      error: (error) => {
        console.error(
          'Erreur lors de la récupération du panier :',
          error
        );
      }
    });
  }

  getTotalQuantity(): number {
    return this.cart?.items.reduce(
      (total, item) => total + item.quantity,
      0
    ) ?? 0;
  }

  getCartTotal(): number {
    return this.cart?.items.reduce(
      (total, item) =>
        total + item.productId.price * item.quantity,
      0
    ) ?? 0;
  }

  getShippingCost(): number {
    if (
      this.selectedDelivery === 'hand_delivery' ||
      !this.shippingMethod
    ) {
      return 0;
    }

    const quantity = this.getTotalQuantity();

    if (quantity >= 7) {
      return 0;
    }

    if (this.shippingMethod === 'tracked') {
      return quantity <= 3 ? 2.50 : 1;
    }

    return quantity <= 3 ? 1 : 0;
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  validateOrder(): void {
    this.formSubmitted = true;

    if (!this.isOrderValid()) {
      return;
    }

    const orderData = this.buildOrderData();

    this.orderService.createOrder(orderData).subscribe({
      next: () => this.deleteCartAndRedirect(),
      error: (error) => {
        console.error(
          'Erreur lors de la création de la commande :',
          error
        );
      }
    });
  }

  private isOrderValid(): boolean {
    if (!this.cart) {
      return false;
    }

    if (!this.selectedDelivery) {
      return false;
    }

    if (
      !this.customer.name ||
      !this.customer.email ||
      !this.customer.telephone
    ) {
      return false;
    }

    if (!this.isValidEmail(this.customer.email)) {
      return false;
    }

    if (
      this.selectedDelivery === 'hand_delivery' &&
      !this.delivery.pickupPoint
    ) {
      return false;
    }

    if (
      this.selectedDelivery === 'mail_delivery' &&
      (
        !this.delivery.address ||
        !this.shippingMethod
      )
    ) {
      return false;
    }

    return true;
  }

  private buildOrderData(): CreateOrderData {
    const shippingMethod =
      this.selectedDelivery === 'mail_delivery'
        ? this.shippingMethod
        : null;

    return {
      customer: {
        name: this.customer.name,
        email: this.customer.email,
        telephone: this.customer.telephone
      },

      items: this.cart!.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity
      })),

      deliveryMethod: this.selectedDelivery!,

      delivery: {
        pickupPoint:
          this.selectedDelivery === 'hand_delivery'
            ? this.delivery.pickupPoint
            : undefined,

        address:
          this.selectedDelivery === 'mail_delivery'
            ? this.delivery.address
            : undefined,

        apartment:
          this.selectedDelivery === 'mail_delivery'
            ? this.delivery.apartment
            : undefined,

        intercom:
          this.selectedDelivery === 'mail_delivery'
            ? this.delivery.intercom
            : undefined,

        doorCode:
          this.selectedDelivery === 'mail_delivery'
            ? this.delivery.doorCode
            : undefined
      },

      shippingMethod
    };
  }

  private deleteCartAndRedirect(): void {
    this.cartService.deleteCart().subscribe({
      next: () => {
        this.router.navigate(['/merci']);
      },
      error: (error) => {
        console.error(
          'Erreur lors de la suppression du panier :',
          error
        );
      }
    });
  }
}
