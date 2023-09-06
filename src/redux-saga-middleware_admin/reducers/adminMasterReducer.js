import { REHYDRATE } from "redux-persist";

export const createDistributor = (data) => {
  return {
    type: "CREATE_DISTRIBUTOR",
    payload: data
  }
}

export const createDistributorSuccess = (data) => {
  return {
    type: "CREATE_DISTRIBUTOR_SUCCESS",
    payload: data
  }
}

export const createDistributorFail = (data) => {
  return {
    type: "CREATE_DISTRIBUTOR_FAIL",
    payload: data
  }
}


export const getListDistributor = (data) => {
  return {
    type: "GET_LIST_DISTRIBUTOR",
    payload: data
  }
}

export const getListDistributorSuccess = (data) => {
  return {
    type: "GET_LIST_DISTRIBUTOR_SUCCESS",
    payload: data
  }
}

export const getListDistributorFail = (data) => {
  return {
    type: "GET_LIST_DISTRIBUTOR_FAIL",
    payload: data
  }
}

export const getDetailDistributor = (data) => {
  return {
    type: "GET_DETAIL_DISTRIBUTOR",
    payload: data
  }
}

export const getDetailDistributorSuccess = (data) => {
  return {
    type: "GET_DETAIL_DISTRIBUTOR_SUCCESS",
    payload: data
  }
}

export const getDetailDistributorFail = (data) => {
  return {
    type: "GET_DETAIL_DISTRIBUTOR_FAIL",
    payload: data
  }
}

const adminMasterReducer = (
  state = {
    isCreateDistributor: false,
    newDistributor: null,
    isFetchDistributor: false,
    listDistributor: [],
    isFetchDetailDis: false,
    detailDistributor: null
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
      case REHYDRATE: 
        const { adminMasterReducer } = payload || {}
        const { listDistributor } = adminMasterReducer || {}
        return { ...state, listDistributor: listDistributor || []};
      case "CREATE_DISTRIBUTOR": return {...state, isCreateDistributor: true}
      case "CREATE_DISTRIBUTOR_SUCCESS": return {...state, isCreateDistributor: false, newDistributor: payload}
      case "CREATE_DISTRIBUTOR_FAIL": return {...state, isCreateDistributor: false}
      case "GET_LIST_DISTRIBUTOR": return {...state, isFetchDistributor: true}
      case "GET_LIST_DISTRIBUTOR_SUCCESS": return {...state, isFetchDistributor: false, listDistributor: payload?.list || []}
      case "GET_LIST_DISTRIBUTOR_FAIL": return {...state, isFetchDistributor: false}
      case "GET_DETAIL_DISTRIBUTOR": return {...state, isFetchDetailDis: true}
      case "GET_DETAIL_DISTRIBUTOR_SUCCESS": return {...state, isFetchDetailDis: false, detailDistributor: payload?.detail || null}
      case "GET_DETAIL_DISTRIBUTOR_FAIL": return {...state, isFetchDetailDis: false}
      default:
        return { ...state };
  }
};

export default adminMasterReducer;
