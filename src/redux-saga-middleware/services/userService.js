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

  async verifyOtp(dataRequest) {
    const res = await PROMOTION_API.post(
      "/api/authenticate/verify-otp",
      dataRequest,
      {
        headers: {
          "Content-Type": "application/json",
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
        token: localStorage.getItem("token")
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
        }
      },
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
        }
      },
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
          "x-access-refactor-token": dataRequest || localStorage.getItem("token"),
          Authorization: `Bearer ${dataRequest || localStorage.getItem("token")}`,
          authorization: `Bearer ${dataRequest || localStorage.getItem("token")}`,
        }
      },
    );
    return res;
  }
}

export default UserService;
