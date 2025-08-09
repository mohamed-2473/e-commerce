import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent {
  currentYear = new Date().getFullYear();

  quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
    { path: '/faq', label: 'FAQs' },
    { path: '/privacy', label: 'Privacy Policy' }
  ];

  categories = [
    { path: '/products?category=electronics', label: 'Electronics' },
    { path: '/products?category=clothing', label: 'Clothing' },
    { path: '/products?category=home', label: 'Home & Garden' },
    { path: '/products?category=beauty', label: 'Beauty' },
    { path: '/products?category=sports', label: 'Sports' },
    { path: '/products?category=books', label: 'Books' }
  ];

  socialLinks = [
    { icon: 'bi-facebook', url: '#' },
    { icon: 'bi-twitter', url: '#' },
    { icon: 'bi-instagram', url: '#' },
    { icon: 'bi-linkedin', url: '#' },
    { icon: 'bi-youtube', url: '#' }
  ];

  contactInfo = {
    address: '123 Shopping Street, Downtown District, New York, NY 10001',
    phone: '+1 (555) 123-4567',
    email: 'support@mystore.com',
    hours: 'Mon-Fri: 9AM-8PM, Sat: 10AM-6PM, Sun: 12PM-5PM'
  };
}