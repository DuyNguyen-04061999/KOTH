import { call, put, takeEvery } from "redux-saga/effects";
import { showToastNotification } from "../reducers/alertReducer";
import { buyPackageFail, buyPackageSuccess, getListPackageFail, getListPackageSuccess } from "../reducers/packageReducer";
import { updateCountTicket, updateGoldAfterBuyPackage } from "../reducers/userReducer";
import PackageService from "../services/packageService";

const packageService = new PackageService()

function* getListPackageSaga(dataRequest) {
    try {
        const {payload} = dataRequest;
        const res = yield call(packageService.getListPackage, payload)
        const{ status, data} = res
        
        if(status === 200 || status === 201) {
            yield put(getListPackageSuccess(data?.data?.list || []))
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
            yield put(buyPackageSuccess(data))
            yield put(updateGoldAfterBuyPackage(data?.data?.gold || data?.data?.goldLeft || 0))
            yield put(updateCountTicket(data?.data?.quantity || 0))
            yield put(
                showToastNotification({
                  type: "success",
                  message: "Buy package successfully!",
                })
              );
        } else {
            yield put(buyPackageFail())
        }
    } catch (error) {
        yield put(buyPackageFail())
        yield put(
            showToastNotification({
              type: "error",
              message: error?.message,
            })
          );
    }
}

 function* packageSaga() {
    yield takeEvery("GET_LIST_PACKAGE", getListPackageSaga)
    yield takeEvery("BUY_PACKAGE", buyPackageSaga)
 }

 export default packageSaga