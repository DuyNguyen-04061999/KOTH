import { REHYDRATE } from "redux-persist";

export const getListPackage = (data) => {
  return {
    type: "GET_LIST_PACKAGE",
    payload: data,
  };
};

export const getListPackageSuccess = (data) => {
  return {
    type: "GET_LIST_PACKAGE_SUCCESS",
    payload: data,
  };
};

export const getListPackageFail = (data) => {
  return {
    type: "GET_LIST_PACKAGE_FAIL",
    payload: data,
  };
};

const packageReducer = (
  state = {
    listPackage: [],
    isFetchListPackage: false,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case REHYDRATE:
      return { ...state };
    case "GET_LIST_PACKAGE":
      return { ...state, isFetchListPackage: true };
    case "GET_LIST_PACKAGE_SUCCESS":
      return { ...state, isFetchListPackage: false, listPackage:payload };
    case "GET_LIST_PACKAGE_FAIL":
      return { ...state, isFetchListPackage: false };
    default:
      return { ...state };
  }
};

export default packageReducer;
