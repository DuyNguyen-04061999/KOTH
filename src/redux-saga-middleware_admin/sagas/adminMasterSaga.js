import { call, put, takeEvery } from "redux-saga/effects";
import { showToastNotify } from "../reducers/adminAlertReducer";
import { closeCreateDialog } from "../reducers/adminDialogReducer";
import { createDistributorFail, createDistributorSuccess, deleteDistributorFail, deleteDistributorSuccess, getDetailDistributorFail, getDetailDistributorSuccess, getListDistributor, getListDistributorFail, getListDistributorSuccess, getListTableFail, getListTableSuccess, updateDistributorFail, updateDistributorSuccess } from "../reducers/adminMasterReducer";
import { ADMIN_MASTER_SERVICE } from "../services/adminMasterService";
const adminMasterService = new ADMIN_MASTER_SERVICE();

function* createDistributorSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminMasterService.createDistributor, payload)
        if(res && res.status === 200) {
           yield put(createDistributorSuccess())
           yield put(showToastNotify({ type: "success", message: "Create Distributor Successfully!" }))
           yield put(closeCreateDialog());
           yield put(getListDistributor());
        } else {
           yield put(showToastNotify({ type: "error", message: "Create Distributor Failed!" }))
           yield put(createDistributorFail())
        }
        
    } catch (error) {
        yield put(showToastNotify({ type: "error", message: error?.message || "Create Distributor Failed!" }))
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

function* updateDistributorSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminMasterService.updateDistributor, payload)
        if(res && res.status === 200) {
           yield put(updateDistributorSuccess())
           yield put(showToastNotify({ type: "success", message: "Update distributor successfully!" }))
           yield put(getListDistributor())
        } else {
            yield put(showToastNotify({ type: "error", message: "Update distributor Failed!" }))
            yield put(updateDistributorFail())
        }
        
    } catch (error) {
        yield put(showToastNotify({ type: "error", message: error?.message || "Update distributor Failed!" }))
        yield put(updateDistributorFail())
    }
}

function* deleteDistributorSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminMasterService.deleteDistributor, payload)
        if(res && res.status === 200) {
           yield put(deleteDistributorSuccess())
           yield put(showToastNotify({ type: "success", message: "Delete distributor successfully!" }))
           yield put(getListDistributor())
        } else {
           yield put(deleteDistributorFail())
           yield put(showToastNotify({ type: "error", message: "Delete distributor failed!" }))
        }
        
    } catch (error) {
        yield put(deleteDistributorFail())
        yield put(showToastNotify({ type: "error", message: error?.message || "Delete distributor failed!" }))
    }
}

function* getListTableSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminMasterService.getListTable, payload)
        const { list } = res?.data?.data || []
        if(res && res.status === 200) {
           yield put(getListTableSuccess({ list }))
        } else {
           yield put(getListTableFail())
        }
        
    } catch (error) {
        yield put(getListTableFail())
    }
}

function* adminMasterSaga() {
    yield takeEvery("CREATE_DISTRIBUTOR", createDistributorSaga)
    yield takeEvery("GET_LIST_DISTRIBUTOR", getListDistributorSaga)
    yield takeEvery("GET_DETAIL_DISTRIBUTOR", getDetailDistributorSaga)
    yield takeEvery("UPDATE_DISTRIBUTOR", updateDistributorSaga)
    yield takeEvery("DELETE_DISTRIBUTOR", deleteDistributorSaga)
    yield takeEvery("GET_LIST_TABLE", getListTableSaga)
}

export default adminMasterSaga