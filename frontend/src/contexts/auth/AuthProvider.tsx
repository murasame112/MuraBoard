import { useEffect, useState, useContext, createContext } from "react";
import type { AuthContextType, SafeUser } from "./Auth"

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: {children: React.ReactNode}) {

    const host = import.meta.env.VITE_API_URL;

    const [user, setUser] = useState<SafeUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        refreshUser();
    }, []);

    async function refreshUser() {
        try {
            const response = await fetch(`${host}/api/auth/me`, {
                credentials: "include",
            });

            if (!response.ok) {
                setUser(null);
                return;
            }

            const data = await response.json();
            setUser(data);

        } finally {
            setLoading(false);
        }
    }

    async function login(username: string, password: string) {

        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if (!response.ok) {
            return false;
        }

        refreshUser();

        return true;
    }

    async function register(
        username: string,
        email: string,
        password: string
    ) {

        const response = await fetch(`${host}/api/auth/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        });

        if (!response.ok) {
            return false;
        }

        refreshUser();

        return true;
    }

    async function logout() {

        await fetch(`${host}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });

        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: user !== null,
                loading,
                login,
                logout,
                register,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth should be used inside AuthProvider");
    return context;
}