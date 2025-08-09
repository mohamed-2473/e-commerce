import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    // Initialize with user data from localStorage if available
    const user = this.getUserData();
    if (user) {
      this.userSubject.next(user);
    }
  }

  register(userData: any): Observable<any> {
    // Simulate API delay
    return new Observable(observer => {
      setTimeout(() => {
        try {
          // Check if user already exists
          const existingUsers = this.getAllUsers();
          const userExists = existingUsers.some((user: any) => user.email === userData.email);
          
          if (userExists) {
            observer.error({ error: { message: "User already exists with this email" } });
            return;
          }

          // Create new user
          const newUser = {
            id: Date.now(), // Simple ID generation
            name: userData.name,
            email: userData.email,
            password: userData.password, // In real app, this should be hashed
            createdAt: new Date().toISOString()
          };

          // Save to localStorage
          existingUsers.push(newUser);
          localStorage.setItem('registered_users', JSON.stringify(existingUsers));

          // Return success response (without password for security)
          const { password, ...userResponse } = newUser;
          observer.next({ 
            message: "Registration successful", 
            user: userResponse 
          });
          observer.complete();
        } catch (error) {
          observer.error({ error: { message: "Registration failed. Please try again." } });
        }
      }, 1000); // Simulate 1 second delay
    });
  }

  login(credentials: any): Observable<any> {
    // Simulate API delay
    return new Observable(observer => {
      setTimeout(() => {
        try {
          const existingUsers = this.getAllUsers();
          const user = existingUsers.find((u: any) => 
            u.email === credentials.email && u.password === credentials.password
          );

          if (user) {
            // Generate a simple token
            const token = this.generateToken(user);
            const { password, ...userResponse } = user;
            
            observer.next({ 
              message: "Login successful", 
              user: userResponse, 
              token: token 
            });
            observer.complete();
          } else {
            observer.error({ error: { message: "Invalid email or password" } });
          }
        } catch (error) {
          observer.error({ error: { message: "Login failed. Please try again." } });
        }
      }, 800); // Simulate 800ms delay
    });
  }

  private getAllUsers(): any[] {
    const users = localStorage.getItem('registered_users');
    return users ? JSON.parse(users) : [];
  }

  private generateToken(user: any): string {
    // Simple token generation (in real app, use JWT)
    const tokenData = {
      userId: user.id,
      email: user.email,
      timestamp: Date.now()
    };
    return btoa(JSON.stringify(tokenData));
  }

  setUserData(user: any, token: string): void {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    this.userSubject.next(user);
  }

  updateUserProfile(updatedUser: any): void {
    // Update in registered users list
    const users = this.getAllUsers();
    const userIndex = users.findIndex((u: any) => u.id === updatedUser.id);
    
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('registered_users', JSON.stringify(users));
    }
    
    // Update current user data
    this.setUserData(updatedUser, this.getToken() || '');
  }

  logout(): void {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.userSubject.next(null);
  }

  getUserData(): any {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  // Method to clear all registered users (for testing)
  clearAllUsers(): void {
    localStorage.removeItem('registered_users');
  }
}