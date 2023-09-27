import { takeEvery, call, put } from "redux-saga/effects";
import { ADMIN_DISTRIBUTOR_SERVICE } from "../services/adminDistributorService";
import { createSubDistributorSuccess, createSubDistributorFail, getListSubSuccess, getListSubFail, updateSubSuccess, updateSubFail, deleteSubSuccess, deleteSubFail, givePermissionSuccess, givePermissionFail } from "../reducers/adminDistributorReducer";
import { closeCreateDialog } from "../reducers/adminDialogReducer";

const adminDistributorService = new ADMIN_DISTRIBUTOR_SERVICE();

function* createSubDistributorSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminDistributorService.createSubDistributor, payload)
        if(res && res.status === 200) {
           yield put(createSubDistributorSuccess())
        //    alert("Create Sub Distributor Success!")
           alert("Create Agent Success!")
           yield put(closeCreateDialog());
           window.location.reload();
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
          alert("Update Sub Distributor Success!")
        } else {
          yield put(updateSubFail())
        }
        
    } catch (error) {
        yield put(updateSubFail())
    }
}

function* deleteSubSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminDistributorService.deleteSubDistributor, payload)
        if(res && res.status === 200) {
          yield put(deleteSubSuccess())
          alert("Delete Sub Distributor Success!")
          setTimeout(() => {
           window.location.reload()
          }, 1000)
        } else {
          yield put(deleteSubFail())
        }
        
    } catch (error) {
        yield put(deleteSubFail())
    }
}

function* givePermissionSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminDistributorService.givePermission, payload)
        if(res && res.status === 200) {
          yield put(givePermissionSuccess())
          alert("Give permission Success!")
          setTimeout(() => {
           window.location.reload()
          }, 1000)
        } else {
          yield put(givePermissionFail())
        }
        
    } catch (error) {
        yield put(givePermissionFail())
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