import { PROMOTION_API } from "../axios/promotionApi";

class likeDislikeService {
  async callListLikeDislikePromo(dataRequest) {
    const res = await PROMOTION_API.get("/api/games/list-game-likes", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
        authorization: localStorage.getItem("token"),
        "x-access-refactor-token": localStorage.getItem("token"),
      },
    });
    return res;
  }
  async callLikeGamePromo(dataRequest) {
    const res = await PROMOTION_API.post(
      "/api/games/like",
      {
        id: dataRequest,
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
  async callDislikeGamePromo(dataRequest) {
    const res = await PROMOTION_API.post(
      "/api/games/un-like",
      {
        id: dataRequest,
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
  async callUnlikeGamePromo(dataRequest) {
    const res = await PROMOTION_API.post(
      "/api/games/like",
      {
        id: dataRequest,
        unlike: true,
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
  async callUnDislikeGamePromo(dataRequest) {
    const res = await PROMOTION_API.post(
      "/api/games/un-like",
      {
        id: dataRequest,
        undislike: true,
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
  async callLikeDislikeCount(dataRequest) {
    const res = await PROMOTION_API.get(
      `/api/games/list-game-likes-dislikes/${dataRequest}`,
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

export default likeDislikeService;
