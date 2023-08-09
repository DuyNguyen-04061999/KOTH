import { API } from "../axios/api";

class StripeService {
    async getStripe(dataRequest) {
        console.log("data", dataRequest);
        const res = await API.post("/api/payments/stripe", {
            quantity: dataRequest
        } , {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return res
    }
}

export default StripeService;