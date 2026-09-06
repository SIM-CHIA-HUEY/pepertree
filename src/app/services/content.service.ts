import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Block {
  type: 'paragraph' | 'image' | 'video';
  content?: string;
  src?: string;
  alt?: string;
}

export interface Article {
  title: string;
  date: string;
  blocks: Block[];
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    let articles = this.getArticles();
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>('assets/content/journal-content.json');
  }
}