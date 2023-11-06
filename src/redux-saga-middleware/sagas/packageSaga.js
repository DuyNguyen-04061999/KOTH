import { takeEvery, call, put } from "redux-saga/effects";
import PackageService from "../services/packageService";
import { getListPackageFail, getListPackageSuccess } from "../reducers/packageReducer";

const packageService = new PackageService()

function* getListPackageSaga(dataRequest) {
    try {
        const {payload} = dataRequest;
        const res = yield call(packageService.getListPackage, payload)
        const{ status, data} = res
        if(status === 200 || status === 201) {
            yield put(getListPackageSuccess(data))
        } else {
            yield put(getListPackageFail())
        }
    } catch (error) {
        yield put(getListPackageFail())
    }
}

function* buyPackageSaga(dataRequest) {
    try {
        const {payload} = dataRequest
        const res = yield call(packageService.buyPackage, payload)
        const {status, data} = res
        if(status === 200 || status === 201) {
            yield put()
        } else {
            yield put()
        }
    } catch (error) {
        yield put()
    }
}

 function* packageSaga() {
    yield takeEvery("GET_LIST_PACKAGE", getListPackageSaga)
    yield takeEvery("GET_PACKAGE", buyPackageSaga)
 }

 export default packageSaga