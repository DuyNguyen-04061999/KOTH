import { ADMIN_API } from "../axios/admin_api";

export class ADMIN_AGENT_SERVICE {
    async createAgent (dataRequest) {
        const res = ADMIN_API.post(`/api/admin/sub-distributor/create-agent`, {
            token: localStorage.getItem("token_admin"),
            ...dataRequest
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        return res
    }

    async createEndUser (dataRequest) {
        const res = ADMIN_API.post(`/api/admin/agent/create-end-user`, {
            token: localStorage.getItem("token_admin"),
            ...dataRequest
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        return res
    }

    async getListEndUser (dataRequest) {
        let finalQueryString = ""
        if(dataRequest) {
            const { startTime, endTime, account, type } = dataRequest;
            const queryParams = [];

            if (dataRequest.startTime !== null && dataRequest.startTime !== undefined) {
            queryParams.push(`startTime=${startTime}`);
            }
        
            if (dataRequest.endTime !== null && dataRequest.endTime !== undefined) {
            queryParams.push(`endTime=${endTime}`);
            }
        
            if (dataRequest.account !== null && dataRequest.account !== undefined) {
            queryParams.push(`account=${account}`);
            }
        
            if (dataRequest.type !== null && dataRequest.type !== undefined) {
            queryParams.push(`type=${type}`);
            }
        
            const queryString = queryParams.join("&");
        
            finalQueryString = queryParams.length > 0 ? `?${queryString}` : "";

            if(!window.location.pathname?.includes("report")) {
                if(finalQueryString) {
                  finalQueryString =  finalQueryString + "&revenue=1"
                } else {
                  finalQueryString = finalQueryString + "?revenue=1"
                }
            }
        } else {
            if(!window.location.pathname?.includes("report")) {
                if(finalQueryString) {
                  finalQueryString =  finalQueryString + "&revenue=1"
                } else {
                  finalQueryString = finalQueryString + "?revenue=1"
                }
            }
        }
        const res = ADMIN_API.get(`/api/admin/agent/refs` + finalQueryString, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token_admin")}`,
                "authorization": `Bearer ${localStorage.getItem("token_admin")}`,
            }
        })

        return res
    }

    async updateAgent (dataRequest) {
        const res = ADMIN_API.patch(``, {
            password: dataRequest?.newPassword || ""
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token_admin")}`,
                "authorization": `Bearer ${localStorage.getItem("token_admin")}`,
            }
        })

        return res
    }

    async deleteAgent (dataRequest) {
        const res = ADMIN_API.delete(``, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token_admin")}`,
                "authorization": `Bearer ${localStorage.getItem("token_admin")}`,
            }
        })

        return res
    }

}