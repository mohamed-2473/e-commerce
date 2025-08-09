import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  user: any = null;
  profileImage: string = '';
  isEditing = false;
  isChangingPassword = false;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize profile form
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      address: [''],
      dateOfBirth: [''],
      bio: ['', [Validators.maxLength(500)]]
    });

    // Initialize password form
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    // Load user data
    this.user = this.authService.getUserData();
    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }

    // Populate form with user data
    this.loadUserProfile();
    
    // Subscribe to user updates
    this.authService.user$.subscribe(user => {
      if (user) {
        this.user = user;
        this.loadUserProfile();
      }
    });
  }

  loadUserProfile() {
    if (this.user) {
      this.profileForm.patchValue({
        name: this.user.name || '',
        email: this.user.email || '',
        phone: this.user.phone || '',
        address: this.user.address || '',
        dateOfBirth: this.user.dateOfBirth || '',
        bio: this.user.bio || ''
      });
      
      // Load profile image
      this.profileImage = this.user.profileImage || 'https://via.placeholder.com/150?text=User';
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      // Reset form when canceling edit
      this.loadUserProfile();
    }
    this.clearMessages();
  }

  togglePasswordChange() {
    this.isChangingPassword = !this.isChangingPassword;
    if (!this.isChangingPassword) {
      this.passwordForm.reset();
    }
    this.clearMessages();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Please select a valid image file.';
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        this.errorMessage = 'File size must be less than 5MB.';
        return;
      }

      this.selectedFile = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
      
      this.clearMessages();
    }
  }

  removeProfileImage() {
    this.profileImage = 'https://via.placeholder.com/150?text=User';
    this.selectedFile = null;
    
    // Reset file input
    const fileInput = document.getElementById('profileImageInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onProfileSubmit() {
    if (this.profileForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.clearMessages();

    try {
      // Get updated user data
      const updatedData = {
        ...this.user,
        ...this.profileForm.value,
        profileImage: this.profileImage
      };

      // Update user in localStorage
      this.updateUserInStorage(updatedData);
      
      // Update auth service
      this.authService.setUserData(updatedData, this.authService.getToken() || '');
      
      this.successMessage = 'Profile updated successfully!';
      this.isEditing = false;
      
      setTimeout(() => {
        this.successMessage = null;
      }, 3000);
      
    } catch (error) {
      this.errorMessage = 'Failed to update profile. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  onPasswordSubmit() {
    if (this.passwordForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.clearMessages();

    try {
      const { currentPassword, newPassword } = this.passwordForm.value;
      
      // Verify current password
      if (!this.verifyCurrentPassword(currentPassword)) {
        this.errorMessage = 'Current password is incorrect.';
        this.isLoading = false;
        return;
      }

      // Update password
      const updatedUser = {
        ...this.user,
        password: newPassword
      };

      this.updateUserInStorage(updatedUser);
      
      this.successMessage = 'Password changed successfully!';
      this.isChangingPassword = false;
      this.passwordForm.reset();
      
      setTimeout(() => {
        this.successMessage = null;
      }, 3000);
      
    } catch (error) {
      this.errorMessage = 'Failed to change password. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  private verifyCurrentPassword(currentPassword: string): boolean {
    // In a real app, this would be handled by the backend
    return this.user.password === currentPassword;
  }

  private updateUserInStorage(updatedUser: any) {
    // Update in registered users list
    const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === this.user.id);
    
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('registered_users', JSON.stringify(users));
    }
    
    // Update current user in localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));
    this.user = updatedUser;
  }

  private clearMessages() {
    this.successMessage = null;
    this.errorMessage = null;
  }

  deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Remove from registered users
        const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
        const filteredUsers = users.filter((u: any) => u.id !== this.user.id);
        localStorage.setItem('registered_users', JSON.stringify(filteredUsers));
        
        // Logout and redirect
        this.authService.logout();
        this.router.navigate(['/']);
        
      } catch (error) {
        this.errorMessage = 'Failed to delete account. Please try again.';
      }
    }
  }
}