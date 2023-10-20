import { call, put, takeEvery } from "redux-saga/effects";
import { showToastNotify } from "../reducers/adminAlertReducer";
import { closeCreateDialog } from "../reducers/adminDialogReducer";
import { createSubDistributorFail, createSubDistributorSuccess, deleteSubFail, deleteSubSuccess, getListSub, getListSubFail, getListSubSuccess, givePermissionFail, givePermissionSuccess, updateSubFail, updateSubSuccess } from "../reducers/adminDistributorReducer";
import { ADMIN_DISTRIBUTOR_SERVICE } from "../services/adminDistributorService";

const adminDistributorService = new ADMIN_DISTRIBUTOR_SERVICE();

function* createSubDistributorSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminDistributorService.createSubDistributor, payload)
        if(res && res.status === 200) {
           yield put(createSubDistributorSuccess())
           yield put(showToastNotify({ type: "success", message: "Create Agent Successfully!" }))
           yield put(getListSub())
           yield put(closeCreateDialog());
        } else {
           yield put(showToastNotify({ type: "error", message: "Create Agent failed!" }))
           yield put(createSubDistributorFail())
        }
        
    } catch (error) {
        yield put(createSubDistributorFail())
        yield put(showToastNotify({ type: "error", message: error?.message || "Create Agent failed!" }))
    }
}

function* getListSubSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminDistributorService.getListSubDistributor, payload)
        const { list, listReferrals } = res?.data?.data
        if(res && res.status === 200) {
          yield put(getListSubSuccess({ list, listSubRef: listReferrals || []}))
        } else {
          yield put(getListSubFail())
        }
        
    } catch (error) {
        yield put(getListSubFail())
    }
}

function* updateSubSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminDistributorService.updateSubDistributor, payload)
        if(res && res.status === 200) {
          yield put(updateSubSuccess())
          yield put(showToastNotify({ type: "success", message: "Update agent successfully" }))
          yield put(getListSub())
        } else {
          yield put(updateSubFail())
          yield put(showToastNotify({ type: "error", message: "Update agent failed" }))
        }
        
    } catch (error) {
        yield put(updateSubFail())
        yield put(showToastNotify({ type: "error", message: error?.message || "Update agent failed" }))
    }
}

function* deleteSubSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminDistributorService.deleteSubDistributor, payload)
        if(res && res.status === 200) {
          yield put(deleteSubSuccess())
          yield put(showToastNotify({ type: "success", message: "Delete agent successfully" }))
          yield put(getListSub())
        } else {
          yield put(deleteSubFail())
          yield put(showToastNotify({ type: "error", message: "Delete agent failed" }))
        }
        
    } catch (error) {
        yield put(deleteSubFail())
        yield put(showToastNotify({ type: "error", message: error?.message || "Delete agent failed" }))
    }
}

function* givePermissionSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminDistributorService.givePermission, payload)
        if(res && res.status === 200) {
          yield put(givePermissionSuccess())
          yield put(showToastNotify({ type: "success", message: "Give permission successfully" }))
          yield put(getListSub())
        } else {
          yield put(givePermissionFail())
          yield put(showToastNotify({ type: "error", message: "Give permission failed" }))
        }
        
    } catch (error) {
        yield put(givePermissionFail())
        yield put(showToastNotify({ type: "error", message: error?.message || "Give permission failed" }))
    }
}

function* adminDistributorSaga() {
    yield takeEvery("CREATE_SUB_DISTRIBUTOR", createSubDistributorSaga)
    yield takeEvery("GET_LIST_SUB", getListSubSaga)
    yield takeEvery("UPDATE_SUB", updateSubSaga)
    yield takeEvery("DELETE_SUB", deleteSubSaga)
    yield takeEvery("GIVE_PERMISSION", givePermissionSaga)
}

export default adminDistributorSaga