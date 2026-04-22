import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-boutique',
    templateUrl: './boutique.component.html',
    styleUrls: ['./boutique.component.css'],
    standalone: false
})
export class BoutiqueComponent implements OnInit {
  
  productPeperTree : any[] = [];
  
  constructor() { 
  }

  ngOnInit(): void {
    this.productPeperTree = [
      {
        id: 10029,
        name: "Sticker autocollant Holographique de Myrtille Concentré - MY01",
        image: "assets/MyrtilleConcentre_de_PerperTree-1.jpg",
        price: "3.50",
      },
      {
        id: 20399,
        name: "Sticker autocollant Transparent de Maxou en Dino - MA01",
        image: "assets/MaxouCosplay-PeperTree.jpg",
        price: "3.20",
      },
      {
        id: 33483,
        name: "Sticker autocollant Transparent de Mellow dans son chaudron - ME01",
        image: "assets/MellowCachee-Pepertree.jpg",
        price: "1.50",
      },
  {
        id: 33409,
        name: "Sticker autocollant Scintillant de Pouette pour Noël - PO01",
        image: "assets/PouetteNoel-PeperTree.jpg",
        price: "3.20",
      },
      

    ];
  }

}
