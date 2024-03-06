import { Component } from '@angular/core';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private categoryService: CategoryService) {}

  setCategory(category: string) {
    this.categoryService.changeCategory(category);
  }
}
