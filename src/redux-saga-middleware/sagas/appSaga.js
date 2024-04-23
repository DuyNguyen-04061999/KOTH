import { call, put, takeEvery } from "redux-saga/effects";
import {
  findPeopleFail,
  findPeopleSuccess,
  getListBannerFail,
  getListBannerSuccess,
  getListBetFail,
  getListBetSuccess,
  getListDisplayNameFail,
  getListDisplayNameSuccess,
  getListFaqFail,
  getListFaqSuccess,
  getListWinnerFail,
  getListWinnerSuccess,
  getUserGuestFail,
  getUserGuestSuccess,
  getScoreGameFail,
  getScoreGameSuccess,
  saveTimeCloseDialog,
  saveTimeCloseNewYearDialog,
} from "../reducers/appReducer";
import AppService from "../services/appService";
const appService = new AppService();

function* getListFaqSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(appService.getListFAQ, payload);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      yield put(getListFaqSuccess(data));
    } else {
      yield put(getListFaqFail());
    }
  } catch (error) {
    yield put(getListFaqFail());
  }
}

function* getListBetSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const respont = yield call(appService.getListBet, payload);
    const { status, data } = respont;
    if (status === 200 || status === 201) {
      yield put(getListBetSuccess(data));
    } else {
      yield put(getListBetFail());
    }
  } catch (err) {
    yield put(getListBetFail());
  }
}

function* closeDoubleDaySaga(dataRequest) {
  const timer = new Date();
  if (timer) {
    yield put(saveTimeCloseDialog(timer));
  }
}
function* closeNewYearPopupSaga(dataRequest) {
  const { payload } = dataRequest;
  if (payload) {
    yield put(saveTimeCloseNewYearDialog(payload));
  }
}

function* getListBannerSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(appService.getListBanner, payload);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      yield put(getListBannerSuccess(data));
    } else {
      yield put(getListBannerFail());
    }
  } catch (err) {
    yield put(getListBannerFail());
  }
}

function* getListWinnerSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(appService.getListWinner, payload);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      yield put(getListWinnerSuccess(data));
    } else {
      yield put(getListWinnerFail());
    }
  } catch (err) {
    yield put(getListWinnerFail());
  }
}

var findPeople = 0;
function* findPeopleSaga(dataRequest) {
  try {
    findPeople += 1;
    if (findPeople === 1) {
      const { payload } = dataRequest;
      const res = yield call(appService.findPeople, payload);
      const { status, data } = res;
      if (status === 200 || status === 201) {
        yield put(findPeopleSuccess(data));
      } else {
        yield put(findPeopleFail());
      }
    }
    findPeople = 0;
  } catch (err) {
    findPeople = 0;
    yield put(findPeopleFail());
  }
}

function* getListDisplayNameSaga(dataRequest) {
  try {
    const {payload} = dataRequest;
    const  res = yield call(appService.getDisplayName, payload)
    const { status, data} = res
    if(status === 200 || status === 201) {
      yield put(getListDisplayNameSuccess(data?.data?.displayNames))
    }
  } catch (err) {
    console.log(err);
    yield put(getListDisplayNameFail())
  }
}

function* getUserGuestSaga(dataRequest) {
  try{
    const {payload} = dataRequest
    const res = yield call(appService.getUserGuest, payload)
    const {status, data} = res
    if(status === 200 || status === 201) {
      yield put(getUserGuestSuccess(data))
      localStorage.setItem("token_guest", data?.data?.token)
    }
  } catch (err) {
    console.log(err);
    yield put(getUserGuestFail())
  }
}

function* getScoreGameSaga(dataRequest) {
  try {
    const {payload} = dataRequest;
    const res = yield call(appService.getScoreGame, payload)
    const { status, data } = res
    if(status === 200 || status === 201) {
      yield put(getScoreGameSuccess(data))
    }
  } catch (err) {
    console.log(err);
    yield put(getScoreGameFail())
  }
}

function* appSaga() {
  yield takeEvery("GET_LIST_FAQ", getListFaqSaga);
  yield takeEvery("GET_LIST_BET", getListBetSaga);
  yield takeEvery("CLOSE_DIALOG_DOUBLEDAY", closeDoubleDaySaga);
  yield takeEvery("GET_LIST_BANNER", getListBannerSaga);
  yield takeEvery("GET_LIST_WINNER", getListWinnerSaga);
  yield takeEvery("FIND_PEOPLE", findPeopleSaga);
  yield takeEvery("CLOSE_NEWYEAR_POPUP", closeNewYearPopupSaga);
  yield takeEvery("GET_LIST_DISPLAY_NAME", getListDisplayNameSaga)
  yield takeEvery("GET_USER_GUEST",getUserGuestSaga)
  yield takeEvery("GET_SCORE_GAME", getScoreGameSaga)
}

export default appSaga;
