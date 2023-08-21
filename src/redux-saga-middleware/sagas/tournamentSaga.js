import { takeEvery, call, put } from "redux-saga/effects";
import TournamentService from "../services/tournamentService";
import {
  createTournamentFail,
  createTournamentSuccess,
  getBiggestEndTourRedux,
  getBrandTourSuccess,
  getDailyTour,
  getHotTour,
  getHourlyTour,
  getWeeklyTour,
} from "../reducers/tournamentReducer";
const tournamentService = new TournamentService();

function* postTournamentCreate(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(tournamentService.callCreateTournament, payload);
    if (res.status === 200) {
      yield put(createTournamentSuccess());
    }
  } catch (error) {
    yield put(createTournamentFail());
  }
}
function* getListTour(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(tournamentService.callListTournament, payload);
    if (payload === "day") {
      yield put(getDailyTour(res.data));
    } else if (payload === "week") {
      yield put(getWeeklyTour(res.data));
    } else if (payload === "hour") {
      yield put(getHourlyTour(res.data));
    } else if (payload === "hot") {
      yield put(getHotTour(res.data));
    }
  } catch (error) {
    console.log(error);
  }
}
function* getBiggesstEndTour() {
  try {
    const res = yield call(tournamentService.callBiggestEndTour);
    if (res.status === 200) {
      yield put(getBiggestEndTourRedux(res.data));
    }
  } catch (error) {
    console.log(error);
  }
}
function* getBrandTour() {
  try {
    const res = yield call(tournamentService.callBrandTour);
    if (res.status === 200) {
      yield put(getBrandTourSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
  }
}
function* tournamentSaga() {
  yield takeEvery("CREATE_TOURNAMENT", postTournamentCreate);
  yield takeEvery("CALL_LIST_TOURNAMENT", getListTour);
  yield takeEvery("CALL_BIGGEST_END_TOUR", getBiggesstEndTour);
  yield takeEvery("CALL_BRAND_TOUR", getBrandTour);
}
export default tournamentSaga;
