import { takeEvery, call, put } from "redux-saga/effects";
import { ADMIN_REVENUE_SERVICE } from "../services/adminRevenueService";
import { getTotalFail, getTotalSuccess } from "../reducers/adminRevenueReducer";
const adminRevenueService = new ADMIN_REVENUE_SERVICE();

function* getTotal(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(adminRevenueService.getTotal, payload);
    if (res && res.status === 200) {
      yield put(getTotalSuccess(res));
    } else {
      yield put(getTotalFail());
    }
  } catch (error) {
    yield put(getTotalFail());
  }
}

function* adminRevenueSaga() {
  yield takeEvery("GET_TOTAL", getTotal);
}

export default adminRevenueSaga;
