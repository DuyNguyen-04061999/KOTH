import { API } from "../axios/api";

class GameService {
  async getListGame(dataRequest) {
    const res = await API.get("/api/games/list-game");
    return res;
  }

  async getDetailGame(dataRequest) {
    const res = await API.get(`/api/games/detail/${dataRequest?.id}`);
    return res;
  }

  async getSearchGame(dataRequest) {
    const res = await API.post(
      `/api/games/search`,
      {
        value: dataRequest,
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

export default GameService;
