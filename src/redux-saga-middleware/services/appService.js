import { API } from "../axios/api";

class AppService {
    async getListFAQ(dataRequest) {
        const res = await API.get("/api/list-faq");
        return res;
    }
}

export default AppService