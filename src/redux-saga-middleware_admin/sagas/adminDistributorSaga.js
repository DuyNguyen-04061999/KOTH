import { takeEvery, call, put } from "redux-saga/effects";
import { ADMIN_DISTRIBUTOR_SERVICE } from "../services/adminDistributorService";
import { createSubDistributorSuccess, createSubDistributorFail, getListSubSuccess, getListSubFail } from "../reducers/adminDistributorReducer";

const adminDistributorService = new ADMIN_DISTRIBUTOR_SERVICE();

function* createSubDistributorSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminDistributorService.createSubDistributor, payload)
        if(res && res.status === 200) {
           yield put(createSubDistributorSuccess())
           alert("Create Sub Distributor Success!")
        } else {
           yield put(createSubDistributorFail())
        }
        
    } catch (error) {
        yield put(createSubDistributorFail())
    }
}

function* getListSubSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminDistributorService.getListSubDistributor, payload)
        const { list } = res?.data?.data
        if(res && res.status === 200) {
          yield put(getListSubSuccess({ list }))
        } else {
          yield put(getListSubFail())
        }
        
    } catch (error) {
        yield put(getListSubFail())
    }
}

function* adminDistributorSaga() {
    yield takeEvery("CREATE_SUB_DISTRIBUTOR", createSubDistributorSaga)
    yield takeEvery("GET_LIST_SUB", getListSubSaga)
}

export default adminDistributorSaga