import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

@Service()
export class AuthService {
    private http = inject(HttpClient)
    private baseUrl = 'http://localhost:8000'

    viewProfile(): Observable<Object> {
        return this.http.get(this.baseUrl + '/api/core/profile')
    }
}
