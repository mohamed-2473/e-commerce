// nav-bar.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLinkActive, RouterLink, Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
declare var bootstrap: any; // Add Bootstrap declaration for TypeScript

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  cartCount = 0;
  wishlistCount = 0;
  isScrolled = false;
  user: any = null;
  userProfileImage: string = '';

  constructor(
    private service: ServiceService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.cartItems$.subscribe(items => {
      this.cartCount = items.length;
    });

    this.service.wishlistItems$.subscribe(items => {
      this.wishlistCount = items.length;
    });

    this.authService.user$.subscribe(user => {
      this.user = user;
      this.updateUserProfileImage();
    });

    window.addEventListener('scroll', this.onWindowScroll);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onWindowScroll);
  }

  onWindowScroll = () => {
    this.isScrolled = window.scrollY > 50;
  }

  updateUserProfileImage() {
    if (this.user && this.user.profileImage) {
      this.userProfileImage = this.user.profileImage;
    } else {
      this.userProfileImage = 'https://via.placeholder.com/40?text=U';
    }
  }

  getUserDisplayName(): string {
    if (!this.user) return '';
    
    if (this.user.name) {
      // If name is available, show first name and last initial
      const nameParts = this.user.name.trim().split(' ');
      if (nameParts.length > 1) {
        return `${nameParts[0]} ${nameParts[1].charAt(0)}.`;
      }
      return nameParts[0];
    }
    
    // Fallback to email username
    return this.user.email?.split('@')[0] || 'User';
  }

  closeMobileMenu() {
    // Get the navbar collapse element
    const navbarCollapse = document.getElementById('navbarContent');
    if (navbarCollapse) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      // Only close if it's currently open
      if (bsCollapse && navbarCollapse.classList.contains('show')) {
        bsCollapse.hide();
      }
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.closeMobileMenu();
  }
}