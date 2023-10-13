import { call, put, takeEvery } from "redux-saga/effects";
import { createAgentFail, createAgentSuccess, createEndUserSuccess, deleteAgentFail, deleteAgentSuccess, getListEndUserFail, getListEndUserSuccess, updateAgentFail, updateAgentSuccess } from "../reducers/adminAgentReducer";
import { showToastNotify } from "../reducers/adminAlertReducer";
import { closeCreateDialog } from "../reducers/adminDialogReducer";
import { ADMIN_AGENT_SERVICE } from "../services/adminAgentService";

const adminAgentService = new ADMIN_AGENT_SERVICE();

function* createAgent(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminAgentService.createAgent, payload)
        if(res && res.status === 200) {
           yield put(createAgentSuccess())
            yield put(showToastNotify({ type: "success", message: "Create Agent Successfully!" }))
           yield put(closeCreateDialog());
        } else {
           yield put(createAgentFail())
           yield put(showToastNotify({ type: "error", message: "Create Agent failed!" }))
        }
        
    } catch (error) {
        yield put(createAgentFail())
        yield put(showToastNotify({ type: "error", message: error?.message || "Create Agent failed!" }))
    }
}

function* getListEndUser(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminAgentService.getListEndUser, payload)
        const { refs, listAR } = res?.data?.data || []
        if(res && res.status === 200) {
           yield put(getListEndUserSuccess({ list: refs, listAR }))
        } else {
            yield put(getListEndUserFail())
        }
        
    } catch (error) {
        yield put(getListEndUserFail())
    }
}



function* updateAgent(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminAgentService.updateAgent, payload)
        if(res && res.status === 200) {
           yield put(updateAgentSuccess())
           yield put(showToastNotify({ type: "success", message: "Update Agent Successfully" }))
        } else {
           yield put(updateAgentFail())
           yield put(showToastNotify({ type: "error", message: "Update Agent failed" }))
        }
        
    } catch (error) {
        yield put(updateAgentFail())
        yield put(showToastNotify({ type: "error", message: error?.message || "Update Agent failed" }))
    }
}

function* deleteAgent(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminAgentService.deleteAgent, payload)
        if(res && res.status === 200) {
           yield put(deleteAgentSuccess())
           yield put(showToastNotify({ type: "success", message: "Delete Agent Successfully" }))
        } else {
           yield put(deleteAgentFail())
           yield put(showToastNotify({ type: "error", message: "Delete Agent failed" }))
        }
        
    } catch (error) {
        yield put(deleteAgentFail())
        yield put(showToastNotify({ type: "error", message: error?.message || "Delete Agent failed" }))
    }
}


function* createEndUser(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminAgentService.createEndUser, payload)
        if(res && res.status === 200) {
           yield put(createEndUserSuccess())
           yield put(showToastNotify({ type: "success", message: "Create End User Successfully" }))
           yield put(getListEndUser())
           yield put(closeCreateDialog());
        } else {
           yield put(createAgentFail())
           yield put(showToastNotify({ type: "error", message: "Create End User Failed" }))
        }
        
    } catch (error) {
        yield put(createAgentFail())
        yield put(showToastNotify({ type: "error", message: error?.message || "Create End User Failed" }))
    }
}


function* adminAgentSaga() {
    yield takeEvery("CREATE_AGENT", createAgent);
    yield takeEvery("GET_LIST_END_USER", getListEndUser);
    yield takeEvery("UPDATE_AGENT", updateAgent);
    yield takeEvery("DELETE_AGENT", deleteAgent);
    yield takeEvery("CREATE_END_USER", createEndUser);
}

export default adminAgentSaga