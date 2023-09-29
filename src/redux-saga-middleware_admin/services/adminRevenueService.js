import { ADMIN_API } from "../axios/admin_api";

export class ADMIN_REVENUE_SERVICE {
  async getTotal(dataRequest) {
    const res = ADMIN_API.get(
      `/api/admin/revenue/totals`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token_admin")}`,
          "authorization": `Bearer ${localStorage.getItem("token_admin")}`,
        },
      }
    );
    return res;
  }
}
