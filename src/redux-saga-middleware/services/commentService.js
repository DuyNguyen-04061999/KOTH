import { PROMOTION_API } from "../axios/promotionApi";

class COMMENT_SERVICE {
  async callListComment(dataRequest) {
    const res = await PROMOTION_API.get(
      `/api/promotions/list-comment-promotion/${dataRequest}`,
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
  async callAddComment(dataRequest) {
    const res = await PROMOTION_API.post(
      `/api/promotions/add-comment-promotion/${dataRequest?.promoId}`,
      {
        content: dataRequest?.comment,
      },
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
}
export default COMMENT_SERVICE;
