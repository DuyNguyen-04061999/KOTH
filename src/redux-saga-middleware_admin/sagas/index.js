import { all } from "redux-saga/effects";
import adminAuthSaga from "./adminAuthSaga";
import adminConfigAuthSaga from "./adminConfigSaga";

function* watchAll() {
  yield all([
    adminAuthSaga(),
    adminConfigAuthSaga()
  ]);
}

export default watchAll;
