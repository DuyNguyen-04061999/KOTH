import { PROMOTION_API } from "../axios/promotionApi";

class RefreshService {
  async refreshToken(dataRequest) {
    const res = await PROMOTION_API.post("/api/authenticate/refresh-token",
    {
      refreshToken: localStorage.getItem("refreshToken"),
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-access-refresh-token":
          localStorage.getItem("refreshToken"),
      },
    });
    return res;
  }
}

export default RefreshService;
