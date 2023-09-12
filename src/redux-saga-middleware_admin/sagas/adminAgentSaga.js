import { takeEvery, call, put } from "redux-saga/effects";
import { ADMIN_AGENT_SERVICE } from "../services/adminAgentService";
import { createAgentFail, createAgentSuccess, createEndUserSuccess, deleteAgentFail, deleteAgentSuccess, getListAgentFail, getListAgentSuccess, updateAgentFail, updateAgentSuccess } from "../reducers/adminAgentReducer";

const adminAgentService = new ADMIN_AGENT_SERVICE();

function* createAgent(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminAgentService.createAgent, payload)
        if(res && res.status === 200) {
           yield put(createAgentSuccess())
           alert("Create Agent Success!")
        } else {
           yield put(createAgentFail())
        }
        
    } catch (error) {
        yield put(createAgentFail())
    }
}

function* getListAgent(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminAgentService.getListAgent, payload)
        const { refs } = res?.data?.data || []

        if(res && res.status === 200) {
           yield put(getListAgentSuccess({ refs }))
        } else {
            yield put(getListAgentFail())
        }
        
    } catch (error) {
        yield put(getListAgentFail())
    }
}

function* getListEndUser(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminAgentService.getListAgent, payload)
        const { refs } = res?.data?.data || []

        if(res && res.status === 200) {
           yield put(getListAgentSuccess({ refs }))
        } else {
            yield put(getListAgentFail())
        }
        
    } catch (error) {
        yield put(getListAgentFail())
    }
}


function* updateAgent(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminAgentService.updateAgent, payload)
        if(res && res.status === 200) {
           yield put(updateAgentSuccess())
           alert("Update Agent Success!")
        } else {
           yield put(updateAgentFail())
        }
        
    } catch (error) {
        yield put(updateAgentFail())
    }
}

function* deleteAgent(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminAgentService.deleteAgent, payload)
        if(res && res.status === 200) {
           yield put(deleteAgentSuccess())
           alert("Delete Agent Success!")
        } else {
           yield put(deleteAgentFail())
        }
        
    } catch (error) {
        yield put(deleteAgentFail())
    }
}


function* createEndUser(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminAgentService.createEndUser, payload)
        if(res && res.status === 200) {
           yield put(createEndUserSuccess())
           alert("Create End User Success!")
        } else {
           yield put(createAgentFail())
        }
        
    } catch (error) {
        yield put(createAgentFail())
    }
}


function* adminAgentSaga() {
    yield takeEvery("CREATE_AGENT", createAgent);
    yield takeEvery("GET_LIST_AGENT", getListAgent);
    yield takeEvery("UPDATE_AGENT", updateAgent);
    yield takeEvery("DELETE_AGENT", deleteAgent);
    yield takeEvery("CREATE_END_USER", createEndUser);
}

export default adminAgentSaga