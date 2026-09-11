import { Component } from '@angular/core';
import { CartService, Cart, DeliveryMethod } from '../../services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
  standalone: false
})
export class OrderComponent {

  cart: Cart | null = null;
  selectedDelivery: DeliveryMethod | null = null;

  constructor(
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.selectedDelivery =
        this.cartService.getDeliveryMethod();

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

  getCartTotal(): number {
    if (!this.cart) {
      return 0;
    }
    let totalPrice = 0;

    for (let i = 0; i < this.cart.items.length; i++) {
      const item = this.cart.items[i];
      totalPrice +=
        item.productId.price * item.quantity;
    }
    return totalPrice;
  }

}
