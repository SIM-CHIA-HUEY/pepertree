import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
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

