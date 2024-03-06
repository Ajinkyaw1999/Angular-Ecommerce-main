// category.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categorySource = new BehaviorSubject<string>('all');
  currentCategory = this.categorySource.asObservable();

  changeCategory(category: string) {
    this.categorySource.next(category);
  }
}
