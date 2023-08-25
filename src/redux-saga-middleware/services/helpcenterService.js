import { API } from "../axios/api";

class HelpCenterService {
  async listFAQPromote(dataRequest) {
    const res = await API.get("/api/faq/list-faq-promote", dataRequest);
    return res;
  }
}

export default HelpCenterService;