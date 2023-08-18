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
}

export default TournamentService;
