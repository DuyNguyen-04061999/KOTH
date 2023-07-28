import { API } from "../axios/api";

class AppService {
  async getListFAQ(dataRequest) {
    const res = await API.get("/api/list-faq");
    return res;
  }

  async getListBet(dataRequest) {
    const respont = await API.get("/api/list-bet");
    return respont;
  }
}

export default AppService;
