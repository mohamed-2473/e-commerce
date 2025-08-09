import { Component } from '@angular/core';
import { Product } from '../../types/product';
import { ServiceService } from '../../services/service.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartList: Product[] = [];
  isLoading = true;
  itemQuantities: {[key: number]: number} = {};

  constructor(
    private productService: ServiceService,
    private router: Router
  ) {}

  proceedToCheckout() {
    this.router.navigate(['/payment']);
  }
  

  // Remove all quantities of an item
  removeItemCompletely(item: Product) {
    this.productService.removeFromCart(item, true); // true = remove all
  }

  // Remove one quantity of an item
  removeItem(item: Product) {
    if (this.itemQuantities[item.id] > 1) {
      this.itemQuantities[item.id] -= 1;
    } else {
      this.removeItemCompletely(item);
    }
  }

  updateQuantity(item: Product, change: number) {
    const newQuantity = (this.itemQuantities[item.id] || 1) + change;
    if (newQuantity > 0) {
      this.itemQuantities[item.id] = newQuantity;
    } else {
      this.removeItemCompletely(item);
    }
  }

  ngOnInit() {
    this.productService.cartItems$.subscribe((data) => {
      this.cartList = data;
      data.forEach(item => {
        if (!this.itemQuantities[item.id]) {
          this.itemQuantities[item.id] = 1;
        }
      });
      this.isLoading = false;
    });
  }

  // Calculate total price
  get totalPrice(): number {
    return this.cartList.reduce((total, item) => 
      total + (item.price * (this.itemQuantities[item.id] || 1)), 0);
  }

  // Calculate total number of items (sum of quantities)
  get totalItems(): number {
    return this.cartList.reduce((total, item) => 
      total + (this.itemQuantities[item.id] || 1), 0);
  }
}