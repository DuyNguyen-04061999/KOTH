import { takeEvery, call, put } from "redux-saga/effects";
import { getStripeFail, getStripeSuccess, toggleAlertStripeProcess } from "../reducers/stripeReducer";
import StripeService from "../services/stripeService";

const stripeService = new StripeService();

function* getStripeSaga (dataRequest) {
    try {
        const { payload } = dataRequest
        const res = yield call(stripeService.getStripe, payload)
        const {status, data} = res;
        if(status === 200 || status === 201) {
            if(data && data?.paymentLink) {
                window.open(data?.paymentLink,"_self")
                return
            }
            yield put(getStripeSuccess(data))
        } else {
            yield put(getStripeFail())
            yield put(toggleAlertStripeProcess({
                type: "warning"
            }))
        }
    } catch (err) {
        yield put(getStripeFail())
        yield put(toggleAlertStripeProcess({
            type: "warning"
        }))
    }
}

function* stripeSaga () {
    yield takeEvery("GET_STRIPE", getStripeSaga)
}

export default stripeSaga
