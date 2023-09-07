import { ADMIN_API } from "../axios/admin_api";

export class ADMIN_DISTRIBUTOR_SERVICE {
    async createSubDistributor (dataRequest) {
        const res = ADMIN_API.post(`/api/admin/distributor/create-sub-distributor`, {
            token: localStorage.getItem("token_admin"),
            ...dataRequest
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        return res
    }

    async getListSubDistributor (dataRequest) {
        const res = ADMIN_API.get(`/api/admin/distributor/list-sub-distributor`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token_admin")}`,
                "authorization": `Bearer ${localStorage.getItem("token_admin")}`,
            }
        })

        return res
    }

    async updateSubDistributor (dataRequest) {
        const res = ADMIN_API.patch(`/api/admin/distributor/update-sub-distributor/${dataRequest?.id}`, {
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

    async deleteSubDistributor (dataRequest) {
        const res = ADMIN_API.delete(`/api/admin/distributor/delete-sub-distributor/${dataRequest?.id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token_admin")}`,
                "authorization": `Bearer ${localStorage.getItem("token_admin")}`,
            }
        })

        return res
    }

}