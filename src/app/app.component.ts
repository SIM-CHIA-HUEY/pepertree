import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pepertree-test';
  isOpen = false;

    toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit(){

  }

}

