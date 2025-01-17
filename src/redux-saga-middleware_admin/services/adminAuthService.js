import { ADMIN_API } from "../axios/admin_api";

export class ADMIN_AUTH_SERVICE {
  async login(dataRequest) {
    const res = ADMIN_API.post(`/api/admin/authenticate/login`, dataRequest, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  }

  async resetPassword(dataRequest) {
    const res = ADMIN_API.post(
      `/api/admin/authenticate/reset-password`,
      {
        token: localStorage.getItem("token_admin"),
        ...dataRequest,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  }

  async changePassword(dataRequest) {
    const res = ADMIN_API.post(
      `/api/admin/authenticate/change-password`,
      {
        token: localStorage.getItem("token_admin"),
        ...dataRequest,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  }
}
