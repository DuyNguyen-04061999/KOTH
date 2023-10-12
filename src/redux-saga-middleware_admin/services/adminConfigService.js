import { ADMIN_API } from "../axios/admin_api";

export class ADMIN_CONFIG_SERVICE {
    async getConfigs (dataRequest) {
        const res = ADMIN_API.post(`/api/admin/configs`, {
            token: localStorage.getItem("token_admin")
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        return res
    }

    async getListTicket (dataRequest) {
        const res = ADMIN_API.get(`/api/admin/configs/tickets`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token_admin")}`,
                "authorization": `Bearer ${localStorage.getItem("token_admin")}`,
            }
        })

        return res
    }

    async provideTicket (dataRequest) {
        const res = ADMIN_API.post(`/api/admin/configs/provide-ticket`, {
            token: localStorage.getItem("token_admin"),
            ...dataRequest
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        return res
    }

    async activeAccount (dataRequest) {
        const res = ADMIN_API.post(`/api/admin/configs/active-account`, {
            token: localStorage.getItem("token_admin"),
            ...dataRequest
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        return res
    }

    async deleteAccount (dataRequest) {
        const res = ADMIN_API.post(`/api/admin/configs/delete-account`, {
            token: localStorage.getItem("token_admin"),
            ...dataRequest
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        return res
    }

    
    async updateAccount (dataRequest) {
        const res = ADMIN_API.post(`/api/admin/configs/update-account`, {
            token: localStorage.getItem("token_admin"),
            ...dataRequest
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        return res
    }
}