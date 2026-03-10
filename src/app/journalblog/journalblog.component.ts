import { Component, OnInit } from '@angular/core';
import * as journalContent from '../../assets/content/journal-content.json';

@Component({
    selector: 'app-journalblog',
    templateUrl: './journalblog.component.html',
    styleUrls: ['./journalblog.component.css'],
    standalone: false
})
export class JournalblogComponent implements OnInit {
  // The ().default accesses the actual JSON content, when you import it like a module, instead of HttpClient.
  contents: any = (journalContent as any).default;
  
  // Track current slide index for each content item
  currentSlideIndices: { [key: string]: number } = {};

  get reversedContents() {
    return [...this.contents].reverse();
  }

  constructor() { }

  ngOnInit(): void {
    // Initialize current slide index for each content item
    this.reversedContents.forEach((content: any) => {
      this.currentSlideIndices[content.id] = 0;
    });
  }

  // Carousel navigation methods
  nextSlide(contentId: string, imageCount: number): void {
    if (this.currentSlideIndices[contentId] < imageCount - 1) {
      this.currentSlideIndices[contentId]++;
    }
  }

  prevSlide(contentId: string, imageCount: number): void {
    if (this.currentSlideIndices[contentId] > 0) {
      this.currentSlideIndices[contentId]--;
    }
  }

  getCurrentSlideIndex(contentId: string): number {
    return this.currentSlideIndices[contentId] || 0;
  }
}
