import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
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

  increaseQuantity(): void {
  this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
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

    this.cartService.addToCart(
      this.product._id,
      this.quantity
    ).subscribe({
      next: () => {
        this.router.navigate(['/panier']);
      },
      error: (error) => {
        console.error('Erreur lors de l’ajout au panier :', error);
      }
    });
  }
}