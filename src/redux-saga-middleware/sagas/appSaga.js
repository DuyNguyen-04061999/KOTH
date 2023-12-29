import { call, put, takeEvery } from "redux-saga/effects";
import { findPeopleFail, findPeopleSuccess, getListBannerFail, getListBannerSuccess, getListBetFail, getListBetSuccess, getListFaqFail, getListFaqSuccess, getListWinnerFail, getListWinnerSuccess, saveTimeCloseDialog, saveTimeCloseNewYearDialog } from "../reducers/appReducer";
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
    yield put(getListWinnerFail())
}
}

var findPeople = 0
function* findPeopleSaga(dataRequest) {    
    try {
        findPeople += 1
        if(findPeople === 1) {
            const {payload} = dataRequest
            const res = yield call(appService.findPeople, payload)
            const {status, data} = res
            if(status === 200 || status === 201) {
                yield put(findPeopleSuccess(data))
                
            } else {
                yield put(findPeopleFail())
            }
        }
        findPeople = 0
    } catch (err) {
        findPeople = 0
        yield put(findPeopleFail())
    }
}

function* appSaga() {
    yield takeEvery("GET_LIST_FAQ", getListFaqSaga)
    yield takeEvery("GET_LIST_BET", getListBetSaga)
    yield takeEvery("CLOSE_DIALOG_DOUBLEDAY", closeDoubleDaySaga)
    yield takeEvery("GET_LIST_BANNER", getListBannerSaga)
    yield takeEvery("GET_LIST_WINNER",getListWinnerSaga)
    yield takeEvery("FIND_PEOPLE",findPeopleSaga)
     yield takeEvery("CLOSE_NEWYEAR_POPUP", closeNewYearPopupSaga);
}

export default appSaga;
