import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ProductService } from '../../services/product.service'; 
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.component.html',
    styleUrls: ['./accueil.component.css'],
    standalone: false
})
export class AccueilComponent implements OnInit {
  mobileView: any ;
  isModalShow = false;
  productPeperTree : any[] = [];
  selectedProduct: Product | null = null;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

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

  @HostListener("window:resize", [])
    onResize() {
      if (window.screen.width <= 390) { 
      this.mobileView = true;
    } else if (window.screen.width >= 400){
      this.mobileView = false;
    }
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
