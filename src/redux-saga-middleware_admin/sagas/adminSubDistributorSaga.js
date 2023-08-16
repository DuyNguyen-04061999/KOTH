import { takeEvery, call, put } from "redux-saga/effects";
import { ADMIN_SUB_DISTRIBUTOR_SERVICE } from "../services/adminSubDistributorService";
import { getListRefFail, getListRefSuccess } from "../reducers/adminSubDistributorReducer";
const adminSubDistributorService = new ADMIN_SUB_DISTRIBUTOR_SERVICE();

function* getListRefSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminSubDistributorService.getListRef, payload)
        const { refs } = res?.data?.data || []

        if(res && res.status === 200) {
           yield put(getListRefSuccess({ refs }))
        } else {
            yield put(getListRefFail())
        }
        
    } catch (error) {
        yield put(getListRefFail())
    }
}

function* adminSubDistributorSaga() {
    yield takeEvery("GET_LIST_REF", getListRefSaga)
}

export default adminSubDistributorSaga