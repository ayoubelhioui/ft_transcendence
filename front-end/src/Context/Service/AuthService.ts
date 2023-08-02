import { STATUS_ERROR, STATUS_NOT_SIGN_IN, STATUS_SUCCESS } from "../../Const";
import axiosInstance from "./AxiosInstance";
import Cookies from 'js-cookie';

export interface UserI {
    id: number;
    username: string;
    avatar: string;
    wins: number;
    loss: number;
    win_rate: number;
    two_factors_enabled: boolean;
    IntraId: number
}

export interface resultStatusI {
    status : number,
    message : string
}

export class AuthService {

    private accessToken: string | undefined = undefined
    private refreshToken : string | undefined = undefined
    user : UserI | undefined = undefined

    constructor() {}

    get getAccessToken() {
        return this.accessToken
    }

    //====================================================
    //====================================================

    private async getUser() {
        const response = await axiosInstance.get('/auth/user', {
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        });
        return response.data.user
    }

    private async refreshAccessToken() {
        const response = await axiosInstance.get("/auth/refresh-token", {
            headers: {
                Authorization: `Bearer ${this.refreshAccessToken}`,
        }, });
        this.accessToken = response.data.access_token;
        Cookies.set('access_token', this.accessToken!);
    };

    async authenticated(callBack : (authResult : resultStatusI) => void) {
        this.accessToken = Cookies.get('access_token');
        this.refreshToken = Cookies.get('refresh_token');

        if (this.accessToken && this.refreshToken) {
            try {
                this.user = await this.getUser()
                callBack({
                    status : STATUS_SUCCESS,
                    message : "Success",
                })
            } catch (error : any) {
                if (error?.response?.status === 403)
                {
                    try {
                        await this.refreshAccessToken()
                        try {
                            this.user = await this.getUser()
                            callBack({
                                status : STATUS_SUCCESS,
                                message : "Success",
                            })
                        } catch (error : any) {
                            callBack({
                                status : STATUS_ERROR,
                                message : "Can't get user: " + error,
                            })
                            Cookies.remove('access_token');
                            Cookies.remove('refresh_token');
                        }
                    } catch (error : any) {
                        callBack({
                            status : STATUS_ERROR,
                            message : "Can't Refresh Token: " + error,
                        })
                        Cookies.remove('access_token');
                        Cookies.remove('refresh_token');
                    }
                } else {
                    callBack({
                        status : STATUS_ERROR,
                        message : `Can't handle this error ${error?.response?.status}`,
                    })
                }
            }
        } else {
            callBack({
                status : STATUS_NOT_SIGN_IN,
                message : "Not sign in",
            })
        }
    }

    //====================================================
    //====================================================

    async updateUser(callBack : (logoutResult : resultStatusI) => void) {
        callBack({
            status : STATUS_ERROR,
            message : "not implemented"
        })
    }

    //====================================================
    //====================================================

    async logout() : Promise<resultStatusI> {
        try {
            const jResponse = {
                accessToken: this.accessToken,
                refreshToken: this.refreshToken
            };
    
            await axiosInstance.post("/auth/logout", jResponse, {
                headers: {
                    Authorization: `Bearer ${this.getAccessToken}`,
                }
            });
    
            Cookies.remove('access_token');
            Cookies.remove('refresh_token');

            return {
                status : STATUS_SUCCESS,
                message : "Success"
            }
        } catch (error : any) {

            // Cookies.remove('access_token');
            // Cookies.remove('refresh_token');

            return {
                status : STATUS_ERROR,
                message : "An error happen" + error
            }
        }
    }


}
