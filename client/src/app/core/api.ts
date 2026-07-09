import { HttpClient, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

interface UserInfo {
    name: string;
    username: string;
    email: string;
    id: number;
}

export function cookieInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
    ): Observable<HttpEvent<unknown>> {
    const addCreds = req.clone({
        withCredentials: true
    })
    return next(addCreds);
}

@Service()
export class Api {
    private http = inject(HttpClient)

    getUserInfo(): Observable<unknown> {
        return this.http.get("/api/core/profile")
    }

    getWikis(): Observable<unknown> {
        return this.http.get("/api/core/wikis")
    }
}
