import { takeEvery, call, put } from "redux-saga/effects";
import GameService from "../services/gameService";
import {
  getDetailGameFail,
  getDetailGameSuccess,
  getListGameFail,
  getListGameSuccess,
  getSearchGameFail,
  getSearchGameSuccess,
} from "../reducers/gameReducer";
const gameService = new GameService();

function* getListGameSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(gameService.getListGame, payload);
    const { status, data } = res;
    if (status === 200) {
      yield put(getListGameSuccess(data));
    } else {
      yield put(getListGameFail());
    }
  } catch (error) {
    yield put(getListGameFail());
  }
}

function* getDetailGameSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(gameService.getDetailGame, payload);
    const { status, data } = res;
    if (status === 200) {
      yield put(getDetailGameSuccess(data));
    } else {
      yield put(getDetailGameFail());
    }
  } catch (error) {
    yield put(getDetailGameFail());
  }
}

function* getSeachGameSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(gameService.getSearchGame, payload);
    const { status, data } = res;
    if (status === 200) {
      yield put(getSearchGameSuccess(data));
    } else {
      yield put(getSearchGameFail());
    }
  } catch (error) {
    yield put(getSearchGameFail());
  }
}

function* gameSaga() {
  yield takeEvery("GET_LIST_GAME", getListGameSaga);
  yield takeEvery("GET_DETAIL_GAME", getDetailGameSaga);
  yield takeEvery("GET_SEARCH_GAME", getSeachGameSaga);
}

export default gameSaga;
