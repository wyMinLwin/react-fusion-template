export default function useAuth(): {
    isAuthenticated: boolean;
    userLogin: (token: string) => void;
    userLogout: () => void;
};
