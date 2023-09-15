import { ADMIN_API } from "../axios/admin_api";

export class ADMIN_MASTER_SERVICE {
    async createDistributor (dataRequest) {
        const res = ADMIN_API.post(`/api/admin/master/create-distributor`, {
            ...dataRequest,
            token: localStorage.getItem("token_admin")
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        return res
    }

    async getListDistributor (dataRequest) {
        const res = ADMIN_API.get(`/api/admin/master/list-distributor`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token_admin")}`,
                "authorization": `Bearer ${localStorage.getItem("token_admin")}`,
            }
        })

        return res
    }

    async getDetailDistributor (dataRequest) {
        const res = ADMIN_API.get(`/api/admin/master/detail-distributor/${dataRequest?.id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token_admin")}`,
                "authorization": `Bearer ${localStorage.getItem("token_admin")}`,
            }
        })

        return res
    }

    async updateDistributor (dataRequest) {
        const res = ADMIN_API.patch(`/api/admin/master/update-distributor/${dataRequest?.id}`, {
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

    async deleteDistributor (dataRequest) {
        const res = ADMIN_API.delete(`/api/admin/master/delete-distributor/${dataRequest?.id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token_admin")}`,
                "authorization": `Bearer ${localStorage.getItem("token_admin")}`,
            }
        })

        return res
    }

    async getListTable (dataRequest) {
        const res = ADMIN_API.get(`/api/admin/master/database-manager`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token_admin")}`,
                "authorization": `Bearer ${localStorage.getItem("token_admin")}`,
            }
        })

        return res
    }
}