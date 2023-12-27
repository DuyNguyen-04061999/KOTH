import { PROMOTION_API } from "../axios/promotionApi";

class NotificationService {
    async listNotification(dataRequest) {
        const res = await PROMOTION_API.get("/api/notification/list", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token"),
                'authorization': localStorage.getItem("token"),
                'x-access-refactor-token': localStorage.getItem("token"),
            }
        })
        return res
    }

}

export default NotificationService