import { Component } from '@angular/core';
import { Product } from '../../types/product';
import { ServiceService } from '../../services/service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  wishList: Product[] = [];
  isLoading = true;

  constructor(private productService: ServiceService) { }

  // Remove item from wishlist
  removeItemCompletely(item: Product) {
    this.productService.removeFromWishlist(item.id);
  }

  // Move item to cart
  moveToCart(item: Product) {
    this.productService.addToCart(item);
    this.removeItemCompletely(item);
  }

  ngOnInit() {
    this.productService.wishlistItems$.subscribe({
      next: (data) => {
        this.wishList = data;
        this.isLoading = false;
      },
      error: (err: Error) => {
        console.error('Error loading wishlist:', err);
        this.isLoading = false;
      }
    });
  }

  // Calculate total number of items in wishlist
  get totalItems(): number {
    return this.wishList.length;
  }

}
