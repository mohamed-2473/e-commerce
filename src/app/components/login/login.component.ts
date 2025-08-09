import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule, Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      remember: [false],
    });
  }

  ngOnInit() {
    // Check if user was redirected from registration
    this.route.queryParams.subscribe(params => {
      if (params['registered'] === 'true') {
        this.successMessage = "Registration successful! Please login with your credentials.";
        
        // Pre-fill email if provided
        if (params['email']) {
          this.loginForm.patchValue({
            email: params['email']
          });
        }
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          this.successMessage = null;
        }, 5000);
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log("Login successful!", res);
        this.isLoading = false;

        // Save user data and token
        this.authService.setUserData(res.user, res.token);

        // Redirect to home page or previous URL
        const returnUrl =
          this.router.parseUrl(this.router.url).queryParams["returnUrl"] ||
          "/home";
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        console.error("Login failed", err);
        this.isLoading = false;

        if (err.error && err.error.message) {
          alert(err.error.message);
        } else {
          alert("Invalid email or password.");
        }
      },
    });
  }
}