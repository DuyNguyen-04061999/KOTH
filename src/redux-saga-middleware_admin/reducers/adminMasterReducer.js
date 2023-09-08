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

export const updateDistributor = (data) => {
  return {
    type: "UPDATE_DISTRIBUTOR",
    payload: data
  }
}

export const updateDistributorSuccess = (data) => {
  return {
    type: "UPDATE_DISTRIBUTOR_SUCCESS",
    payload: data
  }
}

export const updateDistributorFail = (data) => {
  return {
    type: "UPDATE_DISTRIBUTOR_FAIL",
    payload: data
  }
}

export const deleteDistributor = (data) => {
  return {
    type: "DELETE_DISTRIBUTOR",
    payload: data
  }
}

export const deleteDistributorSuccess = (data) => {
  return {
    type: "DELETE_DISTRIBUTOR_SUCCESS",
    payload: data
  }
}

export const deleteDistributorFail = (data) => {
  return {
    type: "DELETE_DISTRIBUTOR_FAIL",
    payload: data
  }
}

export const getListTable = (data) => {
  return {
    type: "GET_LIST_TABLE",
    payload: data
  }
}

export const getListTableSuccess = (data) => {
  return {
    type: "GET_LIST_TABLE_SUCCESS",
    payload: data
  }
}

export const getListTableFail = (data) => {
  return {
    type: "GET_LIST_TABLE_FAIL",
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
    detailDistributor: null,
    isUpdateDistributor: false,
    isDeleteDistributor: false,
    isFetchListTable: false,
    listTable: []
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
      case "UPDATE_DISTRIBUTOR": return {...state, isUpdateDistributor: true}
      case "UPDATE_DISTRIBUTOR_SUCCESS": return {...state, isUpdateDistributor: false}
      case "UPDATE_DISTRIBUTOR_FAIL": return {...state, isUpdateDistributor: false}
      case "DELETE_DISTRIBUTOR": return {...state, isDeleteDistributor: true}
      case "DELETE_DISTRIBUTOR_SUCCESS": return {...state, isDeleteDistributor: false}
      case "DELETE_DISTRIBUTOR_FAIL": return {...state, isDeleteDistributor: false}
      case "GET_LIST_TABLE": return {...state, isFetchListTable: true}
      case "GET_LIST_TABLE_SUCCESS": return {...state, isFetchListTable: false, listTable: payload?.list || []}
      case "GET_LIST_TABLE_FAIL": return {...state, isFetchListTable: false}
      default:
        return { ...state };
  }
};

export default adminMasterReducer;
