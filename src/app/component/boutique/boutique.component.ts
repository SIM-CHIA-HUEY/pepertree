import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.css'],
  standalone: false
})
export class BoutiqueComponent implements OnInit {

  productPeperTree: Product[] = [];

  constructor(
    private productService: ProductService
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

}