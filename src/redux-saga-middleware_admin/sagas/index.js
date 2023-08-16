import { all } from "redux-saga/effects";
import adminAuthSaga from "./adminAuthSaga";
import adminConfigAuthSaga from "./adminConfigSaga";
import adminMasterSaga from "./adminMasterSaga";
import adminDistributorSaga from "./adminDistributorSaga";
import adminSubDistributorSaga from "./adminSubDistributorSaga";

function* watchAll() {
  yield all([
    adminAuthSaga(),
    adminConfigAuthSaga(),
    adminMasterSaga(),
    adminDistributorSaga(),
    adminSubDistributorSaga()
  ]);
}

export default watchAll;
