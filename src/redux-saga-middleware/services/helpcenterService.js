import { PROMOTION_API } from "../axios/promotionApi";

class HelpCenterService {
  async listFAQPromote(dataRequest) {
    const res = await PROMOTION_API.get("/api/faq/list-faq-promote", dataRequest);
    return res;
  }
}

export default HelpCenterService;