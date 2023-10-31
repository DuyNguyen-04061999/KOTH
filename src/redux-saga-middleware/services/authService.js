import { PROMOTION_API } from "../axios/promotionApi";

class AuthService {
  async login(dataRequest) {
    const res = await PROMOTION_API.get("/api/list-faq");
    return res;
  }
}

export default AuthService;
