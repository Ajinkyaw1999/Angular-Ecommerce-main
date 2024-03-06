//Product-View.Component.ts
import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/Services/api.service";
import { CategoryService } from "src/app/Services/category.service";
import { product } from "./productmodal";
import { NgForm } from '@angular/forms';


@Component({
  selector: "app-product-view",
  templateUrl: "./product-view.component.html",
  styleUrls: ["./product-view.component.css"],
})
export class ProductViewComponent implements OnInit {
  data: any | product[];
  item: any;
  constructor(private api: ApiService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.displayproducts();
    this.subscribeToCategoryChanges();
    localStorage.removeItem("ecomdata");
  }
  displayproducts() {
    this.api.getproduct().subscribe((res) => {
      this.data = res;
      console.log(res);
    });
  }
  addtocart(item: product) {
    this.api.addtocart(item);
  }

  removeitem(item: product) {
    this.api.removecartitem(item);
  }

   searchProducts(keyword: string) {
    if (keyword.trim() !== '') {
      this.api.searchProduct(keyword).subscribe((res) => {
        this.data = res;
      });
    } else {
      // If the search bar is empty, display all products
      this.displayproducts();
    }
  }

  subscribeToCategoryChanges() {
    this.categoryService.currentCategory.subscribe((category) => {
      if (category !== 'all') {
        this.displayProductsByCategory(category);
      } else {
        this.displayproducts();
      }
    });
  }

  // Other methods...

  displayProductsByCategory(category: string) {
    this.api.getProductsByCategory(category).subscribe((res) => {
      this.data = res;
    });
  }

  addNewProduct(newProductFormValue: any) {
    console.log('Form Value:', newProductFormValue);
  
    // Call the API service to add the new product
    this.api.addProduct(newProductFormValue).subscribe((res) => {
      console.log('Product added successfully', res);
  
      // Fetch the updated product list after adding
      this.displayproducts();
    });
  }
  
}

