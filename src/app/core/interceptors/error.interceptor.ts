import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'An unexpected error occurred. Please try again.';
      if (error.status === 0) {
        message = 'Unable to connect to the server. Please check your connection.';
      } else if (error.status === 400) {
        message = error.error?.message || 'Invalid request. Please check your input.';
      } else if (error.status === 401) {
        message = 'You are not authorised to perform this action.';
      } else if (error.status === 404) {
        message = 'The requested resource was not found.';
      } else if (error.status >= 500) {
        message = 'Server error. Our team has been notified. Please try again later.';
      }
      console.error(`[HTTP Error] ${error.status}: ${message}`, error);
      return throwError(() => new Error(message));
    })
  );
};
