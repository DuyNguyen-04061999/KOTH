import { PROMOTION_API } from "../axios/promotionApi";

class newsService {
  async getListNewService(dataRequest) {
    const res = await PROMOTION_API.get(
      `/api/news?start=${dataRequest?.start}&count=${dataRequest?.count}&tag=${dataRequest?.tag}`,
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

  async getListNewsDetailService(dataRequest) {
    const res = await PROMOTION_API.get(`/api/news/5`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
        authorization: localStorage.getItem("token"),
        "x-access-refactor-token": localStorage.getItem("token"),
      },
    });
    return res;
  }
}

export default newsService;
