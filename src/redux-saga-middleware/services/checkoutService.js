import { PROMOTION_API } from "../axios/promotionApi";

class CheckoutService {
  async getCheckout(dataRequest) {
    const token = localStorage.getItem("token");
    const res = await PROMOTION_API.post(
      "/api/payments/paypal/buy-package",
      {
        ...dataRequest,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          authorization: token,
          "x-access-refactor-token": token,
        },
      }
    );
    return res;
  }

  async getCheckoutSuccess(dataRequest) {
    const token = localStorage.getItem("token");
    const res = await PROMOTION_API.post(
      "/api/payments/paypal/buy-package/success",
      {
        ...dataRequest,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          authorization: token,
          "x-access-refactor-token": token,
        },
      }
    );
    return res;
  }

  async getCheckoutCancel(dataRequest) {
    const token = localStorage.getItem("token");
    const res = await PROMOTION_API.post(
      "/api/payments/paypal/buy-package/cancel",
      {
        ...dataRequest,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          authorization: token,
          "x-access-refactor-token": token,
        },
      }
    );
    return res;
  }
}

export default CheckoutService;
