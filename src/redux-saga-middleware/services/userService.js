import { PROMOTION_API } from "../axios/promotionApi";

class UserService {
  async login(dataRequest) {
    const res = await PROMOTION_API.post(
      "/api/authenticate/login",
      dataRequest,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  }

  async register(dataRequest) {
    const res = await PROMOTION_API.post(
      "/api/authenticate/register",
      dataRequest,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  }
  async deleteMessenger(dataRequest) {
    const res = await PROMOTION_API.delete("/api/socials/remove-message", {
      data: { ...dataRequest },
      headers: {
        "Content-Type": "application/json",
        "x-access-refactor-token": localStorage.getItem("token"),
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res;
  }

  async verifyOtp(dataRequest) {
    const res = await PROMOTION_API.post(
      "/api/authenticate/verify-otp",
      dataRequest,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-refactor-token": localStorage.getItem("token"),
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return res;
  }

  async forgetPassword(dataRequest) {
    const res = await PROMOTION_API.post(
      "/api/authenticate/forgot-password",
      dataRequest,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  }

  async updateNewPassword(dataRequest) {
    const res = await PROMOTION_API.post(
      "/api/authenticate/update-new-password",
      dataRequest,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  }

  async resendOtp(dataRequest) {
    const res = await PROMOTION_API.post(
      "/api/authenticate/resend-otp",
      dataRequest,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  }

  async updateProfile(dataRequest) {
    const res = await PROMOTION_API.post(
      "/api/authenticate/update-profile",
      {
        ...dataRequest,
        token: localStorage.getItem("token"),
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-refactor-token": localStorage.getItem("token"),
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return res;
  }

  async userInfo(dataRequest) {
    const res = await PROMOTION_API.get("/api/authenticate/me", {
      headers: {
        "Content-Type": "application/json",
        "x-access-refactor-token": dataRequest || localStorage.getItem("token"),
        Authorization: `Bearer ${dataRequest || localStorage.getItem("token")}`,
        authorization: `Bearer ${dataRequest || localStorage.getItem("token")}`,
      },
    });
    return res;
  }

  async logout(dataRequest) {
    return true;
  }

  async verifyPhone(dataRequest) {
    const res = await PROMOTION_API.post(
      "/api/authenticate/verify-phone",
      dataRequest
    );
    return res;
  }

  async verifyEmail(dataRequest) {
    const res = await PROMOTION_API.post(
      "/api/authenticate/verify-email",
      dataRequest
    );
    return res;
  }

  async reVerifyAccount(dataRequest) {
    const res = await PROMOTION_API.post(
      "/api/authenticate/re-verify",
      dataRequest,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-refactor-token": localStorage.getItem("token"),
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return res;
  }

  async getUserByUsername(dataRequest) {
    const res = await PROMOTION_API.post(
      "/api/authenticate/get-user-info-by-username",
      dataRequest,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  }

  async getMyInfo(dataRequest) {
    const res = await PROMOTION_API.post(
      "/api/authenticate/get-my-info",
      dataRequest,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-refactor-token":
            dataRequest || localStorage.getItem("token"),
          Authorization: `Bearer ${
            dataRequest || localStorage.getItem("token")
          }`,
          authorization: `Bearer ${
            dataRequest || localStorage.getItem("token")
          }`,
        },
      }
    );
    return res;
  }

  async getCityAndStateProfile(dataRequest) {
    const res = await PROMOTION_API.get("/api/get-cities-and-states/us");
    return res;
  }

  async getPrizeInfoService(dataRequest) {
    const res = await PROMOTION_API.post(
      "/api/prize/claim-update-info-prize",
      dataRequest,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-refactor-token":
            dataRequest || localStorage.getItem("token"),
          Authorization: `Bearer ${
            dataRequest || localStorage.getItem("token")
          }`,
          authorization: `Bearer ${
            dataRequest || localStorage.getItem("token")
          }`,
        },
      }
    );
    return res;
  }

  async getPrizeOptionalService(dataRequest) {
    const res = await PROMOTION_API.post(
      "/api/prize/claim-update-optional-info-prize",
      dataRequest,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-refactor-token":
            dataRequest || localStorage.getItem("token"),
          Authorization: `Bearer ${
            dataRequest || localStorage.getItem("token")
          }`,
          authorization: `Bearer ${
            dataRequest || localStorage.getItem("token")
          }`,
        },
      }
    );
    return res;
  }

  async banUser(dataRequest) {
    const res = await PROMOTION_API.post(
      "/api/authenticate/ban-user",
      dataRequest,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-refactor-token": localStorage.getItem("token"),
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return res;
  }
  async unbanUser(dataRequest) {
    const res = await PROMOTION_API.post(
      "/api/authenticate/unban-user",
      dataRequest,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-refactor-token": localStorage.getItem("token"),
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return res;
  }

  async upgradeGuestService(dataRequest) {
    const res = await PROMOTION_API.put(`/api/guest/upgrade`, dataRequest, {
      headers: {
        "Content-Type": "application/json",
        "x-access-refactor-token": localStorage.getItem("token"),
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res;
  }

  async getClaimFirstGamePlay(dataRequest) {
    const res = await PROMOTION_API.post(
      "/api/prize/claim-first-game-play",
      dataRequest,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-refactor-token":
            dataRequest || localStorage.getItem("token"),
          Authorization: `Bearer ${
            dataRequest || localStorage.getItem("token")
          }`,
          authorization: `Bearer ${
            dataRequest || localStorage.getItem("token")
          }`,
        },
      }
    );
    return res;
  }
}

export default UserService;
