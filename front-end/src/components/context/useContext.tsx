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
    intraId: number
    // Add any other relevant user information
}

interface AuthContextType {
    updateUser: (newUsername?: string, newAvatar?: File) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    refreshAccessToken: () => Promise<void>;
    user: User | null;
}

  
const AuthContext = createContext<AuthContextType>({
    updateUser: () => Promise.resolve(),
    logout: () => {},
    isAuthenticated: false,
    refreshAccessToken: () => Promise.resolve(),
    user: null,
});

// const AuthContext = createContext({});

export const AuthProvider: React.FC<{ children: any }> = ( { children } ) => {

    const [accessToken, setAccessToken] = useState<any | null>(null);
    const [refreshToken, setRefreshToken] = useState<any | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);


    // const [cookie, setCookie, removeCookie] = useCookies(["accessTokenCookie", "refreshTokenCookie"]);

    // const navigate = useNavigate();

    
    const refreshAccessToken = async () => {
        try {
            
            const response = await axios.get("http://localhost:3000/auth/refresh-token", {
                headers: {
                  Authorization: `Bearer ${refreshToken}`,
            }, });

            const newAccessToken = response.data.access_token;
            
            setAccessToken(newAccessToken);

        } catch (error) {
            ///////// if the refresh token has expired... // we need to do something /////////////
        }
    };

    const logout = async () => {

        console.log("Logged Out");
        
        const jResponse = {
            accessToken: accessToken,
            refreshToken: refreshToken
        };
        
        try {
            const res = await axios.post("http://localhost:3000/logout", jResponse);

            console.log(res);

            // removeCookie('accessTokenCookie', { path: '/' });
            // removeCookie('refreshTokenCookie', { path: '/' });
            
            setIsAuthenticated(false);
        } catch (error) {
            
        }
    }

    const updateUser = async (newUsername?: string, newAvatar?: File) => {
        try {
            if (newUsername !== undefined && newAvatar !== undefined) {
                
                const response = await axios.post('http://localhost:3000user/update', {
                    username: newUsername,
                    avatar: newAvatar,
                });
                // setUser(prevUser => (
                // {
                //     ...prevUser!,
                //     username: response.data.username,
                //     avatar: response.data.avatar,
                // }
                // ));
            }
            else if (newUsername === undefined) {
                const response = await axios.post('http://localhost:3000user/update', {
                    avatar: newAvatar,
                });
                setUser(prevUser => (
                {
                    ...prevUser!,
                    avatar: response.data.avatar,
                }
                ));
            }
            else {
                const response = await axios.post('http://localhost:3000user/update', {
                    username: newUsername,
                });
                setUser(prevUser => (
                {
                    ...prevUser!,
                    avatar: response.data.username,
                }
                ));
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect( () => {
        const checkAuthentication = async () => {
            try {
                const access_Token = Cookies.get('access_token');
                const refresh_Token = Cookies.get('refresh_token');
                
                setAccessToken(access_Token)
                setRefreshToken(refresh_Token);

                
                
                if (!access_Token)
                {
                    console.log("No Tokeeen");
                    setIsAuthenticated(false);

                    return ;
                }

                else {
                    const response = await axios.get('http://localhost:3000/auth/user', {
                        headers: {
                            Authorization: `Bearer ${access_Token}`
                        }
                    });

                    setUser(response.data.user);
                    
                    setIsAuthenticated(true);
                }
            } catch (error: any) {
                if (error.response.status === 403)
                {
                    // console.log(error);
                    // refreshAccessToken();
                    setIsAuthenticated(false);

                }

            }
        }

        checkAuthentication();
    }, []);
    
    return (
        <AuthContext.Provider value={{logout, isAuthenticated, refreshAccessToken, user, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const authContext = () => useContext(AuthContext);














