import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
PostLoginUrl = `${environment.baseURL}/api/User/Login`;
PostRegisterUrl = `${environment.baseURL}/api/User/AddUser`;

  constructor(private httpClient : HttpClient) { }

  postLoginUser(email: string, password: string) {
    return this.httpClient.post(this.PostLoginUrl, { email, password });
  }

  postRegisterUser(username: string, email: string, password: string) {
    return this.httpClient.post(this.PostRegisterUrl, { username, email, password });
  }
}
