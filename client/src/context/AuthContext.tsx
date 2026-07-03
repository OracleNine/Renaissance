import axios, { AxiosError, type AxiosResponse } from "axios";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { redirect, useLocation, useNavigate } from 'react-router';
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
    isAuthenticated: boolean;
    username: string;
    login: (data: LoginFormType) => void;
    refresh: () => void;
    logout: () => void;
}
type AuthCtxProps = {
    children: ReactNode
}
type LoginFormType = {
    email: string;
    password: string;
}
type AuthPayload = {
    exp: number;
    username: string;
    user_id: number;
}

export const AuthContext = createContext<null | AuthContextType>(null)

export function AuthCtxProvider({ children }: AuthCtxProps) {
    const [isAuthenticated, setAuthState] = useState<boolean>(false)
    const [username, setUsername] = useState<string>("None")
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("access")
        if (token) {
            const decoded = jwtDecode<AuthPayload>(token)
            const expiry = decoded["exp"]
            if ((expiry) && (expiry < Math.floor(Date.now() / 1000))) {
                console.log("JWT is too old, need to refresh...")
                refresh()
            } else if ((expiry) && (expiry > Math.floor(Date.now() / 1000))){
                setAuthState(true)
                setUsername(decoded["username"])
            } else {
                setAuthState(false)
            }
        } else {
            setAuthState(false)
        }
    })

    function login(data: LoginFormType) {
        axios.post("http://localhost:8000/api/core/token/", {
            email: data["email"],
            password: data["password"]
        })
        .then((response: AxiosResponse) => {
            if (response.data["access"] && response.data["refresh"]) {
                localStorage.setItem("access", response.data["access"])
                localStorage.setItem("refresh", response.data["refresh"])
                setAuthState(true)
                navigate('/dashboard')
            } else {
                navigate('/login')
            }
        })
        .catch((error: AxiosError) => {
            console.error(error)
        })
    }

    function refresh() {
        const refreshToken = localStorage.getItem("refresh")
        axios.post("http://localhost:8000/api/core/token/refresh/", {
            refresh: refreshToken
        })
        .then((response: AxiosResponse) => {
            if (response.data["access"] && response.data["refresh"]) {
                localStorage.setItem("access", response.data["access"])
                localStorage.setItem("refresh", response.data["refresh"])
                setAuthState(true)
            } else {
                setAuthState(false)
                logout()
            }
        })
        .catch((error: AxiosError) => {
            console.error(error)
            setAuthState(false)
            logout()
        })
    }
    function logout() {
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        setAuthState(false)
        setUsername("None")
    }

    return <AuthContext.Provider value={{ isAuthenticated,  username, login, refresh, logout}}>{children}</AuthContext.Provider>
}