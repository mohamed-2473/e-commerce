// my-orders.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../types/product';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  orderDate: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  items: OrderItem[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  trackingNumber?: string;
  estimatedDelivery?: Date;
}

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  user: any = null;

  constructor(
    private service: ServiceService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (user) {
        this.loadOrders();
      }
    });
  }

  loadOrders() {
    // Simulate loading orders from service
    // In a real app, you would call this.service.getUserOrders()
    setTimeout(() => {
      this.orders = this.getMockOrders();
      this.loading = false;
    }, 1000);
  }

  getMockOrders(): Order[] {
    return [
      {
        id: 'ORD-2024-001',
        orderDate: new Date('2024-07-15'),
        status: 'delivered',
        totalAmount: 299.99,
        trackingNumber: 'TRK123456789',
        estimatedDelivery: new Date('2024-07-20'),
        items: [
          {
            id: 1,
            name: 'Wireless Headphones',
            price: 149.99,
            quantity: 1,
            image: 'https://via.placeholder.com/80?text=Headphones'
          },
          {
            id: 2,
            name: 'Phone Case',
            price: 24.99,
            quantity: 1,
            image: 'https://via.placeholder.com/80?text=Case'
          }
        ],
        shippingAddress: {
          street: '123 Main St',
          city: 'Cairo',
          state: 'Cairo',
          zipCode: '12345',
          country: 'Egypt'
        }
      },
      {
        id: 'ORD-2024-002',
        orderDate: new Date('2024-08-01'),
        status: 'shipped',
        totalAmount: 89.99,
        trackingNumber: 'TRK987654321',
        estimatedDelivery: new Date('2024-08-10'),
        items: [
          {
            id: 3,
            name: 'Bluetooth Speaker',
            price: 89.99,
            quantity: 1,
            image: 'https://via.placeholder.com/80?text=Speaker'
          }
        ],
        shippingAddress: {
          street: '456 Oak Ave',
          city: 'Cairo',
          state: 'Cairo',
          zipCode: '12346',
          country: 'Egypt'
        }
      },
      {
        id: 'ORD-2024-003',
        orderDate: new Date('2024-08-05'),
        status: 'processing',
        totalAmount: 199.99,
        items: [
          {
            id: 4,
            name: 'Smart Watch',
            price: 199.99,
            quantity: 1,
            image: 'https://via.placeholder.com/80?text=Watch'
          }
        ],
        shippingAddress: {
          street: '789 Pine St',
          city: 'Cairo',
          state: 'Cairo',
          zipCode: '12347',
          country: 'Egypt'
        }
      }
    ];
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'bg-warning text-dark';
      case 'processing':
        return 'bg-info';
      case 'shipped':
        return 'bg-primary';
      case 'delivered':
        return 'bg-success';
      case 'cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'pending':
        return 'bi-clock';
      case 'processing':
        return 'bi-arrow-repeat';
      case 'shipped':
        return 'bi-truck';
      case 'delivered':
        return 'bi-check-circle';
      case 'cancelled':
        return 'bi-x-circle';
      default:
        return 'bi-question-circle';
    }
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  }

reorderItems(order: Order) {
  // Add all items from this order to cart
  order.items.forEach(item => {
    const product: Product = {
      id: item.id,
      title: item.name,
      price: item.price,
      thumbnail: item.image,
      images: [item.image], // Convert single image to array
      quantity: item.quantity,
      // Add required properties with default values
      description: '',
      category: '',
      brand: '',
      sku: '',
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      minimumOrderQuantity: 1,
      availabilityStatus: 'in stock',
      returnPolicy: '',
      warrantyInformation: '',
      shippingInformation: '',
      weight: 0,
      dimensions: { width: 0, height: 0, depth: 0 },
      tags: [],
      features: {},
      colors: {},
      reviews: [],
      meta: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        barcode: '',
        qrCode: ''
      }
    };
    
    this.service.addToCart(product);
  });
  
  // You might want to show a success message here
  console.log('Items added to cart for reorder');
}

  trackOrder(trackingNumber: string) {
    // In a real app, this would open a tracking page or external tracking site
    console.log('Tracking order:', trackingNumber);
    window.open(`https://example-shipping.com/track/${trackingNumber}`, '_blank');
  }

  cancelOrder(orderId: string) {
    if (confirm('Are you sure you want to cancel this order?')) {
      // In a real app, you would call this.service.cancelOrder(orderId)
      const order = this.orders.find(o => o.id === orderId);
      if (order) {
        order.status = 'cancelled';
      }
    }
  }
}