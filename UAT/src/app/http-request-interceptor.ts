import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor() {
  }

  handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 403) {
      window.location.href = '/';
    }
    return throwError(err);
  }

  intercept(request: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    const body = request.body;
    const headers = request.headers.set(
      'Content-Type', 'application/json');
    const updatedRequest = request.clone({
      headers,
      body,
      withCredentials: true
    });
    return next.handle(updatedRequest).pipe(
      tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            return event = event.clone({
              body: event.body
            });
          }
          return event;
        },
        (error) => {
          this.handleAuthError(error)
        }
      ),
    );
  }
}
