import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Product } from '../types/product';  
import { Prod } from '../types/Prod';        

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  // For Cart
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  // For Wishlist
  private wishlistItemsSubject = new BehaviorSubject<Product[]>([]);
  wishlistItems$ = this.wishlistItemsSubject.asObservable();

  // Add to cart with quantity tracking
  addToCart(product: Product) {
    const currentItems = this.cartItemsSubject.getValue();
    const existingItemIndex = currentItems.findIndex(item => item.id === product.id);
    if (existingItemIndex === -1) {
      this.cartItemsSubject.next([...currentItems, product]);
    } else {
      alert("This item is already in your cart");
    }
  }

  // Remove items with two modes
  removeFromCart(item: Product, removeAll: boolean = false) {
    const currentItems = this.cartItemsSubject.getValue();
    if (removeAll) {
      this.removeAllQuantities(item, currentItems);
    } else {
      this.removeOneQuantity(item, currentItems);
    }
  }

  private removeAllQuantities(item: Product, currentItems: Product[]) {
    const updatedCart = currentItems.filter(cartItem => cartItem.id !== item.id);
    this.cartItemsSubject.next(updatedCart);
  }

  private removeOneQuantity(item: Product, currentItems: Product[]) {
    const itemIndex = currentItems.findIndex(cartItem => cartItem.id === item.id);
    if (itemIndex !== -1) {
      const updatedCart = [...currentItems];
      updatedCart.splice(itemIndex, 1);
      this.cartItemsSubject.next(updatedCart);
    }
  }

  // Add to Wishlist
  addToWishlist(product: Product) {
    const currentWishlist = this.wishlistItemsSubject.value;
    const exists = currentWishlist.some(item => item.id === product.id);
    if (!exists) {
      this.wishlistItemsSubject.next([...currentWishlist, product]);
    } else {
      alert("This item is already in your wishlist");
    }
  }

  // Remove from Wishlist
  removeFromWishlist(productId: number) {
    const updatedWishlist = this.wishlistItemsSubject.value.filter(item => item.id !== productId);
    this.wishlistItemsSubject.next(updatedWishlist);
  }

  // Get total price of cart items
  getTotalPrice(): number {
    return this.cartItemsSubject.getValue().reduce((total, item) => total + item.price, 0);
  }

  // Clear entire cart
  clearCart(): void {
    this.cartItemsSubject.next([]);
  }

  // Get cart item count
  getCartItemCount(): number {
    return this.cartItemsSubject.getValue().length;
  }

  // Get current cart items (synchronous)
  getCurrentCart(): Product[] {
    return this.cartItemsSubject.getValue();
  }

  // Get all products from API
  getAllItems(): Observable<Prod> {
    return this.http.get<Prod>('https://dummyjson.com/products');
  }

  // Get single product by ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`https://dummyjson.com/products/${id}`);
  }
}
