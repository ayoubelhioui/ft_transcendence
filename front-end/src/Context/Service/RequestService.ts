import { useEffect, useState } from "react";
import { AuthService } from "./AuthService";
import AxiosInstance from "./AxiosInstance";
import { STATUS_ERROR, STATUS_SUCCESS, STATUS_UNDEFINED } from "../../Const";

export interface RequestResultI {
    status : number,
    message : string,
    data : any
}

export class RequestService {
    
    private authService : AuthService

    constructor(authService : AuthService) {
        this.authService = authService
    }

    // {
    //     headers: {
    //         Authorization: `Bearer ${this.authService.getAccessToken}`,
    // }, }

  
    private async makeRequest(url : string) {
        try {
            const response = await AxiosInstance.get(url);
            return ({
                status : STATUS_SUCCESS,
                message : "Success",
                data : response.data
            })
        } catch (error : any) {
            return ({
                status : STATUS_ERROR,
                message : "Failed to fetch from " + url + " Error: " + error,
                data : undefined
            })
        }
    }

    private getData(fun : (url : string) => Promise<RequestResultI>, url : string) {
        const [state, setState] = useState<RequestResultI>({
            status : STATUS_UNDEFINED,
            message : "",
            data : undefined
        })
    
        useEffect(() => {
            async function loadData() {
                setState(await fun(url))
            }
            loadData()
        }, [])
    
        return (state)
    }

    //====================================================
    //====================================================

    getLivesRequest() {
        return this.getData(this.makeRequest, "/games/live")
    }

    getResultsRequest() {
        return this.getData(this.makeRequest, "/games/latestResult")
    }

    getTopPlayersRequest() {
        return this.getData(this.makeRequest, "/games/leaderboard")
    }
}
