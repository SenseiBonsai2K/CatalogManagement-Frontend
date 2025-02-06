import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { JwtInterceptor } from './app/interceptors/jwt.interceptor';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes), // Fornisce i servizi HttpClient
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true, // Importante per permettere l'utilizzo di più interceptor
    },
  ],
});