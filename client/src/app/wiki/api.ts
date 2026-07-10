import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

@Service()
export class Api {
    private http = inject(HttpClient)

    viewPage(subdomain: string, slug: string): Observable<unknown> {
        return this.http.get("/api/wiki/" + subdomain + "/" + slug)
    }
}
