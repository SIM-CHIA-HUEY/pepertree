import { Component, NgModule, OnInit } from '@angular/core';
import { Mail } from 'src/mail';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})

export class ContactFormComponent implements OnInit {

  constructor() { }

  model = new Mail('SIM CHIA HUEY','sim.chiahuey@gmail.com','Je veux commander 2 stickers Myrtille ...');
  
  
  submitted = false;

  onSubmit(){
    this.submitted = true;
    console.log("submitted");
  }

  ngOnInit(): void {
  const myMail = new Mail('SIM CHIA HUEY','sim.chiahuey@gmail.com','Je veux commander 2 stickers Myrtille ...');
  console.log(myMail.name);
  }

}
// TODO : pass data from template to component who sends text email to sim.chiahuey@gmail.com