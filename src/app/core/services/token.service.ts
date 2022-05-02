import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  getToken(): String {
    return window.localStorage['bearerToken'];
  }

  saveToken(token: String) {
    window.localStorage['bearerToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('bearerToken');
  }
}
