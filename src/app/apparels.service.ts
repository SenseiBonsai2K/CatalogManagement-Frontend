import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Apparel } from './apparel';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApparelsService {
  private GetApparelsUrl = `${environment.baseURL}/api/Apparel/GetApparels`;
  private GetApparelByIdUrl = `${environment.baseURL}/api/Apparel/GetApparelById`;
  private GetApparelsByCategoryNameUrl = `${environment.baseURL}/api/Apparel/GetApparelsByCategoryName`;
  private GetApparelsByNameUrl = `${environment.baseURL}/api/Apparel/GetApparelsByName`;

  constructor(private httpClient : HttpClient) { }

  getApparels(): Observable<Apparel[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<Apparel[]>(this.GetApparelsUrl, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getApparelById(id: number): Observable<Apparel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<Apparel>(`${this.GetApparelByIdUrl}/${id}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getApparelsByCategoryName(categoryName: string): Observable<Apparel[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<Apparel[]>(`${this.GetApparelsByCategoryNameUrl}/${categoryName}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getApparelsByName(searchQuery: string): Observable<Apparel[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<Apparel[]>(`${this.GetApparelsByNameUrl}/${searchQuery}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error);
  }
}
