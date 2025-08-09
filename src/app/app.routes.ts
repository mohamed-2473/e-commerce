// app.routes.ts
import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { MyOrdersComponent } from "./components/my-orders/my-orders.component";
// Import other components as needed

// Auth Guard (optional - create this to protect routes)
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { PaymentComponent } from "./components/payment/payment.component";
import { AboutComponent } from "./components/about/about.component";
import { ContactComponent } from "./components/contact/contact.component";
import { OrderConfirmComponent } from "./components/order-confirm/order-confirm.component";
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { ProductComponent } from "./components/product/product.component";
import { SingleProductComponent } from "./components/single-product/single-product.component";
import { WishlistComponent } from "./components/wishlist/wishlist.component";
import { CartComponent } from "./components/cart/cart.component";
import { HomeComponent } from "./components/home/home.component";

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(["/login"]);
    return false;
  }
};

export const routes: Routes = [
  { path: "home", component: HomeComponent, title: "Home Page" },
  { path: "register", component: RegisterComponent, title: "register Page" },
  { path: "login", component: LoginComponent, title: "login Page" },
  { path: "cart", component: CartComponent, title: "cart Page" },
  { path: "wishlist", component: WishlistComponent, title: "wishlist Page" },
  { path: "single-product/:id", component: SingleProductComponent },
  { path: "home", component: ProductComponent, title: "Products Page" },
  { path: "products", component: ProductsListComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "payment", component: PaymentComponent },
  { path: "order-confirmation", component: OrderConfirmComponent },
  
  // Protected routes (require authentication)
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [authGuard],
    title: "Profile Page"
  },
  {
    path: "orders",
    component: MyOrdersComponent,
    canActivate: [authGuard],
    title: "My Orders"
  },

  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: NotFoundComponent, title: "not found ⚠ " },
];