import { all } from "redux-saga/effects";
import appSaga from "./appSaga";
import authSaga from "./authSaga";
import gameSaga from "./gameSaga";
import helpcenterSaga from "./helpcenterSaga";
import promotionSaga from "./promotionSaga";
import stripeSaga from "./stripeSaga";
import tournamentSaga from "./tournamentSaga";

function* watchAll() {
  yield all([
    gameSaga(),
    appSaga(),
    tournamentSaga(),
    stripeSaga(),
    helpcenterSaga(),
    promotionSaga(),
    authSaga()
  ]);
}

export default watchAll;
