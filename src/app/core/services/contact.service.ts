import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ContactForm } from '../models/contact.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly useMock = true;

  sendMessage(form: ContactForm): Observable<{ success: boolean; message: string }> {
    if (this.useMock) {
      return of({ success: true, message: 'Your message has been received. We will contact you within 24 hours.' }).pipe(delay(1000));
    }
    return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/contact`, form);
  }
}
