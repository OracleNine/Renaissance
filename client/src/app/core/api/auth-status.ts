import { Service, signal } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Service()
export class AuthStatus {
    public isAuthenticated = signal(false)

    refresh() {

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
