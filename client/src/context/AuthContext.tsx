import { createContext, useState, type ReactNode } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    username: string;
}
type AuthCtxProps = {
    children: ReactNode
}

export const AuthContext = createContext<null | AuthContextType>(null)

export function AuthCtxProvider({ children }: AuthCtxProps) {
    const [isAuthenticated, setAuthState] = useState<boolean>(false)
    const [username, setUsername] = useState<string>("Not signed in.")

    return <AuthContext.Provider value={{ isAuthenticated,  username }}>{children}</AuthContext.Provider>
}