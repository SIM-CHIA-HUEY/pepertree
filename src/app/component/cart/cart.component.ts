import { Component, OnInit } from '@angular/core';
import { CartService, Cart, DeliveryMethod } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: false
})
export class CartComponent implements OnInit {

  cart: Cart | null = null;
  selectedDelivery: DeliveryMethod | null = null;

  constructor(
    private cartService: CartService,
    private router : Router
  ) {}

  ngOnInit(): void {

    this.cartService.getCart().subscribe({
      next: (response) => {
        this.cart = response.cart;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du panier :', error);
      }
    });  
    
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

  // UNE AUTRE MANIERE D'ECRIRE :
  // getCartTotal(): number {
  //   if (!this.cart) {
  //     return 0;
  //   }

  //   return this.cart.items.reduce((total, item) => {
  //     return total + item.productId.price * item.quantity;
  //   }, 0);
  // }

  getCartTotal(): number {
    if (!this.cart) {
      return 0;
    }
    let totalPrice = 0;
    for (let i = 0; i < this.cart.items.length; i++) {
      const item = this.cart.items[i];
      totalPrice += item.productId.price * item.quantity;
    }
    return totalPrice;
  }

  increaseQuantity(productId: string, currentQuantity: number): void {
    this.cartService.updateQuantity(
      productId,
      currentQuantity + 1
    ).subscribe({
      next: (response) => {
        this.cart = response.cart;
      },
      error: (error) => {
        console.error(
          'Erreur lors de l’augmentation de la quantité :',
          error
        );
      }
    });
  }

  decreaseQuantity(productId: string, currentQuantity: number): void {

    if (currentQuantity <= 1) {
      return;
    }

    this.cartService.updateQuantity(
      productId,
      currentQuantity - 1
    ).subscribe({
      next: (response) => {
        this.cart = response.cart;
      },
      error: (error) => {
        console.error(
          'Erreur lors de la diminution de la quantité :',
          error
        );
      }
    });
  }

  deleteProduct(productId: string, quantity: number): void {
    this.cartService.removeFromCart(
      productId,
      quantity
    ).subscribe({
      next: (response) => {
        this.cart = response.cart;
      },
      error: (error) => {
        console.error(
          'Erreur lors de la supression du produit :',
          error
        );
      }
    });
  }

  saveDeliveryMethod(): void {
    if (this.selectedDelivery !== null) {
      this.cartService.setDeliveryMethod(
        this.selectedDelivery
      );
    }
  }

  goToOrder(): void {
    const deliveryMethod =
      this.cartService.getDeliveryMethod();
    if (!deliveryMethod) {
      return;
    }
    this.router.navigate(['/commande']);
  }
}