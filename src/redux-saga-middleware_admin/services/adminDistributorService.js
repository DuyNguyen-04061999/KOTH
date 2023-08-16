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
}