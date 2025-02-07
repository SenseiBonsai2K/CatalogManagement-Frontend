import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (e) {
      console.error('Invalid token:', e);
      return null;
    }
  }

  getDecodedToken(): any {
    const token = this.getToken();
    return token ? this.decodeToken(token) : null;
  }

  isTokenExpired(): boolean {
    const decoded = this.getDecodedToken();
    if (decoded) {
      const exp = decoded.exp;
      const now = Math.floor(Date.now() / 1000);
      return exp < now;
    }
    return true;
  }
}