import { PROMOTION_API } from "../axios/promotionApi";

class NotificationService {
  async listNotification(dataRequest) {
    const res = await PROMOTION_API.get("/api/notification/list", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
        authorization: localStorage.getItem("token"),
        "x-access-refactor-token": localStorage.getItem("token"),
      },
    });
    return res;
  }
  async acceptFriend(dataRequest) {
    const res = await PROMOTION_API.post(
      `/api/socials/accept-friend/${dataRequest}`,
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
  async cancelFriend(dataRequest) {
    const res = await PROMOTION_API.post(
      `/api/socials/cancel-friend/${dataRequest}`,
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

  async readNotification(dataRequest) {
    const res = await PROMOTION_API.post(
      `/api/notification/read/${dataRequest?.id}`,
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

export default NotificationService;
