import { all } from "redux-saga/effects";
import gameSaga from "./gameSaga";
import appSaga from "./appSaga";
import tournamentSaga from "./tournamentSaga";
import stripeSaga from "./stripeSaga";
import helpcenterSaga from "./helpcenterSaga";

function* watchAll() {
  yield all([gameSaga(), appSaga(), tournamentSaga(), stripeSaga(), helpcenterSaga()]);
}

export default watchAll;
