export type SafeUser = {
    id: number;
    username: string;
    email: string;
    role: 'ADMIN' | 'MEMBER';
};

export type AuthContextType = {
    user: SafeUser | null;
    isAuthenticated: boolean;
    loading: boolean;

    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    register: (
        username: string,
        email: string,
        password: string
    ) => Promise<boolean>;

    refreshUser: () => Promise<void>;
};