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
}