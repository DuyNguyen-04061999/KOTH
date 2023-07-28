import { API } from "../axios/api";

class TournamentService {
  async callCreateTournament(dataRequest) {
    console.log("dataRequest:", dataRequest);
    const res = await API.post("/api/tournaments/create", dataRequest);
    return res;
  }
}

export default TournamentService;
