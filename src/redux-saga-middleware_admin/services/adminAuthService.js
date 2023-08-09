import { ADMIN_API } from "../axios/admin_api";

export class ADMIN_AUTH_SERVICE {
    async login (dataRequest) {
        const res = ADMIN_API.post(`/api/admin/authenticate/login`, {})
        return res
    }
}