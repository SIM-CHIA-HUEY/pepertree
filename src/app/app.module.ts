import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

import { FormsModule } from '@angular/forms';
import { BoutiqueComponent } from './boutique/boutique.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ContactComponent } from './contact/contact.component';
import { AproposComponent } from './apropos/apropos.component';
import { FaqComponent } from './faq/faq.component';
// import { JsonPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    BoutiqueComponent,
    AccueilComponent,
    ContactComponent,
    AproposComponent,
    FaqComponent
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
