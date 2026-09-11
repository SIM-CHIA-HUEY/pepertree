import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { Cart, DeliveryMethod } from '../../models/cart.model';
import { OrderService, CreateOrderData, Delivery } from '../../services/order.service';


@Component({
  selector: 'app-order',
  standalone: false,
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  cart: Cart | null = null;

  selectedDelivery: DeliveryMethod | null = null;

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


  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}


  ngOnInit(): void {

    // Récupérer le mode de livraison choisi
    this.selectedDelivery =
      this.cartService.getDeliveryMethod();


    // Récupérer le panier
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
    for ( let i = 0; i < this.cart.items.length; i++) {
      const item = this.cart.items[i];
      totalPrice +=
        item.productId.price *
        item.quantity;
    }
    return totalPrice;
  }


  validateOrder(): void {

    // Vérifier qu'il y a bien un panier
    if (!this.cart) {
      return;
    }

    // Vérifier qu'un mode de livraison a été choisi
    if (!this.selectedDelivery) {
      return;
    }

    // Construire les données de la commande
    const orderData: CreateOrderData = {

      customer: {
        name: this.customer.name,
        email: this.customer.email,
        telephone: this.customer.telephone
      },

      items: this.cart.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity
      })),

      deliveryMethod:
        this.selectedDelivery,

      delivery: {

        // Main propre
        pickupPoint:
          this.selectedDelivery === 'hand_delivery'
            ? this.delivery.pickupPoint
            : undefined,

        // Courrier
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

      }

    };

    // Créer la commande
    this.orderService
      .createOrder(orderData)
      .subscribe({
        next: () => {
          // La commande a bien été créée.
          // On peut maintenant supprimer le panier.
          this.cartService
            .deleteCart()
            .subscribe({
              next: () => {
                // Aller vers la confirmation
                this.router.navigate([
                  '/confirmation'
                ]);
              },

              error: (error) => {
                console.error(
                  'Erreur lors de la suppression du panier :',
                  error
                );
              }

            });

        },

        error: (error) => {
          console.error(
            'Erreur lors de la création de la commande :',
            error
          );
        }

      });

  }

}