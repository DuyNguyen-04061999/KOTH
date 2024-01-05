import { PROMOTION_API } from "../axios/promotionApi";

class addFriendService {
  async callListSendingRequest(dataRequest) {
    const res = await PROMOTION_API.get("/api/socials/list-friend-invites", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
        authorization: localStorage.getItem("token"),
        "x-access-refactor-token": localStorage.getItem("token"),
      },
    });
    return res;
  }
  async callCancelFriendRequest(dataRequest) {
    console.log(dataRequest);
    const res = await PROMOTION_API.post(
      "/api/socials/cancel-friend",
      { name: dataRequest },
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

export default addFriendService;
