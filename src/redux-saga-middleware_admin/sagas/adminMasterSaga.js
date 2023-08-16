import { takeEvery, call, put } from "redux-saga/effects";
import { ADMIN_MASTER_SERVICE } from "../services/adminMasterService";
import { createDistributorFail, createDistributorSuccess } from "../reducers/adminMasterReducer";
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

function* adminMasterSaga() {
    yield takeEvery("CREATE_DISTRIBUTOR", createDistributorSaga)
}

export default adminMasterSaga