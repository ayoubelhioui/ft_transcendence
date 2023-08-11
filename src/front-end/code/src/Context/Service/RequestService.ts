import { useEffect, useState } from "react";
import { AuthService } from "./AuthService";
import AxiosInstance from "./AxiosInstance";
import { STATUS_ERROR, STATUS_OTHER, STATUS_SUCCESS, STATUS_UNDEFINED } from "../../Const";
import { ConversationInfoI } from "../../components/Chat/ChatContext";

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

    get getAuthService() {
        return this.authService
    }

    private static async makeGetRequest(obj : RequestService, url : string) {
        try {
            const response = await AxiosInstance.get(url, {
                headers: {
                    Authorization: `Bearer ${obj.authService.getAccessToken}`,
                }
            });
            return ({
                status : STATUS_SUCCESS,
                message : "Success",
                data : response.data
            })
        } catch (error : any) {
            //console.log(error)
            return ({
                status : STATUS_ERROR,
                message : "Failed to fetch from " + url + " Error: " + error,
                data : undefined
            })
        }
    }

    private static async makePostRequest(obj : RequestService, url : string, payload : any) {
        try {
            const response = await AxiosInstance.post(url, payload, {
                headers: {
                    Authorization: `Bearer ${obj.authService.getAccessToken}`,
                }
            });
            let ret = ({
                status : STATUS_SUCCESS,
                message : "Success",
                data : response.data
            })
            //console.log(ret)
            return (ret)
        } catch (error : any) {
            //console.log(error)
            let ret = ({
                status : STATUS_ERROR,
                message : "Failed to post to " + url + " Error: " + error,
                data : undefined
            })
            //console.log(ret)
            return (ret)
        }
    }

    private static async makePutRequest(obj : RequestService, url : string, payload : any) {
        try {
            const response = await AxiosInstance.put(url, payload, {
                headers: {
                    Authorization: `Bearer ${obj.authService.getAccessToken}`,
                }
            });
            let ret = ({
                status : STATUS_SUCCESS,
                message : "Success",
                data : response.data
            })
            //console.log(ret)
            return (ret)
        } catch (error : any) {
            //console.log(error)
            let ret = ({
                status : STATUS_ERROR,
                message : "Failed to put to " + url + " Error: " + error,
                data : undefined
            })
            //console.log(ret)
            return (ret)
        }
    }

    private static async makeDeleteRequest(obj : RequestService, url : string) {
        try {
            const response = await AxiosInstance.delete(url, {
                headers: {
                    Authorization: `Bearer ${obj.authService.getAccessToken}`,
                }
            });
            let ret = ({
                status : STATUS_SUCCESS,
                message : "Success",
                data : response.data
            })
            //console.log(ret)
            return (ret)
        } catch (error : any) {
            //console.log(error)
            let ret = ({
                status : STATUS_ERROR,
                message : "Failed to put to " + url + " Error: " + error,
                data : undefined
            })
            //console.log(ret)
            return (ret)
        }
    }
    
    private getData(request : (...params : any) => Promise<RequestResultI>, params : any[]) {
        const def : RequestResultI = {
            status : STATUS_UNDEFINED,
            message : "",
            data : undefined
        }

        const [state, setState] = useState<RequestResultI>(def)

        const effect = (dips : any[] = []) => {
            return useEffect(() => {
                //console.log("request...")
                const obj = this
                async function loadData() {
                    setState(await request(obj, ...params))
                }
                loadData()
            }, dips)
        }
        
        return {
            state, effect, setState
        }
    }


    //====================================================
    //====================================================

    getOngoingFriendsMatchesRequest() {
        return this.getData(RequestService.makeGetRequest, ["/games/live"])
    }

    getResultsRequest() {
        return this.getData(RequestService.makeGetRequest, ["/games/latestResult"])
    }

    getTopPlayersRequest() {
        return this.getData(RequestService.makeGetRequest, ["/games/leaderboard"])
    }

    // ==== Profile ====================================================

    getUserFriends() {
        return this.getData(RequestService.makeGetRequest, [`/users/me/friends`])
    }

    getAllUserFriends() {
        return RequestService.makeGetRequest(this, "/users/me/friends")
    }

    getUserMatchHistoryRequest(userId : number) {
        return this.getData(RequestService.makeGetRequest, [`/users/${userId}/matchhistory`])
    }
    
    //achievements
    getUserAchievementsRequest(userId : number) {
        return this.getData(RequestService.makeGetRequest, [`/users/${userId}/achievements`])
    }

    // ==== Chat ====================================================

    getChannelUsers(channelInfo : ConversationInfoI) {
        const request = async (obj : RequestService, channelInfo : ConversationInfoI) => {
            if (channelInfo.id && channelInfo.isGroup)
                return RequestService.makeGetRequest(obj, `/channels/${channelInfo.id}/users`)
            return ({
                status : STATUS_UNDEFINED,
                message : "",
                data : undefined
            })
        }
        return this.getData(request, [channelInfo])
    }

    getMyChannelsRequest() {
        //return RequestService.makeGetRequest(this, `/users/me/channels`)
        return this.getData(RequestService.makeGetRequest, ["/users/me/channels"])
    }

    getChannelsRequest() {
        return this.getData(RequestService.makeGetRequest, ["/channels"])
    }

    getChannelUsersRequest(channelId : number) {
        return this.getData(RequestService.makeGetRequest, [`/channels/${channelId}/users`])
    }

    getChannelMessagesRequest(channelId : number, date : string | undefined = undefined) {
        let a = !date ? "" : `?date=${date}`
        return RequestService.makeGetRequest(this, `/channels/${channelId}/messages${a}`)
        //return this.getData(RequestService.makeGetRequest, `/channels/${channelId}/messages${a}`)
    }

    async postJoinChannelRequest(channelId : number, payload : any = {}) {
        return await RequestService.makePostRequest(this,`/channels/${channelId}/join`, payload)
    }

    async postMessageRequest(channelId : number, payload : any = {}) {
        return await RequestService.makePostRequest(this,`/channels/${channelId}/messages`, payload)
    }

    async postCreateNewChannel(payload : any = {}) {
        return await RequestService.makePostRequest(this, `/channels`, payload)
    }
    
    // ==== Profile ====================================================

    getUserWithRelation(userId : number | undefined) {
        const request = async (obj : RequestService, userId : number) => {
            //console.log("getUserWithRelation: ", this)
            if (!userId) {
                return ({
                    status : STATUS_OTHER,
                    message : "profile",
                    data : undefined
                })
            }
            let res1 = await RequestService.makeGetRequest(obj, `/users/${userId}`)
            let res2 = await RequestService.makeGetRequest(obj, `/users/me/friends/${userId}/status`)
            if (res1.status === STATUS_SUCCESS && res2.status === STATUS_SUCCESS) {
                let res : RequestResultI = {
                    status : STATUS_SUCCESS,
                    message : "success",
                    data : {
                        user : res1.data,
                        relation : res2.data
                    }
                }
                return (res)
            }
            if (res1.status !== STATUS_SUCCESS)
                return res1
            if (res2.status !== STATUS_SUCCESS)
                return res2
            return ({
                status : STATUS_UNDEFINED,
                message : "",
                data : undefined
            })
        }
        return this.getData(request, [userId])
    }

    async getUsersSearchRequest(search : string) {
        //return this.getData(RequestService.makeGetRequest, `/users/search/${search}`)
        return await RequestService.makeGetRequest(this, `/users/search/${search}`)
    }

    async getSecretKeyRequest() {
        return await RequestService.makeGetRequest(this, `/auth/generate-secret-two-factor`)
    }

     // ==== Friends ====================================================

    //users/me/friends
    async deleteBlockFriend(targetUserId : number) {
        return await RequestService.makeDeleteRequest(this, `/users/me/friends/${targetUserId}/block`)
    }

    async deleteUnblockFriend(targetUserId : number) {
        return await RequestService.makeDeleteRequest(this, `/users/me/friends/${targetUserId}/unblock`)
    }

    async deleteFriend(targetUserId : number) {
        return await RequestService.makeDeleteRequest(this, `/users/me/friends/${targetUserId}`)
    }

    
    //users/me/friend-requests
    async deleteCancelFriendRequest(targetUserId : number) {
        return await RequestService.makeDeleteRequest(this, `users/me/friend-requests/${targetUserId}/cancel`)
    }
    
    async postRequestFriend(targetUserId : number) {
        return await RequestService.makePostRequest(this, `/users/me/friend-requests/${targetUserId}`, {})
    }

    async putAcceptFriend(targetUserId : number) {
        return await RequestService.makePutRequest(this, `/users/me/friend-requests/${targetUserId}`, {})
    }

    async deleteRefuseFriend(targetUserId : number) {
        return await RequestService.makeDeleteRequest(this, `/users/me/friend-requests/${targetUserId}`)
    }


    //auth
    async postVerifyEnableTwoFactorRequest(payload : any = {}) {
        return await RequestService.makePostRequest(this, '/auth/two-factors-verify-store', payload)
    }

    async postVerifyTwoFactorRequest(payload : any = {}) {
        return await RequestService.makePostRequest(this, '/auth/two-factors-verify', payload)
    }

    async postDisableTwoFactorsRequest(payload : any = {}) {
        return await RequestService.makePostRequest(this, '/auth/disable-two-factors', payload)
    }
    
    //users
    async putUpdateUserNameRequest(payload : any = {}) {
        return await RequestService.makePutRequest(this, '/users/update', payload)
    }

    async putUpdateUserImageRequest(id : number, payload : any = {}) {
        return await RequestService.makePutRequest(this, `/users/image/${id}`, payload)
    }

    async postUpdateUserInfo(id : number, payload : any = {}) {
        return await RequestService.makePostRequest(this, `/users/userInfo/${id}`, payload);
    }

    //============================================ Channels

    async deleteLeaveChannel(channelId : number) {
        return await RequestService.makeDeleteRequest(this, `/users/me/channels/${channelId}/leave`)
    }

    async postInviteToChannel(channelId : number, userId : number) {
        return await RequestService.makePostRequest(this, `/channels/${channelId}/invite/${userId}`, {})
    }


    //============================================ Notification

    async getNotification() {
        return await RequestService.makeGetRequest(this, `/users/me/notification`)
    }

    async acceptNotification(type : string, link : string) {
        if (type === "POST") {
            return await RequestService.makePostRequest(this, link, {})
        }
    }

    async deleteNotification(id : number) {
        return await RequestService.makeDeleteRequest(this, `users/me/notification/${id}`)
    }

    async getUserRole(channelId : number) {
        return await RequestService.makeGetRequest(this, `/users/me/channels/${channelId}/role`)
    }


    async changeMemberRole(channelId : number, targetUser : number, userRole : number) {
        return await RequestService.makePutRequest(this, `/channels/${channelId}/role/${targetUser}`, {userRole})
    }

    async kickMember(channelId : number, targetUser : number) {
        return await RequestService.makeDeleteRequest(this, `/channels/${channelId}/kick/${targetUser}`)
    }

    async blockMember(channelId : number, targetUser : number) {
        return await RequestService.makeDeleteRequest(this, `/channels/${channelId}/block/${targetUser}`)
    }

    async muteMember(channelId : number, targetUser : number, muteDurationMinutes : number) {
        return await RequestService.makePostRequest(this, `/channels/${channelId}/mute/${targetUser}`, {muteDurationMinutes})
    }


}
