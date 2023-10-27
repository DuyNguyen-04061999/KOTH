import { API } from "../axios/api";

class promotionService {
  async callDetailPromotion(dataRequest) {
    const res = await fetch(
      process.env.REACT_APP_API_END_POINT +
        "/api/promotions/detail/" +
        dataRequest
    );
    let data = await res.json();
    return data;
  }
  async callDetailPromotionToken(dataRequest) {
    const headers = {
      "x-access-token": localStorage.getItem("token"),
    };
    const res = await fetch(
      process.env.REACT_APP_API_END_POINT +
        "/api/promotions/auth/detail/" +
        dataRequest,
      {
        headers,
      }
    );
    let data = await res.json();
    return data;
  }
}
export default promotionService;
