import { takeEvery, call, put } from "redux-saga/effects";
import TournamentService from "../services/tournamentService";
import { createTournamentFail } from "../reducers/tournamentReducer";
const tournamentService = new TournamentService();

function* postTournamentCreate(dataRequest) {
  try {
    const { payload } = dataRequest;
    // const res = yield call(tournamentService.callCreateTournament, payload);
    // console.log("Res tournament: ", res);
    console.log("Payload: ", payload);
  } catch (error) {
    yield put(createTournamentFail());
  }
}

function* tournamentSaga() {
  yield takeEvery("CREATE_TOURNAMENT", postTournamentCreate);
}
export default tournamentSaga;
