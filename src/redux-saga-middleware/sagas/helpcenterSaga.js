import { call, put, takeEvery } from "redux-saga/effects";
import {
  getListFAQPromoteFail,
  getListFAQPromoteSuccess,
} from "../reducers/helpcenterReducer";
import HelpCenterService from "../services/helpcenterService";
const helpcenterService = new HelpCenterService();

let helpCenterCount = 0
function* getListFAQPromote(dataRequest) {
  try {
    helpCenterCount += 1
    if(helpCenterCount === 1) {
      const { payload } = dataRequest;
      const res = yield call(helpcenterService.listFAQPromote, payload);
      const { status, data } = res;
      if (status === 200) {
        yield put(getListFAQPromoteSuccess(data));
      } else {
        yield put(getListFAQPromoteFail());
      }
    }
    helpCenterCount = 0
  } catch (error) {
    helpCenterCount = 0
    yield put(getListFAQPromoteFail());
  }
}

function* helpcenterSaga() {
  yield takeEvery("GET_LIST_FAQ_PROMOTE", getListFAQPromote);
}

export default helpcenterSaga;
