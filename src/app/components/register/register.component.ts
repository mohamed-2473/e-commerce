import { Component } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./register.component.html",
})
export class RegisterComponent {
  showPassword = false;
  showConfirmPassword = false;
  registerForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        name: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: ["", Validators.required],
        terms: [false, Validators.requiredTrue],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get("password")?.value === form.get("confirmPassword")?.value
      ? null
      : { mismatch: true };
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    const { confirmPassword, terms, ...userData } = this.registerForm.value;

    this.authService.register(userData).subscribe({
      next: (res: any) => {
        console.log("Registration successful!", res);
        this.isLoading = false;
        
        // Show success message
        this.successMessage = "Registration successful! Redirecting to login...";
        
        // Reset form
        this.registerForm.reset();
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          this.router.navigate(["/login"], {
            queryParams: { 
              registered: 'true',
              email: userData.email 
            }
          });
        }, 2000);
      },
      error: (err) => {
        console.error("Registration error:", err);
        this.isLoading = false;
        
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = "Registration failed. Please try again.";
        }
      },
    });
  }
}