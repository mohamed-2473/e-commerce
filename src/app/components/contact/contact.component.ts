// contact.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  // Contact form data
  contactForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  contactEmail = "support@mystore.com";

  // Contact information
  contactInfo = [
    {
      icon: 'bi-geo-alt-fill',
      title: 'Visit Our Store',
      details: ['123 Shopping Street', 'Downtown District', 'New York, NY 10001'],
      color: 'text-primary'
    },
    {
      icon: 'bi-telephone-fill',
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543', 'Mon-Fri: 9AM-6PM'],
      color: 'text-success'
    },
    {
      icon: 'bi-envelope-fill',
      title: 'Email Us',
      details: ['info@mystore.com', 'support@mystore.com', 'sales@mystore.com'],
      color: 'text-info'
    },
    {
      icon: 'bi-clock-fill',
      title: 'Business Hours',
      details: ['Monday - Friday: 9:00 AM - 8:00 PM', 'Saturday: 10:00 AM - 6:00 PM', 'Sunday: 12:00 PM - 5:00 PM'],
      color: 'text-warning'
    }
  ];

  // FAQ data
  faqs = [
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all unused items in their original packaging. Returns are free and processed within 3-5 business days.',
      isOpen: false
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days. We offer free shipping on orders over $50.',
      isOpen: false
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to over 25 countries worldwide. International shipping times vary by location, typically 7-14 business days.',
      isOpen: false
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order by logging into your account.',
      isOpen: false
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely.',
      isOpen: false
    }
  ];

  // Office locations
  offices = [
    {
      city: 'New York',
      address: '123 Shopping Street, Downtown District',
      phone: '+1 (555) 123-4567',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop'
    },
    {
      city: 'Los Angeles',
      address: '456 Commerce Ave, Business District',
      phone: '+1 (555) 234-5678',
      image: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=400&h=300&fit=crop'
    },
    {
      city: 'Chicago',
      address: '789 Trade Center, Loop Area',
      phone: '+1 (555) 345-6789',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop'
    }
  ];

  // Form submission
  onSubmit() {
    if (this.isFormValid()) {
      // Here you would typically call a service to handle form submission
      console.log('Form submitted:', this.contactForm);
      alert('Thank you for your message! We\'ll get back to you within 24 hours.');
      this.resetForm();
    } else {
      alert('Please fill in all required fields.');
    }
  }

  // Form validation
  isFormValid(): boolean {
    return this.contactForm.name.trim() !== '' &&
           this.contactForm.email.trim() !== '' &&
           this.contactForm.subject.trim() !== '' &&
           this.contactForm.message.trim() !== '';
  }

  // Reset form
  resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
  }

  // Toggle FAQ
  toggleFAQ(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }

  // Email validation
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Phone validation
  isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  }
}