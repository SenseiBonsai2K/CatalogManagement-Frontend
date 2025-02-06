import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const localToken = localStorage.getItem('token');
    console.log(localToken+"Interceptor");  
    
    if (localToken) {
      const clonedReq = req.clone({
        setHeaders:{Authorization: `Bearer ${localToken}`}
      });
      return next.handle(clonedReq);
    }
    return next.handle(req);
  }
}