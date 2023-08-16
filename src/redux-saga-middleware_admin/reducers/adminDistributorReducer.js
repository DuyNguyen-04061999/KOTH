import { REHYDRATE } from "redux-persist";

export const createSubDistributor = (data) => {
  return {
    type: "CREATE_SUB_DISTRIBUTOR",
    payload: data
  }
}

export const createSubDistributorSuccess = (data) => {
  return {
    type: "CREATE_SUB_DISTRIBUTOR_SUCCESS",
    payload: data
  }
}

export const createSubDistributorFail = (data) => {
  return {
    type: "CREATE_SUB_DISTRIBUTOR_FAIL",
    payload: data
  }
}

export const getListSub = (data) => {
  return {
    type: "GET_LIST_SUB",
    payload: data
  }
}

export const getListSubSuccess = (data) => {
  return {
    type: "GET_LIST_SUB_SUCCESS",
    payload: data
  }
}

export const getListSubFail = (data) => {
  return {
    type: "GET_LIST_SUB_FAIL",
    payload: data
  }
}

const adminDistributorReducer = (
  state = {
    isCreateSubDistributor: false,
    newSubDistributor: null,
    isFetchSub: false,
    listSub: []
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
      case REHYDRATE: 
        const { adminDistributorReducer } = payload || {}
        const { listSub } = adminDistributorReducer || {}
        return { ...state, listSub: listSub || []};
      case "CREATE_SUB_DISTRIBUTOR": return {...state, isCreateSubDistributor: true}
      case "CREATE_SUB_DISTRIBUTOR_SUCCESS": return {...state, isCreateSubDistributor: false, newSubDistributor: payload}
      case "CREATE_SUB_DISTRIBUTOR_FAIL": return {...state, isCreateSubDistributor: false}
      case "GET_LIST_SUB": return {...state, isFetchSub: true}
      case "GET_LIST_SUB_SUCCESS": return {...state, isFetchSub: false, listSub: payload?.list || []}
      case "GET_LIST_SUB_FAIL": return {...state, isFetchSub: false}
      default:
        return { ...state };
  }
};

export default adminDistributorReducer;
