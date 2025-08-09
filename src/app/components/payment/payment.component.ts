import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  imports: [FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  paymentMethod: string = 'creditCard'; // Default payment method
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  nameOnCard: string = '';

  constructor(
    private router: Router,
    private serviceService: ServiceService
  ) {}

  // Handle back to cart button
  backToCart() {
    this.router.navigate(['/cart']);
  }

  // Process payment form submission
  processPayment(event: Event) {
    event.preventDefault(); // Prevent default form submission

    // Here you would typically call a payment service
    console.log('Processing payment with:', {
      paymentMethod: this.paymentMethod,
      cardNumber: this.cardNumber,
      expiryDate: this.expiryDate,
      cvv: this.cvv,
      nameOnCard: this.nameOnCard
    });

    // After successful payment processing
    this.serviceService.clearCart(); // Clear the cart
    this.router.navigate(['/order-confirmation']); // Navigate to confirmation page
  }
}
