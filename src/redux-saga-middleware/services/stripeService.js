import { API } from "../axios/api";

class StripeService {
    async getStripe(dataRequest) {
        const res = await API.post("/api/payments/stripe", {
            quantity: dataRequest,
            token: localStorage.getItem("token")
        } , {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return res
    }
}

export default StripeService;