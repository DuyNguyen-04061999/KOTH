import { takeEvery, call, put } from "redux-saga/effects";
import { getStripeFail, getStripeSuccess } from "../reducers/stripeReducer";
import StripeService from "../services/stripeService";

const stripeService = new StripeService();

function* getStripeSaga (dataRequest) {
    try {
        const { payload } = dataRequest
        const res = yield call(stripeService.getStripe, payload)
        const {status, data} = res;
        console.log(status);
        console.log(data);
        if(status === 200 || status === 201) {
            yield put(getStripeSuccess(data))
        } else {
            yield put(getStripeFail())
        }
    } catch (err) {
        yield put(getStripeFail())
    }
}

function* stripeSaga () {
    yield takeEvery("GET_STRIPE", getStripeSaga)
}

export default stripeSaga
