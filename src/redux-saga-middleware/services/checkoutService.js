import { API } from "../axios/api";
import { PROMOTION_API } from "../axios/promotionApi";

class CheckoutService {
    async getCheckout(dataRequest) {
        const token = localStorage.getItem("token")
        const res = await PROMOTION_API.post("/api/payments/paypal/buy-package", dataRequest,{
            "headers":{
                "Authorization": token,
            }
        })
        return res
    }
}

export default CheckoutService