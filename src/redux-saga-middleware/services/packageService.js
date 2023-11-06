import { API } from "../axios/api";
import { PROMOTION_API } from "../axios/promotionApi";

class PackageService {
    async getListPackage(dataRequest) {
        const res = await PROMOTION_API.get("/api/packages/list-package")
        return res
    }

    async buyPackage(dataRequest) {
        const res = await PROMOTION_API.post("/api/packages/buy-package", {
            ...dataRequest
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token"),
                'x-access-token': localStorage.getItem("token"),
            }

        })
        return res
    }

}

export default PackageService