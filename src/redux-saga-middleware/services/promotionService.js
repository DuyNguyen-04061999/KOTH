import { PROMOTION_API } from "../axios/promotionApi";

class promotionService {
  async callDetailPromotion(dataRequest) {
    const res = await PROMOTION_API.get("/api/promotions/detail/" + dataRequest);
   
    return res;
  }

  async callDetailPromotionToken(dataRequest) {
    const res = await PROMOTION_API.get("/api/promotions/auth/detail/" + dataRequest?.id,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-refactor-token":( localStorage.getItem("token") || dataRequest?.token ),
          Authorization: `Bearer ${ localStorage.getItem("token") || dataRequest?.token }`,
          authorization: `Bearer ${ localStorage.getItem("token") || dataRequest?.token}`,
        },
      }
    );
   
    return res;
  }

  async joinPromotion(dataRequest) {
    const headers = {
      "x-access-refactor-token": localStorage.getItem("token"),
      "Content-Type": "application/json",
    };
    const res = await PROMOTION_API.post("/api/promotions/join-promotion", dataRequest,
      {
        headers,
      }
    );
   
    return res;
  }

  async startGameInPromotion(dataRequest) {
    const headers = {
      "x-access-refactor-token": (localStorage.getItem("token") ),
      "Content-Type": "application/json",
    };
    const res = await PROMOTION_API.post("/api/promotions/start-game-promotion", dataRequest,
      {
        headers,
      }
    );
   
    return res;
  }
}
export default promotionService;
