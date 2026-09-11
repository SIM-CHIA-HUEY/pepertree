import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './component/accueil/accueil.component';
import { BoutiqueComponent } from './component/boutique/boutique.component';
import { ProductComponent } from './component/product/product.component';
import { CartComponent } from './component/cart/cart.component';
import { OrderComponent } from './component/order/order.component';
import { AproposComponent } from './component/apropos/apropos.component';
import { ContactComponent } from './component/contact/contact.component';
import { FaqComponent } from './component/faq/faq.component';
import { JournalblogComponent } from './component/journalblog/journalblog.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'boutique', component: BoutiqueComponent },
  { path: 'panier', component: CartComponent },
  { path: 'commande', component: OrderComponent },
  { path: 'produit/:slug', component: ProductComponent},
  { path: 'quiestpeper', component: AproposComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'journal', component: JournalblogComponent },
  { path: '**', redirectTo: '' } // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
