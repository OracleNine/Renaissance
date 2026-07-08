import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class AuthService {
    private http = inject(HttpClient)
    private baseUrl = 'http://localhost:8000'

    isAuthenticated() {
        this.http.get(this.baseUrl + '/api/core/profile', {},)
        .subscribe({
            next: (payload) => {
                return {
                    "status": 1,
                    "details": payload
                }
            },
            error: (err) => {
                return {
                    "status": 0,
                    "details": err
                }
            },
        })
    }
}
