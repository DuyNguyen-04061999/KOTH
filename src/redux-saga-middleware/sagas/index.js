import  { all } from 'redux-saga/effects';
import gameSaga from './gameSaga';
import appSaga from './appSaga';

function* watchAll() {
    yield all([
        gameSaga(),
        appSaga()
    ]);
}

export default watchAll;