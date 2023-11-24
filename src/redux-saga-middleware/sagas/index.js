import { all } from "redux-saga/effects";
import appSaga from "./appSaga";
import gameSaga from "./gameSaga";
import helpcenterSaga from "./helpcenterSaga";
import packageSaga from "./packageSaga";
import promotionSaga from "./promotionSaga";
import refreshSaga from "./refreshSaga";
import settingSaga from "./settingSaga";
import stripeSaga from "./stripeSaga";
import tournamentSaga from "./tournamentSaga";
import { default as authSaga, default as userSaga } from "./userSaga";
import checkoutSaga from "./checkoutSaga";

function* watchAll() {
  yield all([
    gameSaga(),
    appSaga(),
    tournamentSaga(),
    stripeSaga(),
    helpcenterSaga(),
    promotionSaga(),
    userSaga(),
    authSaga(),
    packageSaga(),
    settingSaga(),
    refreshSaga(),
    checkoutSaga()
  ]);
}

export default watchAll;
