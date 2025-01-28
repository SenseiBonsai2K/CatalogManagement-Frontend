import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from './category';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  GetCategoriesUrl = `${environment.baseURL}/api/Category/GetCategories`;

  constructor(private httpClient : HttpClient) { }

  getCategories(): Observable<Category[]> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.httpClient.get<Category[]>(this.GetCategoriesUrl, { headers })
        .pipe(
          catchError(this.handleError)
        );
    }

  private handleError(error: any): Observable<never> {
      console.error('An error occurred', error);
      return throwError(error);
    }
}
