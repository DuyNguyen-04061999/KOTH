import { takeEvery, call, put } from "redux-saga/effects";
import { ADMIN_MASTER_SERVICE } from "../services/adminMasterService";
import { createDistributorFail, createDistributorSuccess, deleteDistributorFail, deleteDistributorSuccess, getDetailDistributorFail, getDetailDistributorSuccess, getListDistributorFail, getListDistributorSuccess, getListTableFail, getListTableSuccess, updateDistributorFail, updateDistributorSuccess } from "../reducers/adminMasterReducer";
import { closeCreateDialog } from "../reducers/adminDialogReducer";
const adminMasterService = new ADMIN_MASTER_SERVICE();

function* createDistributorSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminMasterService.createDistributor, payload)
        if(res && res.status === 200) {
           yield put(createDistributorSuccess())
           alert("Create Distributor Success!")
           yield put(closeCreateDialog());
           window.location.reload();
        } else {
           yield put(createDistributorFail())
        }
        
    } catch (error) {
        yield put(createDistributorFail())
    }
}

function* getListDistributorSaga(dataRequest) {
    console.log(1232113);
    try {
        const { payload } = dataRequest;
        console.log(payload);
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
           alert("Update Distributor Success!")
        } else {
           yield put(updateDistributorFail())
        }
        
    } catch (error) {
        yield put(updateDistributorFail())
    }
}

function* deleteDistributorSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminMasterService.deleteDistributor, payload)
        if(res && res.status === 200) {
           yield put(deleteDistributorSuccess())
           alert("Delete Distributor Success!")
           setTimeout(() => {
            window.location.reload()
           }, 1000)
        } else {
           yield put(deleteDistributorFail())
        }
        
    } catch (error) {
        yield put(deleteDistributorFail())
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