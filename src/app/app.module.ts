import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactFormComponent } from './component/contact-form/contact-form.component';

import { FormsModule } from '@angular/forms';
import { BoutiqueComponent } from './component/boutique/boutique.component';
import { AccueilComponent } from './component/accueil/accueil.component';
import { ContactComponent } from './component/contact/contact.component';
import { AproposComponent } from './component/apropos/apropos.component';
import { FaqComponent } from './component/faq/faq.component';
import { JournalblogComponent } from './component/journalblog/journalblog.component';
// import { JsonPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    BoutiqueComponent,
    AccueilComponent,
    ContactComponent,
    AproposComponent,
    FaqComponent,
    JournalblogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule, 
    // JsonPipe,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
