import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { Observable } from 'rxjs';

interface refreshPayload {
    access: string;
    refresh: string;
}

@Service()
export class AuthStatus {
    public isAuthenticated = signal(false)
    private http = inject(HttpClient)
    
    refresh(refresh: string) {
        const requestBody = {
            "refresh": refresh
        }
        this.http.post<refreshPayload>('localhost:8000/api/core/token/refresh/', requestBody).subscribe((payload) => {
            if (payload["access"] && payload["refresh"]) {
                localStorage.setItem("access", payload["access"])
                localStorage.setItem("refresh", payload["refresh"])
                console.log("Authentication refreshed")
                this.isAuthenticated.set(true)
            } else {
                localStorage.removeItem("access")
                localStorage.removeItem("refresh")
                console.log("Authentication failed, signing out...")
            }
        });

    }

    login(username: string, password: string) {
        const requestBody = {
            "username": username,
            "password": password,
        }
        this.http.post<refreshPayload>('localhost:8000/api/core/token/', requestBody).subscribe((payload) => {
            if (payload["access"] && payload["refresh"]) {
                localStorage.setItem("access", payload["access"])
                localStorage.setItem("refresh", payload["refresh"])
                console.log("Logged in successfully")
                this.isAuthenticated.set(true)
            } else {
                console.log("Authentication failed")
            }
        })
    }

    ngOnInit() {
        const access = localStorage.getItem("access")
        const refresh = localStorage.getItem("refresh")

        if (!access || !refresh) {
            this.isAuthenticated.set(false)
        } else {
            const decodeAccess = jwtDecode(access)
            const expiry = decodeAccess["exp"]
            if (expiry && (expiry < Math.floor(Date.now() / 1000))) {
                console.log("Token is too old, trying to refresh...")
                this.refresh(refresh)
            } else if (expiry && (expiry > Math.floor(Date.now() / 1000))) {
                console.log("Token is young")
                this.isAuthenticated.set(true)
            } else {
                console.log("No/invalid expiry")
                this.isAuthenticated.set(false)
            }
        }
    }
}
