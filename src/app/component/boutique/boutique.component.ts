import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.css'],
  standalone: false
})
export class BoutiqueComponent implements OnInit {

  productPeperTree: Product[] = [];
  product: Product | null = null;


  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {

    this.productService.getProducts().subscribe({
      next: (response) => {
        this.productPeperTree = response.products;
      },

      error: (error) => {
        console.error(
          'Erreur lors de la récupération des produits',
          error
        );
      }
    });

  }

  sendCart(product: Product): void {

  this.cartService.addToCart(
    product._id,
    1
  ).subscribe({
    error: (error) => {
      console.error('Erreur lors de l’ajout au panier :', error);
    }
  });

}

}