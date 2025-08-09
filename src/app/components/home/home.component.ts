// home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // Featured products data
  featuredProducts = [
    {
      id: 1,
      name: 'Premium Laptop',
      description: 'High-performance laptop with latest processor and graphics card.',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
      badge: 'Best Seller'
    },
    {
      id: 2,
      name: 'Wireless Headphones',
      description: 'Premium noise-canceling headphones with superior sound quality.',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      badge: 'New Arrival'
    },
    {
      id: 3,
      name: 'Smart Watch',
      description: 'Feature-rich smartwatch with health monitoring and GPS.',
      price: 399.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      badge: 'Special Offer'
    }
  ];

  // Customer testimonials
  testimonials = [
    {
      name: 'Sarah Johnson',
      comment: 'Amazing products and fast delivery! Will definitely shop here again.',
      rating: 5,
      avatar: 'https://i.imgur.com/kmpl3Iy.jpg'
    },
    {
      name: 'Mike Chen',
      comment: 'Great customer service and high-quality products. Highly recommended!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face'
    },
    {
      name: 'Emily Davis',
      comment: 'Love the variety and competitive prices. Shopping here is always a pleasure.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face'
    }
  ];

  // Newsletter subscription
  onSubscribeNewsletter(email: string) {
    if (email) {
      // Here you would typically call a service to handle newsletter subscription
      alert('Thank you for subscribing to our newsletter!');
    }
  }

  // Generate star rating array
  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, index) => index < rating);
  }
}