import { call, put, takeEvery } from "redux-saga/effects";
import {
  createTournamentFail,
  createTournamentSuccess,
  getBiggestEndTourFail,
  getBiggestEndTourSuccess,
  getBrandTourSuccess,
  getBrandTournamentFail,
  getBrandTournamentSuccess,
  getDailyTour,
  getEndedTour,
  getEndedTourFail,
  getEndedTourSuccess,
  getHotTour,
  getHotTourFail,
  getHotTourSuccess,
  getHottestWeekTourSuccess,
  getHourlyTour,
  getListGameForTournamentFail,
  getListGameForTournamentSuccess,
  getOngoingTour,
  getOngoingTourFail,
  getOngoingTourSuccess,
  getSkinForTournamentFail,
  getSkinForTournamentSuccess,
  getStandardTour,
  getStandardTourFail,
  getStandardTourSuccess,
  getThreeBrandTourSuccess,
  getUpcomingTour,
  getUpcomingTourFail,
  getUpcomingTourSuccess,
  getVipTour,
  getVipTourFail,
  getVipTourSuccess,
  getWeeklyTour,
} from "../reducers/tournamentReducer";
import TournamentService from "../services/tournamentService";
// import { showAlert } from "../reducers/alertReducer";
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
      yield put(getHotTour());
      if (res.status === 200) {
        yield put(getHotTourSuccess(res.data));
      } else {
        yield put(getHotTourFail());
      }
    } else if (payload === "vip") {
      yield put(getVipTour());
      if (res.status === 200) {
        yield put(getVipTourSuccess(res.data));
      } else {
        yield put(getVipTourFail());
      }
    } else if (payload === "standard") {
      yield put(getStandardTour());
      if (res.status === 200) {
        yield put(getStandardTourSuccess(res.data));
      } else {
        yield put(getStandardTourFail());
      }
    } else if (payload === "ongoing") {
      yield put(getOngoingTour());
      if (res.status === 200) {
        yield put(getOngoingTourSuccess(res.data));
      } else {
        yield put(getOngoingTourFail());
      }
    } else if (payload === "upcoming") {
      yield put(getUpcomingTour());
      if (res.status === 200) {
        yield put(getUpcomingTourSuccess(res.data));
      } else {
        yield put(getUpcomingTourFail());
      }
    } else if (payload === "ended") {
      yield put(getEndedTour());
      if (res.status === 200) {
        yield put(getEndedTourSuccess(res.data));
      } else {
        yield put(getEndedTourFail());
      }
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
      yield put(getBiggestEndTourSuccess(res.data));
    } else {
      yield put(getBiggestEndTourFail());
    }
  } catch (error) {
    console.log(error);
    yield put(getBiggestEndTourFail());
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
function* getThreeBrandTour() {
  try {
    const res = yield call(tournamentService.callThreeBrandTour);
    if (res.status === 200) {
      yield put(getThreeBrandTourSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
  }
}
function* tournamentSaga() {
  yield takeEvery("GET_BIGGEST_TOUR", getBiggesstEndTour);
  yield takeEvery("CALL_BRAND_TOUR", getBrandTour);
  yield takeEvery("CREATE_TOURNAMENT", postTournamentCreate);
  yield takeEvery("CALL_LIST_TOURNAMENT", getListTour);
  yield takeEvery("GET_LIST_GAME_FOR_TOURNAMENT", getListGameForTournamentSaga);
  yield takeEvery("GET_SKIN_FOR_TOURNAMENT", getSkinForTournamentSaga);
  yield takeEvery("GET_BRAND_TOURNAMENT", getListBrandForTournamentSaga);
  yield takeEvery("GET_HOTTEST_WEEK_TOUR", getHottestWeekTour);
  yield takeEvery("GET_THREE_BRAND_TOUR", getThreeBrandTour);
}
export default tournamentSaga;
