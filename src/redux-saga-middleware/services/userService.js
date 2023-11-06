import { API } from "../axios/api";

class UserService {
  async login(dataRequest) {
    const res = await API.post("/api/authenticate/login", dataRequest , {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return res;
  }

  async register(dataRequest) {
    const res = await API.post("/api/authenticate/register", dataRequest,{
      headers: {
        "Content-Type": "application/json",
      }
    });
    return res;
  }

  async verifyOtp(dataRequest) {
    const res = await API.post("/api/authenticate/verify-otp", dataRequest,{
      headers: {
        "Content-Type": "application/json",
      }
    });
    return res;
  }

  async forgetPassword(dataRequest) {
    const res = await API.post("/api/authenticate/forgot-password", dataRequest,{
      headers: {
        "Content-Type": "application/json",
      }
    });
    return res;
  }

  async updateNewPassword(dataRequest) {
    const token = localStorage.getItem("token");
    const res = await API.post(
      "/api/authenticate/update-new-password",
      {
        data: dataRequest,
        token: token,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + { token },
        },
      }
    );
    return res;
  }

  async resendOtp(dataRequest) {
    const res = await API.post("/api/authenticate/resend-otp", dataRequest,{
      headers: {
        "Content-Type": "application/json",
      }
    });
    return res;
  }

  async updateProfile(dataRequest) {
    const token = localStorage.getItem("token");
    const res = await API.post(
      "/api/update-profile",
      {
        data: dataRequest,
        token: token,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + { token },
        },
      }
    );
    return res;
  }

  async userInfo(dataRequest) {
    const token = localStorage.getItem("token");
    const res = await API.get(
      "/api/authenticate/me",
      {
        token: token,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": { token },
          Authorization: `Bearer ${token}`
        },
      }
    );
    return res;
  }

  async logout(dataRequest) {
    const token = localStorage.getItem("token");
    const res = await API.post(
      "/api/logout",
      {
        data: dataRequest,
        token: token,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + { token },
        },
      }
    );
    return res;
  }
  
  async verifyPhone(dataRequest) {
    const res = await API.post("/api/authenticate/verify-phone", dataRequest);
    return res;
  }

  async verifyEmail(dataRequest) {
    const res = await API.post("/api/authenticate/verify-email", dataRequest);
    return res;
  }
}

export default UserService;
