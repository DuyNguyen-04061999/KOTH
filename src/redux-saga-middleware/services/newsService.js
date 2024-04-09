import { PROMOTION_API } from "../axios/promotionApi";

class newsService {
  async getListNewService(dataRequest) {
    const res = await PROMOTION_API.get(
      `/api/news?start=${dataRequest?.start}&count=${dataRequest?.count}&tag=${dataRequest?.tag}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  }

  async getListNewsDetailService(dataRequest) {
    const res = await PROMOTION_API.get(`/api/news/detail/${dataRequest?.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  }
  
  async getListBannerNewsService(dataRequest) {
    const res = await PROMOTION_API.get(`/api/news/get-list-banner`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return res
  }
}

export default newsService;
