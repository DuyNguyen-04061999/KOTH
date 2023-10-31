import { PROMOTION_API } from "../axios/promotionApi";

class promotionService {
  async callDetailPromotion(dataRequest) {
    const res = await PROMOTION_API.get("/api/promotions/detail/" + dataRequest);
   
    return res;
  }
  async callDetailPromotionToken(dataRequest) {
    const headers = {
      "x-access-token": localStorage.getItem("token"),
    };
    const res = await PROMOTION_API.get("/api/promotions/auth/detail/" + dataRequest,
      {
        headers,
      }
    );
   
    return res;
  }
}
export default promotionService;
