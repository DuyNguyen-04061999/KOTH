import { API } from "../axios/api";
import { PROMOTION_API } from "../axios/promotionApi";

class AppService {
  async getListFAQ(dataRequest) {
    const res = await API.get("/api/list-faq");
    return res;
  }

  async getListBet(dataRequest) {
    const respont = await API.get("/api/list-bet");
    return respont;
  }

  async getListBanner(dataRequest) {
    const res = await PROMOTION_API.get("/api/get-banners")
    return res
  }
}

export default AppService;
