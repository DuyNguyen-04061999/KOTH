import { PROMOTION_API } from "../axios/promotionApi";

class ReferralService {
  async registerSubcribeList(dataRequest) {
    if (localStorage.getItem("token")) {
      const res = await PROMOTION_API.get("/api/referral/list-register");
      return res;
    }
  }
  async tierListCall(dataRequest) {
    if (localStorage.getItem("token")) {
      const res = await PROMOTION_API.get("/api/referral/tier");
      return res;
    }
  }

  async claimPhysicalReward(dataRequest) {
    const headers = {
      "x-access-refactor-token": localStorage.getItem("token"),
      "Content-Type": "application/json",
    };
    const res = await PROMOTION_API.post(
      "/api/referral/tier/claim-physical-reward",
      { tierIdReward: dataRequest },
      { headers }
    );
    return res;
  }
  async claimAllReward(dataRequest) {
    const headers = {
      "x-access-refactor-token": localStorage.getItem("token"),
      "Content-Type": "application/json",
    };
    const res = await PROMOTION_API.post("/api/referral/tier/claim", {
      headers,
    });
    return res;
  }
  async closeCongraPopup(dataRequest) {
    const headers = {
      "x-access-refactor-token": localStorage.getItem("token"),
      "Content-Type": "application/json",
    };
    const res = await PROMOTION_API.patch("/api/referral/close-popup", {
      headers,
    });
    return res;
  }
  async currentBonuses(dataRequest) {
    if (localStorage.getItem("token")) {
      const headers = {
        "x-access-refactor-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      };
      const res = await PROMOTION_API.get("/api/referral/bonus", {
        headers,
      });
      return res;
    }
  }
}

export default ReferralService;
