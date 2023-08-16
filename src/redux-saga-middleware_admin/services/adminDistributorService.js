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
}