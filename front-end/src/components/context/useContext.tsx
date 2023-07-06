import React from "react";
import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
// import { Navigate } from "react-router-dom";

// import { useCookies } from "react-cookie";

import Cookies from 'js-cookie';


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

interface AuthContextType {
    updateUser: (username?: string, twoFactor?: boolean) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    refreshAccessToken: (refreshTokenParam: string | null) => Promise<void>;
    user: User | null;
}

  
const AuthContext = createContext<AuthContextType>({
    updateUser: () => Promise.resolve(),
    logout: () => {},
    isAuthenticated: false,
    refreshAccessToken: () => Promise.resolve(),
    user: null,
});


export const AuthProvider: React.FC<{ children: any }> = ( { children } ) => {


    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    // const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
    // const [isSigned, setIsSigned] = useState(false);

    

    
    
    const refreshAccessToken = async (refreshTokenParam: string | null) => {
        try {
            const response = await axios.get("http://localhost:3000/auth/refresh-token", {
                headers: {
                  Authorization: `Bearer ${refreshTokenParam}`,
            }, });

            const newAccessToken = response.data.access_token;
            
            setAccessToken(newAccessToken);
            Cookies.set('access_token', newAccessToken);

        } catch (error: any) {
            if (error.response.status === 403)
                setIsAuthenticated(false);
        }
    };

    const logout = async () => {

        console.log("Logged Out");
        
        const jResponse = {
            accessToken: accessToken,
            refreshToken: refreshToken
        };
        
        try {
            const res = await axios.post("http://localhost:3000/auth/logout", jResponse);

            Cookies.remove('access_token', accessToken );
            Cookies.remove('refresh_token', refreshToken );

            setIsAuthenticated(false);
        } catch (error) {
            console.log(error);
        }
    }

    const updateUser = async (username?: string, twoFactor?: boolean) => {
        const dataResponse = {
            username: username,
            two_factors_enabled: twoFactor,
        };

        console.log(dataResponse);

        try {
            const response = await axios.post(
                "http://localhost:3000/user/update",
                dataResponse,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setUser((prevUser) => ({
                ...prevUser!,
                username: response.data.username,
                two_factors_enabled: response.data.two_factors_enabled,
            }));

        } catch (error) {
            console.error(error);
        }
    };

    
    useEffect( () => {
        
        
        
        const checkAuthentication = async () => {
            
            const access_Token = Cookies.get('access_token');
            const refresh_Token = Cookies.get('refresh_token');
                
            setAccessToken(access_Token || null);
            setRefreshToken(refresh_Token || null);
            
            try {
                if (!accessToken)
                {
                    
                    console.log("No Tokeeen");
                    setIsAuthenticated(false);
                    
                    return ;
                }
                
                else {
                    const response = await axios.get('http://localhost:3000/auth/user', {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    
                    setUser(response.data.user);
                    
					setIsAuthenticated(true);
                }
            } catch (error: any) {
                if (error.response.status === 403)
                {
                    setAccessToken(null);
                    await refreshAccessToken(refreshToken ?? null);
                    // setIsAuthenticated(false);
                }
            }
        }

        checkAuthentication();
    }, [accessToken, isAuthenticated]);
    
    return (
        <AuthContext.Provider value={{logout, isAuthenticated, refreshAccessToken, user, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const authContext = () => useContext(AuthContext);














