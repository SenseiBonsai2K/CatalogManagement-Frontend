import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger;
    const localToken = localStorage.getItem('token');
    if (localToken) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${localToken}`)
      });
    }
    return next.handle(req);
  }
}