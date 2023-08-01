import { takeEvery, call, put } from "redux-saga/effects";
import TournamentService from "../services/tournamentService";
import {
  createTournamentFail,
  createTournamentSuccess,
} from "../reducers/tournamentReducer";
const tournamentService = new TournamentService();

function* postTournamentCreate(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(tournamentService.callCreateTournament, payload);
    if (res.status === 200) {
      console.log("Res: ", res);
      yield put(createTournamentSuccess());
    }
  } catch (error) {
    yield put(createTournamentFail());
  }
}

function* tournamentSaga() {
  yield takeEvery("CREATE_TOURNAMENT", postTournamentCreate);
}
export default tournamentSaga;
