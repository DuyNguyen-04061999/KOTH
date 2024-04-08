import { PROMOTION_API } from "../axios/promotionApi";

class transactionService {
  async callTransactionHistory(dataRequest) {
    if (localStorage.getItem("token")) {
      const headers = {
        "x-access-refactor-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      };
      const res = await PROMOTION_API.get(
        `/api/history/transaction?limit=${dataRequest?.count}&offset=${dataRequest?.offset}`,
        {
          headers,
        }
      );
      return res;
    }
  }
}
export default transactionService;
