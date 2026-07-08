import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { Observable } from 'rxjs';

export interface refreshPayload {
    access: string;
    refresh: string;
}

@Service()
export class AuthStatus {
    private http = inject(HttpClient)
    
    refresh(refresh: string) {
        const requestBody = {
            "refresh": refresh
        }
        this.http.post<refreshPayload>('http://localhost:8000/api/core/token/refresh/', requestBody, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).subscribe({
            next: (payload) => {
                if (payload["access"] && payload["refresh"]) {
                    return {
                        "access": payload["access"],
                        "refresh": payload["refresh"]
                    }
                }
                return {
                    "access": "",
                    "refresh": ""
                }
            },
            error: (err) => {
                console.warn(err.error.detail)
            }
        })
        return {
                "access": "",
                "refresh": ""
            }

    }

    isAuthenticated() {
        const access = localStorage.getItem("access")
        const refresh = localStorage.getItem("refresh")

        if (!access || !refresh) {
            return false
        } else {
            const decodeAccess = jwtDecode(access)
            const expiry = decodeAccess["exp"]
            if (expiry && (expiry < Math.floor(Date.now() / 1000))) {
                console.log("Token is too old, trying to refresh...")
                const payload = this.refresh(refresh)
                if (payload["refresh"] && payload["access"]) {
                    localStorage.setItem('access', payload['access'])
                    localStorage.setItem('refresh', payload['refresh'])
                    return true
                } else {
                    return false
                }
            } else if (expiry && (expiry > Math.floor(Date.now() / 1000))) {
                console.log("Token is young")
                return true
            } else {
                console.log("No/invalid expiry")
                return false
            }
        }
    }
}
