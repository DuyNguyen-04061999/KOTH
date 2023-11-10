import { call, put, takeEvery } from "redux-saga/effects";
import { showToastNotification } from "../reducers/alertReducer";
import { buyPackageFail, buyPackageSuccess, getListPackageFail, getListPackageSuccess } from "../reducers/packageReducer";
import { getUserInfoReady, updateCountTicket, updateGoldAfterBuyPackage } from "../reducers/userReducer";
import PackageService from "../services/packageService";

const packageService = new PackageService()

let getListPackageCount = 0
function* getListPackageSaga(dataRequest) {
    try {
        getListPackageCount += 1
        if(getListPackageCount === 1) {
            const {payload} = dataRequest;
            const res = yield call(packageService.getListPackage, payload)
            const{ status, data} = res
            
            if(status === 200 || status === 201) {
                yield put(getListPackageSuccess(data?.data?.list || []))
            } else {
                yield put(getListPackageFail())
            }
        }
        getListPackageCount = 0
    } catch (error) {
        getListPackageCount = 0
        yield put(getListPackageFail())
    }
}

let buyPackageCount = 0
function* buyPackageSaga(dataRequest) {
    try {
        buyPackageCount += 1
        if(buyPackageCount === 1) {
            const {payload} = dataRequest
            const res = yield call(packageService.buyPackage, payload)
            const {status, data} = res
            if(status === 200 || status === 201) {
                yield put(buyPackageSuccess(data))
                yield put(updateGoldAfterBuyPackage(data?.data?.gold || data?.data?.goldLeft || 0))
                yield put(updateCountTicket(data?.data?.quantity || 0))
                if(!data?.data?.quantity) {
                    yield put(getUserInfoReady(localStorage.getItem("token")))
                }
                yield put(
                    showToastNotification({
                      type: "success",
                      message: "Buy package successfully!",
                    })
                  );
            } else {
                yield put(buyPackageFail())
                yield put(
                    showToastNotification({
                      type: "error",
                      message: "Buy package failed! Something went wrong",
                    })
                  );
            }
        }
        buyPackageCount = 0
    } catch (error) {
        buyPackageCount = 0
        yield put(buyPackageFail())
        yield put(
            showToastNotification({
              type: error?.type || "error",
              message: error?.message || "Buy package failed! Something went wrong",
            })
          );
    }
}

 function* packageSaga() {
    yield takeEvery("GET_LIST_PACKAGE", getListPackageSaga)
    yield takeEvery("BUY_PACKAGE", buyPackageSaga)
 }

 export default packageSaga