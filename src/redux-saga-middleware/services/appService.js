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
    const res = await PROMOTION_API.get("/api/get-banners");
    return res;
  }

  async getListWinner(dataRequest) {
    const res = await PROMOTION_API.get(
      "/api/promotions/get-list-winner-recently"
    );
    return res;
  }

  async findPeople(dataRequest) {
    const res = await PROMOTION_API.get(
      `/api/socials/find-user/${dataRequest}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
          authorization: localStorage.getItem("token"),
          "x-access-refactor-token": localStorage.getItem("token"),
        },
      }
    );
    return res;
  }

  async getDisplayName(dataRequest) {
    console.log(dataRequest);
    const res = await PROMOTION_API.post(
      `/api/authenticate/generate-display-name`, 
      {
        firstName: dataRequest?.firstName,
        lastName: dataRequest?.lastName,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  }

  async getUserGuest(dataRequest) {
    const res = await PROMOTION_API.post(`/api/guest`)
    return res 
  }
}

export default AppService;
