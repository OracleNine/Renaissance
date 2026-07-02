import axios, { AxiosError, type AxiosResponse } from "axios";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from 'react-router';

type AuthContextType = {
    isAuthenticated: boolean;
    username: string;
    login: (data: LoginFormType) => void;
}
type AuthCtxProps = {
    children: ReactNode
}
type LoginFormType = {
    email: string;
    password: string;
}

export const AuthContext = createContext<null | AuthContextType>(null)

export function AuthCtxProvider({ children }: AuthCtxProps) {
    const [isAuthenticated, setAuthState] = useState<boolean>(false)
    const [username, setUsername] = useState<string>("Not signed in.")
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("access") && localStorage.getItem("refresh")) {
            // Here we need to decode the token,
            // Check the expiration date
            // If expired, request a new one using the refresh token
            // If that doesn't work, setAuth to false
            // If it does work, setAuth to true
            setAuthState(true)
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

    return <AuthContext.Provider value={{ isAuthenticated,  username, login}}>{children}</AuthContext.Provider>
}