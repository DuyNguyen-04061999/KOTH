import { takeEvery, call, put } from "redux-saga/effects";
import PackageService from "../services/packageService";
import { buyPackageFail, buyPackageSuccess, getListPackageFail, getListPackageSuccess } from "../reducers/packageReducer";

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
        console.log(res);
        if(status === 200 || status === 201) {
            yield put(buyPackageSuccess(data))
        } else {
            yield put(buyPackageFail())
        }
    } catch (error) {
        yield put(buyPackageFail())
    }
}

 function* packageSaga() {
    yield takeEvery("GET_LIST_PACKAGE", getListPackageSaga)
    yield takeEvery("BUY_PACKAGE", buyPackageSaga)
 }

 export default packageSaga