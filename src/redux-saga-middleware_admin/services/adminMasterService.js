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
}