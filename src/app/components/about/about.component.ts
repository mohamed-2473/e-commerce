// about.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  constructor (private router: Router) { }

  // Team members data
  teamMembers = [
    {
      name: 'John Smith',
      position: 'Founder & CEO',
      description: 'Visionary leader with 15+ years in e-commerce and retail technology.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Sarah Johnson',
      position: 'Head of Operations',
      description: 'Expert in supply chain management and customer satisfaction strategies.',
      image: 'https://i.imgur.com/kmpl3Iy.jpg',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Mike Chen',
      position: 'Technology Director',
      description: 'Full-stack developer passionate about creating seamless user experiences.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Emily Davis',
      position: 'Marketing Manager',
      description: 'Creative strategist focused on building meaningful customer relationships.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    }
  ];

  // Company values
  values = [
    {
      title: 'Quality First',
      description: 'We never compromise on the quality of our products and services.',
      icon: 'bi-award-fill'
    },
    {
      title: 'Customer Focused',
      description: 'Our customers are at the heart of everything we do.',
      icon: 'bi-people-fill'
    },
    {
      title: 'Innovation',
      description: 'We continuously innovate to provide better shopping experiences.',
      icon: 'bi-lightbulb-fill'
    },
    {
      title: 'Sustainability',
      description: 'We are committed to environmentally responsible business practices.',
      icon: 'bi-globe-americas'
    }
  ];

  // Company timeline
  timeline = [
    {
      year: '2018',
      title: 'Company Founded',
      description: 'MyStore was established with a vision to revolutionize online shopping.'
    },
    {
      year: '2019',
      title: 'First 1000 Customers',
      description: 'Reached our first milestone with exceptional customer satisfaction.'
    },
    {
      year: '2020',
      title: 'Mobile App Launch',
      description: 'Launched our mobile app to provide shopping on the go.'
    },
    {
      year: '2021',
      title: 'International Expansion',
      description: 'Extended our services to serve customers globally.'
    },
    {
      year: '2022',
      title: 'AI Integration',
      description: 'Implemented AI-powered recommendations for personalized shopping.'
    },
    {
      year: '2023',
      title: '10,000+ Products',
      description: 'Expanded our catalog to include over 10,000 premium products.'
    }
  ];

  explore() {
    // code to navugate to the products page
    this.router.navigate(['/products']);
  }
}