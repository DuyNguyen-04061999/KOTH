import { takeEvery, call, put } from "redux-saga/effects";
import { ADMIN_MASTER_SERVICE } from "../services/adminMasterService";
import { createDistributorFail, createDistributorSuccess, getDetailDistributorFail, getDetailDistributorSuccess, getListDistributorFail, getListDistributorSuccess } from "../reducers/adminMasterReducer";
const adminMasterService = new ADMIN_MASTER_SERVICE();

function* createDistributorSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminMasterService.createDistributor, payload)
        if(res && res.status === 200) {
           yield put(createDistributorSuccess())
           alert("Create Distributor Success!")
        } else {
           yield put(createDistributorFail())
        }
        
    } catch (error) {
        yield put(createDistributorFail())
    }
}

function* getListDistributorSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminMasterService.getListDistributor, payload)
        const { list } = res?.data?.data
        if(res && res.status === 200) {
           yield put(getListDistributorSuccess({ list }))
        } else {
           yield put(getListDistributorFail())
        }
        
    } catch (error) {
        yield put(getListDistributorFail())
    }
}

function* getDetailDistributorSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminMasterService.getDetailDistributor, payload)
        const { dis } = res?.data?.data
        if(res && res.status === 200) {
           yield put(getDetailDistributorSuccess({ detail: dis }))
        } else {
           yield put(getDetailDistributorFail())
        }
        
    } catch (error) {
        yield put(getDetailDistributorFail())
    }
}

function* adminMasterSaga() {
    yield takeEvery("CREATE_DISTRIBUTOR", createDistributorSaga)
    yield takeEvery("GET_LIST_DISTRIBUTOR", getListDistributorSaga)
    yield takeEvery("GET_DETAIL_DISTRIBUTOR", getDetailDistributorSaga)
}

export default adminMasterSaga