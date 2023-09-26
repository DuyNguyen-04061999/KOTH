import { ADMIN_API } from "../axios/admin_api";

export class ADMIN_REVENUE_SERVICE {
  async getTotal(dataRequest) {
    const res = ADMIN_API.get(
      `/api/admin/revenue/totals`,
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
