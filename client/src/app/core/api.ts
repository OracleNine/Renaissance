import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

interface UserInfo {
    name: string;
    username: string;
    email: string;
    id: number;
}

@Service()
export class Api {
    private http = inject(HttpClient)

    getUserInfo(): Observable<unknown> {
        return this.http.get("http://localhost:8000/api/core/profile", {
            withCredentials: true
        })
    }

    getWikis(): Observable<unknown> {
        return this.http.get("http://localhost:8000/api/core/wikis", {
            withCredentials: true
        })
    }
}
