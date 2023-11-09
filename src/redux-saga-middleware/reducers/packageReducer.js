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

export const saveDataPackage = (data) => {
  return {
    type: "SAVE_DATA_PACKAGE",
    payload: data,
  };
};

export const saveQuantityExtra = (data) => {
  return {
    type: "SAVE_QUANTITY_EXTRA",
    payload: data,
  };
};

export const buyPackage = (data) => {
  return {
    type: "BUY_PACKAGE",
    payload: data,
  };
};

export const buyPackageSuccess = (data) => {
  return {
    type: "BUY_PACKAGE_SUCCESS",
    payload: data,
  };
};

export const buyPackageFail = (data) => {
  return {
    type: "BUY_PACKAGE_FAIL",
    payload: data,
  };
};


export const updateChangeLocation = (data) => {
  return {
    type: "UPDATE_CHANGE_LOCATION",
    payload: data,
  };
};


const packageReducer = (
  state = {
    listPackage: [],
    isFetchListPackage: false,
    dataPackage: [],
    quantityExtra: 0,
    isFecthPackage: false,
    package: [],
    isChangeLocation: false
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
      return { ...state, isFetchListPackage: false, listPackage: payload };
    case "GET_LIST_PACKAGE_FAIL":
      return { ...state, isFetchListPackage: false };
    case "SAVE_DATA_PACKAGE":
      return { ...state, dataPackage: payload };
    case "SAVE_QUANTITY_EXTRA":
      return { ...state, quantityExtra: payload };
    case "BUY_PACKAGE":
      return { ...state, isFecthPackage: true, isChangeLocation: false };
    case "BUY_PACKAGE_SUCCESS":
      return { ...state, isFecthPackage: false, package: payload, isChangeLocation: true };
    case "BUY_PACKAGE_FAIL":
      return { ...state, isFecthPackage: false, isChangeLocation: false };
    case "UPDATE_CHANGE_LOCATION": return {...state, isChangeLocation: false}
    default:
      return { ...state };
  }
};

export default packageReducer;
