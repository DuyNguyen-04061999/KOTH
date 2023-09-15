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
        const res = ADMIN_API.get(`/api/admin/agent/refs`, {
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