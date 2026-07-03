import axios, { AxiosError, type AxiosResponse } from "axios";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from 'react-router';
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
    isAuthenticated: boolean;
    isLoading: boolean;
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
    const [isLoading, setLoading] = useState<boolean>(true)
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
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("access") 
                setUsername(decoded["username"])
                setLoading(false)
            } else {
                setAuthState(false)
                setLoading(false)
            }
        } else {
            setAuthState(false)
            setLoading(false)
        }
    }, [])

    function login(data: LoginFormType) {
        axios.post("http://localhost:8000/api/core/token/", {
            email: data["email"],
            password: data["password"]
        })
        .then((response: AxiosResponse) => {
            if (response.data["access"] && response.data["refresh"]) {
                localStorage.setItem("access", response.data["access"])
                localStorage.setItem("refresh", response.data["refresh"])
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("access") 
                setAuthState(true)
                navigate('/dashboard')
            } else {
                navigate('/login')
            }
        })
        .catch((error: AxiosError) => {
            console.error(error)
            setAuthState(false)
        })
    }

    function refresh() {
        setLoading(true)
        const refreshToken = localStorage.getItem("refresh")
        axios.post("http://localhost:8000/api/core/token/refresh/", {
            refresh: refreshToken
        })
        .then((response: AxiosResponse) => {
            if (response.data["access"] && response.data["refresh"]) {
                localStorage.setItem("access", response.data["access"])
                localStorage.setItem("refresh", response.data["refresh"])
                setAuthState(true)
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("access") 
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
        .finally(() => {
            setLoading(false)
        })
    }
    function logout() {
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        setAuthState(false)
        setUsername("None")
    }

    return <AuthContext.Provider value={{ isAuthenticated, isLoading,  username, login, refresh, logout}}>{children}</AuthContext.Provider>
}