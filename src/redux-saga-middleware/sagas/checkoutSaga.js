import { call, put, takeEvery } from "redux-saga/effects";
import CheckoutService from "../services/checkoutService";
import {
  getCheckOutFail,
  getCheckOutSuccess,
} from "../reducers/checkouReducer";
import { Try } from "@mui/icons-material";

const checkoutService = new CheckoutService();
function* getCheckOutSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(checkoutService.getCheckout, payload);
    const { status, data } = res;
    console.log(res);
    if (status === 200 || status === 201) {
      yield put(getCheckOutSuccess(data));
    } else {
      yield put(getCheckOutFail());
    }
  } catch (err) {
    yield put(getCheckOutFail());
  }
}

function* getCheckOutSagaSuccess(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(checkoutService.getCheckout, payload);
        const { status, data } = res;
        console.log(res);
        if (status === 200 || status === 201) {
          yield put(getCheckOutSuccess(data));
        } else {
          yield put(getCheckOutFail());
        }
    } catch (err) {
        yield put(getCheckOutFail());
    }
}

function* getCheckOutSagaCencal(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(checkoutService.getCheckout, payload);
        const { status, data } = res;
        console.log(res);
        if (status === 200 || status === 201) {
          yield put(getCheckOutSuccess(data));
        } else {
          yield put(getCheckOutFail());
        }
    } catch (err) {
        yield put(getCheckOutFail());
    }
}



function* checkoutSaga() {
    yield takeEvery("GET_CHECK_OUT", getCheckOutSaga)
    yield takeEvery("GET_CHECK_OUT_SUCCESS",getCheckOutSagaSuccess)
    yield takeEvery("GET_CHECK_OUT_CENCAL",getCheckOutSagaCencal)
}

export default checkoutSaga