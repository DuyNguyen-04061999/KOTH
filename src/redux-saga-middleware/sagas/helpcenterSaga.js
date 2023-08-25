import { takeEvery, call, put } from "redux-saga/effects";
import {
  getListFAQPromoteFail,
  getListFAQPromoteSuccess,
} from "../reducers/helpcenterReducer";
import HelpCenterService from "../services/helpcenterService";
const helpcenterService = new HelpCenterService();

function* getListFAQPromote(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(helpcenterService.listFAQPromote, payload);
    const { status, data } = res;
    if (status === 200) {
      yield put(getListFAQPromoteSuccess(data));
    } else {
      yield put(getListFAQPromoteFail());
    }
  } catch (error) {
    yield put(getListFAQPromoteFail());
  }
}

function* helpcenterSaga() {
  yield takeEvery("GET_LIST_FAQ_PROMOTE", getListFAQPromote);
}

export default helpcenterSaga;
