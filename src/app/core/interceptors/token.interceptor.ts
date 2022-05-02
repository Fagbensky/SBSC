import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig: any = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (!(req.url == `${environment.api_url}/login` || req.url == `${environment.api_url}/register`)) {
      const token = this.tokenService.getToken();
      if (token) {
        headersConfig['Authorization'] = `Token ${token}`;
      }
    }
    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
