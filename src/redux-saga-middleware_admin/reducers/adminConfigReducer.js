import { REHYDRATE } from "redux-persist";

export const getConfigs = (data) => {
  return {
    type: "GET_CONFIG",
    payload: data
  }
}

export const getConfigsSuccess = (data) => {
  return {
    type: "GET_CONFIG_SUCCESS",
    payload: data
  }
}

export const getConfigsFail = (data) => {
  return {
    type: "GET_CONFIG_FAIL",
    payload: data
  }
}

const adminConfigReducer = (
  state = {
    isFetchConfig: false,
    listRole: [],
    listPermission: []
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
      case REHYDRATE: 
        const { adminConfigReducer } = payload || {}
        const { listRole } = adminConfigReducer || {}
        return { ...state, listRole: listRole || [] };
      case "GET_CONFIG": return {...state, isFetchConfig: true}
      case "GET_CONFIG_SUCCESS": return {...state, isFetchConfig: false, listRole: payload?.roles, listPermission: payload?.pers}
      case "GET_CONFIG_FAIL": return {...state, isFetchConfig: false}
      default:
        return { ...state };
  }
};

export default adminConfigReducer;
