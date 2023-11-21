import { API } from "../axios/api";

import { PROMOTION_API } from "../axios/promotionApi";

class TournamentService {
  async callCreateTournament(dataRequest) {
    const res = await API.post("/api/tournaments/create", dataRequest);
    return res;
  }

  async callListTournament(dataRequest) {
    const pathname = window.location.pathname
    if(pathname && (pathname === "/home" || pathname === "/")) {
      const res = await PROMOTION_API.get(
        `/api/promotions/list-promotion?typeTournament=${dataRequest}&type=home`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res;
    } else {
      const res = await PROMOTION_API.get(
        `/api/promotions/list-promotion?typeTournament=${dataRequest}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res;
    }
    
  }
  async listGameForTournament(dataRequest) {
    const res = await API.get("/api/games/list-game-tournament", dataRequest);
    return res;
  }
  async listSkinForTournament(dataRequest) {
    const res = await API.get("/api/games/list-skin-tournament", dataRequest);
    return res;
  }
  async listBrandForTournament(dataRequest) {
    const res = await API.get("/api/list-brand-tournament", dataRequest);
    return res;
  }
  async callBiggestEndTour() {
    const res = await PROMOTION_API.get("/api/promotions/biggest-end-promotion");
    return res;
  }
  async callBrandTour() {
    const res = await API.get("/api/tournaments/hot-brand-tour");
    return res;
  }
  async callHottestWeekTour() {
    const res = await PROMOTION_API.get("/api/promotions/hottest-week-promotion");
    return res;
  }
  async callThreeBrandTour() {
    const res = await PROMOTION_API.get("/api/promotions/three-brand-promotion");
    return res;
  }

  async detailPromotion (dataRequest) {
    const { id } = dataRequest
    const res = await API.get(`/api/promotions/detail/${id}`, 
    {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res
  }
}

export default TournamentService;
