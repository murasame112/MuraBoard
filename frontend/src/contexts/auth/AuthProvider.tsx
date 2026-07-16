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
				} catch {
						setUser(null);
				} finally {
						setLoading(false);
				}
		}

		async function login(identifier: string, password: string) {
			try{
				const response = await fetch(`${host}/api/auth/login`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ identifier, password }),
			});

			if (!response.ok) {
				return false;
			}
			await refreshUser();
			return true;
			} catch {
        return false;
   	 	}	
		}

    async function register(
        username: string,
        email: string,
        password: string
    ) {
			try {
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

        await refreshUser();

        return true;
			} catch {
        return false;
   	 	}
    }

		async function logout() {
				try {
						await fetch(`${host}/api/auth/logout`, {
								method: "POST",
								credentials: "include",
						});
				} finally {
						setUser(null);
				}
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