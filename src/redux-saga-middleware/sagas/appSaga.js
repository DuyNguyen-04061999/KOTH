import { takeEvery, call, put } from "redux-saga/effects";
import AppService from "../services/appService";
import { getListFaqFail, getListFaqSuccess } from "../reducers/appReducer";
const appService = new AppService();

function* getListFaqSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(appService.getListFAQ, payload)
        const { status, data } = res;
        if(status === 200 || status === 201) {
            yield put(getListFaqSuccess(data))
        } else {
            yield put(getListFaqFail())
        }
        
    } catch (error) {
        yield put(getListFaqFail())
    }
}

function* appSaga() {
    yield takeEvery("GET_LIST_FAQ", getListFaqSaga)
}

export default appSaga