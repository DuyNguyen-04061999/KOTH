import { takeEvery, call } from "redux-saga/effects";
import StripeService from "../services/stripeService";

const stripeService = new StripeService();

function* getPaypalSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(stripeService.getPaypal, payload);
    console.log("res: ", res);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      if (data && data?.paymentLink) {
        window.open(data?.paymentLink, "_self");
        return;
      }
      console.log("Runned!!!!");
    }
  } catch (error) {}
}
function* stripeSaga() {
  yield takeEvery("GET_PAYPAL", getPaypalSaga);
}

export default stripeSaga;
