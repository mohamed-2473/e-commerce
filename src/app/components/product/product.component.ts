// product.component.ts
import { Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ServiceService } from "../../services/service.service";
import { Product } from "../../types/product";
import { CurrencyPipe, CommonModule } from "@angular/common";

@Component({
  selector: "app-product",
  standalone: true,
  imports: [RouterLink, CurrencyPipe, CommonModule],
  templateUrl: "./product.component.html",
  styleUrl: "./product.component.css",
})
export class ProductComponent {
  @Input() productItem!: Product;

  constructor(private productService: ServiceService) {}

  addToCart() {
    this.productService.addToCart(this.productItem);
  }

  addToWishlist() {
    this.productService.addToWishlist(this.productItem);
  }
}