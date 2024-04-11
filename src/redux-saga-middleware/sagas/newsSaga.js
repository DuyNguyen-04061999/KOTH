import { call, put, takeEvery } from "redux-saga/effects";
import newsService from "../services/newsService";
import {
  getListBannerNewsFail,
  getListBannerNewsSuccess,
  getListNewsDetailFail,
  getListNewsDetailSuccess,
  getListNewsFail,
  getListNewsSuccess,
} from "../reducers/news";

const newsSaga = new newsService();

function* getListNewsSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(newsSaga.getListNewService, payload);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      yield put(getListNewsSuccess(data));
    }
  } catch (err) {
    console.log(err);
    yield put(getListNewsFail());
  }
}

function* getListNewDetailSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(newsSaga.getListNewsDetailService, payload);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      yield put(getListNewsDetailSuccess(data));
    }
  } catch (err) {
    console.log(err);
    yield put(getListNewsDetailFail());
  }
}

function* getListBannerNewsSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(newsSaga.getListBannerNewsService, payload);
    yield put(getListBannerNewsSuccess(res?.data));
  } catch (err) {
    console.log(err);
    yield put(getListBannerNewsFail());
  }
}

function* listNewsSaga() {
  yield takeEvery("GET_LIST_NEWS", getListNewsSaga);
  yield takeEvery("GET_LIST_NEWS_DETAIL", getListNewDetailSaga);
  yield takeEvery("GET_LIST_BANNER_NEWS", getListBannerNewsSaga);
}

export default listNewsSaga;
