import { call, put, takeEvery } from "redux-saga/effects";
import { showToastNotification } from "../reducers/alertReducer";
import {
  checkoutPaypalCancelComplete,
  checkoutPaypalCancelFail,
  checkoutPaypalSuccessComplete,
  checkoutPaypalSuccessFail,
  getCheckOutFail,
  getCheckOutSuccess,
} from "../reducers/checkoutReducer";
import { buyPackageSuccess } from "../reducers/packageReducer";
import { toggleAlertStripeProcess } from "../reducers/stripeReducer";
import { getUserInfoReady, updateCountTicket } from "../reducers/userReducer";
import { toggleCheckWallet } from "../reducers/walletReducer";
import CheckoutService from "../services/checkoutService";

const checkoutService = new CheckoutService();
function* getCheckOutSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(checkoutService.getCheckout, payload);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      yield put(getCheckOutSuccess(data?.data?.paymentLink || ""));
      yield put(toggleCheckWallet());
      yield put(showToastNotification({
        type: "success",
        message: "Please wait a few minutes while system redirect to checkout page!"
      }))
      window.open(data?.data?.paymentLink || "/", "_self")
    } else {
      yield put(getCheckOutFail());
      yield put(showToastNotification({
        type: "error",
        message: "Checkout failed!"
      }))
    }
  } catch (err) {
    yield put(getCheckOutFail());
    yield put(showToastNotification({
      type: err?.type || "error",
      message: err?.message || "Checkout failed!"
    }))
  }
}

function* getCheckOutSagaSuccess(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(checkoutService.getCheckoutSuccess, payload);
        const { status, data } = res;
        if (status === 200 || status === 201) {
          yield put(buyPackageSuccess(data))
          yield put(checkoutPaypalSuccessComplete(data));
          yield put(updateCountTicket(data?.data?.quantity || 0))
          if(!data?.data?.quantity) {
              yield put(getUserInfoReady(localStorage.getItem("token")))
          }
          yield put(toggleAlertStripeProcess({
            type: "success"
          }));
        } else {
          yield put(checkoutPaypalSuccessFail());
          yield put(toggleAlertStripeProcess({
            type: "error"
          }));
        }
    } catch (err) {
        yield put(checkoutPaypalSuccessFail());
        yield put(toggleAlertStripeProcess({
          type: "error"
        }));
    }
}

function* getCheckOutSagaCancel(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(checkoutService.getCheckoutCancel, payload);
        const { status, data } = res;
        if (status === 200 || status === 201) {
          yield put(checkoutPaypalCancelComplete(data));
          yield put(toggleAlertStripeProcess({
            type: "error"
          }));
        } else {
          yield put(checkoutPaypalCancelFail());
          yield put(showToastNotification({
            type: "error",
            message: "Payment error!"
          }))
        }
    } catch (err) {
        yield put(checkoutPaypalCancelFail());
        yield put(showToastNotification({
          type: err?.type || "error",
          message: err?.message || "Payment error!"
        }))
    }
}

function* checkoutSaga() {
    yield takeEvery("GET_CHECK_OUT", getCheckOutSaga)
    yield takeEvery("CHECKOUT_PAYPAL_SUCCESS", getCheckOutSagaSuccess)
    yield takeEvery("CHECKOUT_PAYPAL_CANCEL", getCheckOutSagaCancel)
}

export default checkoutSaga