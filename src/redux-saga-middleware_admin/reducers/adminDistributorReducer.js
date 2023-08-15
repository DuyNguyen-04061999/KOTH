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

const adminDistributorReducer = (
  state = {
    isCreateSubDistributor: false,
    newSubDistributor: null
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
      case REHYDRATE: 
        // const { adminDistributorReducer } = payload || {}
        // const { listRole } = adminDistributorReducer || {}
        return { ...state};
      case "CREATE_SUB_DISTRIBUTOR": return {...state, isCreateSubDistributor: true}
      case "CREATE_SUB_DISTRIBUTOR_SUCCESS": return {...state, isCreateSubDistributor: false, newSubDistributor: payload}
      case "CREATE_SUB_DISTRIBUTOR_FAIL": return {...state, isCreateSubDistributor: false}
      default:
        return { ...state };
  }
};

export default adminDistributorReducer;
