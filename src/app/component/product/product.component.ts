import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product, ProductImage } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone: false
})
export class ProductComponent implements OnInit {

  product: Product | null = null;
  quantity: number = 1;
  selectedImage: ProductImage | null = null;
  isImageModalOpen = false;
  isInCart = false;

  readonly maxQuantity = 5;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      this.productService.getProduct(slug).subscribe({
        next: (response) => {
          this.product = response.product;
          this.loadQuantityFromCart();
        },
        error: (error) => {
          console.error(
            'Erreur lors de la récupération du produit',
            error
          );
        }
      });
    }
  }

  private loadQuantityFromCart(): void {
    const cartId = sessionStorage.getItem('cartId');

    // Aucun panier dans le storage
    if (!cartId) {
      return;
    }

    this.cartService.getCart().subscribe({
      next: (response) => {
        const cartItem = response.cart.items.find(
          item => item.productId._id === this.product?._id
        );

        if (cartItem) {
          this.quantity = cartItem.quantity;
          this.isInCart = true;
        }
      },
      error: (error) => {
        console.error(
          'Erreur lors de la récupération du panier :',
          error
        );
      }
    });
  }

  increaseQuantity(): void {
    if (this.quantity < this.maxQuantity) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  private updateCartQuantity(): void {
    if (!this.product) {
      return;
    }

    this.cartService.updateQuantity(
      this.product._id,
      this.quantity
    ).subscribe({
      error: (error) => {
        console.error(
          'Erreur lors de la mise à jour du panier :',
          error
        );
      }
    });
  }

  openImageModal(image: ProductImage): void {
    this.selectedImage = image;
    this.isImageModalOpen = true;
  }

  closeImageModal(): void {
    this.selectedImage = null;
    this.isImageModalOpen = false;
  }

  sendCart(): void {
    if (!this.product) {
      return;
    }

    if (this.isInCart) {
      this.updateCartQuantity();
      return;
    }

    this.cartService.addToCart(
      this.product._id,
      this.quantity
    ).subscribe({
      next: () => {
        this.isInCart = true;
      },
      error: (error) => {
        console.error(
          'Erreur lors de l’ajout au panier :',
          error
        );
      }
    });
  }
}