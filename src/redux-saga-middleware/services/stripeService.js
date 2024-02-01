import { PROMOTION_API } from "../axios/promotionApi";

class StripeService {
  async getPaypal(dataRequest) {
    const res = await PROMOTION_API.post(
      "/api/payments/paypal",
      {
        quantity: dataRequest,
        token: localStorage.getItem("token"),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  }
  async getPaypalSuccess(dataRequest) {
    const res = await PROMOTION_API.post(
      "/api/payments/paypal/success",
      {
        quantity: dataRequest,
        token: localStorage.getItem("token"),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  }
}

export default StripeService;
