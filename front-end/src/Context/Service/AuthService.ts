interface User {
    id: number;
    username: string;
    avatar: string;
    wins: number;
    loss: number;
    winrate: number;
    two_factors_enabled: boolean;
    IntraId: number
    // Add any other relevant user information
}

export class AuthService {

    updateUser: (username?: string, twoFactor?: boolean) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    refreshAccessToken: (refreshTokenParam: string | null) => Promise<void>;
    user: User | null;
    accessToken: string | null;


    constructor() {
        this.updateUser = () => Promise.resolve()
        this.logout = () => {}
        this.isAuthenticated = false
        this.refreshAccessToken = () => Promise.resolve()
        this.user = null
        this.accessToken = null
    }
}
