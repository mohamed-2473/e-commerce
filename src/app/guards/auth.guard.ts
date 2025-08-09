import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    @Inject(AuthService) private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.isLoggedIn()) {
      // المستخدم مسجل دخول، يسمح له بالدخول
      return true;
    } else {
      // المستخدم مش مسجل دخول، يعيد توجيهه لصفحة تسجيل الدخول
      return this.router.createUrlTree(['/login']);
    }
  }
}
