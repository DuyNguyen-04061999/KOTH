import { PROMOTION_API } from "../axios/promotionApi";

class SettingService {
    async getSettingInfo(dataRequest) {
        const res = await PROMOTION_API.get("/api/settings", dataRequest);
       
        return res;
      }
}
export default SettingService;