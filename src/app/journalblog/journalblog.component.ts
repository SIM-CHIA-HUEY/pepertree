import { Component, OnInit } from '@angular/core';
import * as journalContent from '../../assets/content/journal-content.json';

@Component({
  selector: 'app-journalblog',
  templateUrl: './journalblog.component.html',
  styleUrls: ['./journalblog.component.css']
})
export class JournalblogComponent implements OnInit {
  // The ().default accesses the actual JSON content, when you import it like a module, instead of HttpClient.
  contents: any = (journalContent as any).default;
  singleImage : boolean = false ;
  multipleImage : boolean = false ;
  multipleImagesArray = [];

  constructor() { }

  ngOnInit(): void {
    // check for each ID this.contents.image = 1 or > 1
    // if = 1, send singleImage to html for that ID
    // if > 1, send multipleImage to html to that ID, and send content.image to a new array for display on html

    for (let i=0 ; i<this.contents.length ; i++) {
      // console.log(this.contents[i].image.length)

      if(this.contents[i].image.length == 1){
        this.singleImage = true;
        this.multipleImage = false;
        this.multipleImagesArray = this.contents[i].image;
        console.log('single?:',this.singleImage,'; multiple:',this.multipleImage)


      } else if (this.contents[i].image.length > 1) {
        this.singleImage = false;
        this.multipleImage = true;
        this.multipleImagesArray = this.contents[i].image;
        console.log(this.multipleImagesArray)
        console.log('single?:',this.singleImage,'; multiple:',this.multipleImage)

      }

      // console.log(this.contents[i].length)

    }

    // console.log(this.contents);

  }

}
