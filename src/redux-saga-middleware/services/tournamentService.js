import { API } from "../axios/api";

class TournamentService {
  async callCreateTournament(dataRequest) {
    const res = await API.post("/api/tournaments/create", dataRequest);
    return res;
  }
  async callListTournament(dataRequest) {
    const res = await API.get(
      `/api/tournaments/list-tournament?typeTournament=${dataRequest}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  }
  async listGameForTournament(dataRequest) {
    const res = await API.get("/api/games/list-game-tournament", dataRequest)
    return res
  }
  async listSkinForTournament(dataRequest) {
    const res = await API.get("/api/games/list-skin-tournament", dataRequest)
    return res
  }
  async listBrandForTournament(dataRequest) {
    const res = await API.get("/api/list-brand-tournament", dataRequest)
    return res
  }
}

export default TournamentService;
