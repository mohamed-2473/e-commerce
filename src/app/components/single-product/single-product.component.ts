import { Component, Input, OnInit } from "@angular/core";
import { Product } from "../../types/product";
import { ServiceService } from "../../services/service.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-single-product",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./single-product.component.html",
  styleUrl: "./single-product.component.css",
})
export class SingleProductComponent implements OnInit {
  addToCartFromDetails(item: Product) {
    this.servicefrmdetls.addToCart(item);
  }

  @Input() id?: string;
  prodItem?: Product;
  mainImage: string = "";
  quantity: number = 1;
  selectedColor: string = "";

  constructor(
    private servicefrmdetls: ServiceService,
    private router: Router // Add Router to constructor
  ) {}

  ngOnInit() {
    if (this.id) {
      this.servicefrmdetls
        .getProductById(parseInt(this.id))
        .subscribe((data: Product) => {
          this.prodItem = data;
          this.mainImage = data.thumbnail;
          if (data.colors && data.colors.length > 0) {
            this.selectedColor = data.colors[0];
          }
        });
    }
  }

  calculateDiscountedPrice(price: number, discount: number): number {
    return price - (price * discount) / 100;
  }

  changeMainImage(image: string) {
    this.mainImage = image;
  }

  incrementQuantity() {
    if (this.prodItem && this.quantity < this.prodItem.stock) {
      this.quantity++;
    }
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  updateQuantity(event: any) {
    const value = parseInt(event.target.value);
    if (this.prodItem && !isNaN(value)) {
      if (value >= 1 && value <= this.prodItem.stock) {
        this.quantity = value;
      } else {
        event.target.value = this.quantity;
      }
    }
  }

  getStarRating(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push("bi-star-fill text-warning");
    }

    if (hasHalfStar) {
      stars.push("bi-star-half text-warning");
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push("bi-star text-warning");
    }

    return stars;
  }

  // Add this new method
  navigateToProducts() {
    this.router.navigate(["/products"]); // Adjust the route as needed
  }
}
