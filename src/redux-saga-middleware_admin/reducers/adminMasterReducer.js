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

const adminMasterReducer = (
  state = {
    isCreateDistributor: false,
    newDistributor: null
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
      case REHYDRATE: 
        // const { adminMasterReducer } = payload || {}
        // const { listRole } = adminMasterReducer || {}
        return { ...state};
      case "CREATE_DISTRIBUTOR": return {...state, isCreateDistributor: true}
      case "CREATE_DISTRIBUTOR_SUCCESS": return {...state, isCreateDistributor: false, newDistributor: payload}
      case "CREATE_DISTRIBUTOR_FAIL": return {...state, isCreateDistributor: false}
      default:
        return { ...state };
  }
};

export default adminMasterReducer;
