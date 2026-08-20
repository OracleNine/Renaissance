import { HttpClient, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Observable } from 'rxjs';

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
export class CoreApi {
    private http = inject(HttpClient)
    public isAuthenticated = signal(false)

    getUserInfo(): Observable<unknown> {
        return this.http.get("/api/core/profile")
    }

    getWikis(): Observable<unknown> {
        return this.http.get("/api/core/wikis")
    }
}
