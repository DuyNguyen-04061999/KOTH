import { API } from "../axios/api";
import { PROMOTION_API } from "../axios/promotionApi";

class StripeService {
  async getStripe(dataRequest) {
    const res = await PROMOTION_API.post(
      "/api/payments/stripe",
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
