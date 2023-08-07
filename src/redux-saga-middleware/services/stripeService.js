import { API } from "../axios/api";

class StripeService {
    async getStripe(dataRequest) {
        const res = await API.get("/api/payments/stripe")
        return res
    }
}

export default StripeService;