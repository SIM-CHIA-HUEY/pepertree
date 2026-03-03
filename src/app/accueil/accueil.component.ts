import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.component.html',
    styleUrls: ['./accueil.component.css'],
    standalone: false
})
export class AccueilComponent implements OnInit {
  itemIdForModal: any;
  mobileView: any ;
  isModalShow = false;
  productPeperTree : any[] = [];
  modalImage: String = "";
  modalTitle: String = "";
  modalPrice: String = "";

  constructor() { }

  @HostListener("window:resize", [])
    onResize() {
      if (window.screen.width <= 390) { 
      this.mobileView = true;
    } else if (window.screen.width >= 400){
      this.mobileView = false;
    }
  }

  ngOnInit(): void {

    this.productPeperTree = [
      {
        id: "MY01",
        name: "Sticker autocollant Holographique de Myrtille Concentré MY01",
        image: "/assets/MyrtilleConcentre_de_PerperTree-1.jpg",
        price: "3.50",
      },
      {
        id: "MA02",
        name: "Sticker autocollant Transparent de Maxou en Dino MA01",
        image: "/assets/MaxouCosplay-PeperTree.jpg",
        price: "3.20",
      },
      {
        id: "ME01",
        name: "Sticker autocollant Transparent de Mellow dans son chaudron ME01",
        image: "/assets/MellowCachee-Pepertree.jpg",
        price: "1.50",
      },
      {
        id: "PO01",
        name: "Sticker autocollant Scintillant de Pouette pour Noël PO01",
        image: "/assets/PouetteNoel-PeperTree.jpg",
        price: "3.20",
      },
    ];

  }

  

  openModal(itemId:any) {
    this.isModalShow ? this.isModalShow = false : this.isModalShow = true;
    this.itemIdForModal = itemId;
    if (itemId === "MY01"){
      this.modalImage = "/assets/MyrtilleConcentre_de_PerperTree-1.jpg";
      this.modalTitle = "Sticker autocollant Holographique de Myrtille Concentré MY01";
      this.modalPrice = "3.50";
    } else if (itemId === "MA02") {
      this.modalImage = "/assets/MaxouCosplay-PeperTree.jpg";
      this.modalTitle = "Sticker autocollant Transparent de Maxou en Dino MA01";
      this.modalPrice = "3.20";
    } else if (itemId === "ME01") {
      this.modalImage = "/assets/MellowCachee-Pepertree.jpg";
      this.modalTitle = "Sticker autocollant Transparent de Mellow dans son chaudron ME01";
      this.modalPrice = "1.50";
    } else if (itemId === "PO01") {
      this.modalImage = "/assets/PouetteNoel-PeperTree.jpg";
      this.modalTitle = "Sticker autocollant Scintillant de Pouette pour Noël PO01";
      this.modalPrice = "3.20";
    }
  }

  closeModal() {
    this.isModalShow ? this.isModalShow = false : this.isModalShow = true;
  }

}
