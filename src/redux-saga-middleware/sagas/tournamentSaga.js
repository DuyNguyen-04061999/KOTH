import { takeEvery, call, put } from "redux-saga/effects";
import TournamentService from "../services/tournamentService";
import {
  createTournamentFail,
  createTournamentSuccess,
  getBrandTournamentFail,
  getBrandTournamentSuccess,
  getBiggestEndTourRedux,
  getBrandTourSuccess,
  getDailyTour,
  getHotTour,
  getHourlyTour,
  getListGameForTournamentFail,
  getListGameForTournamentSuccess,
  getSkinForTournamentFail,
  getSkinForTournamentSuccess,
  getWeeklyTour,
  getHottestWeekTourSuccess,
} from "../reducers/tournamentReducer";
import { showAlert } from "../reducers/alertReducer";
const tournamentService = new TournamentService();

function* postTournamentCreate(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(tournamentService.callCreateTournament, payload);
    if (res.status === 200) {
      yield put(createTournamentSuccess());
      window.location.reload();
    } else {
      yield put(createTournamentFail());
    }
  } catch (error) {
    console.log(error);
    yield put(createTournamentFail());
    alert(error?.message || error);
  }
}
function* getListTour(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(tournamentService.callListTournament, payload);
    if (payload === "daily") {
      yield put(getDailyTour(res.data));
    } else if (payload === "weekly") {
      yield put(getWeeklyTour(res.data));
    } else if (payload === "hourly") {
      yield put(getHourlyTour(res.data));
    } else if (payload === "hot") {
      yield put(getHotTour(res.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* getListGameForTournamentSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(tournamentService.listGameForTournament, payload);
    const { status, data } = res;
    console.log(data);
    console.log(123);
    if (status === 200) {
      yield put(getListGameForTournamentSuccess());
    }
  } catch (err) {
    yield put(getListGameForTournamentFail());
  }
}

function* getSkinForTournamentSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(tournamentService.listSkinForTournament, payload);
    const { status, data } = res;
    console.log(data);
    if (status === 200) {
      yield put(getSkinForTournamentSuccess(data));
    } else {
      yield put(getSkinForTournamentFail());
    }
  } catch (err) {
    yield put(getSkinForTournamentFail());
  }
}

function* getListBrandForTournamentSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(tournamentService.listBrandForTournament, payload);
    const { status, data } = res;
    console.log(data);
    if (status === 200) {
      yield put(getBrandTournamentSuccess(data));
    } else {
      yield put(getBrandTournamentFail());
    }
  } catch (err) {
    yield put(getBrandTournamentFail());
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
function* getHottestWeekTour() {
  try {
    const res = yield call(tournamentService.callHottestWeekTour);
    if (res.status === 200) {
      yield put(getHottestWeekTourSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
  }
}
function* tournamentSaga() {
  yield takeEvery("CALL_BIGGEST_END_TOUR", getBiggesstEndTour);
  yield takeEvery("CALL_BRAND_TOUR", getBrandTour);
  yield takeEvery("CREATE_TOURNAMENT", postTournamentCreate);
  yield takeEvery("CALL_LIST_TOURNAMENT", getListTour);
  yield takeEvery("GET_LIST_GAME_FOR_TOURNAMENT", getListGameForTournamentSaga);
  yield takeEvery("GET_SKIN_FOR_TOURNAMENT", getSkinForTournamentSaga);
  yield takeEvery("GET_BRAND_TOURNAMENT", getListBrandForTournamentSaga);
  yield takeEvery("GET_HOTTEST_WEEK_TOUR", getHottestWeekTour);
}
export default tournamentSaga;
