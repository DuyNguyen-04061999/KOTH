import { ADMIN_API } from "../axios/admin_api";

export class ADMIN_SUB_DISTRIBUTOR_SERVICE {
    async provideTicket (dataRequest) {
        const res = ADMIN_API.post(`/api/admin/sub-distributor/provide-ticket`, {
            token: localStorage.getItem("token_admin")
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        return res
    }

    async getListRef (dataRequest) {
        const res = ADMIN_API.post(`/api/admin/sub-distributor/refs`, {
            token: localStorage.getItem("token_admin")
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        return res
    }
}