import { call, put, takeEvery } from "redux-saga/effects";
import {
  getTransactionFail,
  getTransactionSuccess,
} from "../reducers/userReducer";
import transactionService from "../services/transactionService";
const TransactionService = new transactionService();

function* getTransactionReadySaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(TransactionService.callTransactionHistory, payload);
    yield put(getTransactionSuccess(res?.data));
  } catch (error) {
    yield put(getTransactionFail());
    console.log(error);
  }
}
function* transactionSaga() {
  yield takeEvery("GET_TRANSACTION_READY", getTransactionReadySaga);
}

export default transactionSaga;
