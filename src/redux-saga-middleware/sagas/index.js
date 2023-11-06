import { all } from "redux-saga/effects";
import appSaga from "./appSaga";
import gameSaga from "./gameSaga";
import helpcenterSaga from "./helpcenterSaga";
import promotionSaga from "./promotionSaga";
import stripeSaga from "./stripeSaga";
import tournamentSaga from "./tournamentSaga";
import userSaga from "./userSaga";

function* watchAll() {
  yield all([
    gameSaga(),
    appSaga(),
    tournamentSaga(),
    stripeSaga(),
    helpcenterSaga(),
    promotionSaga(),
    userSaga()
  ]);
}

export default watchAll;
