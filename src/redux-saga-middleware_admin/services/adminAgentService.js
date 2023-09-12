import { ADMIN_API } from "../axios/admin_api";

export class ADMIN_AGENT_SERVICE {
    async createAgent (dataRequest) {
        const res = ADMIN_API.post(``, {
            token: localStorage.getItem("token_admin"),
            ...dataRequest
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        return res
    }

    async getListAgent (dataRequest) {
        const res = ADMIN_API.get(``, {
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