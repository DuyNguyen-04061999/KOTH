import { REHYDRATE } from "redux-persist";

export const createAgent = (data) => {
  return {
    type: "CREATE_AGENT",
    payload: data
  }
}

export const createAgentSuccess = (data) => {
  return {
    type: "CREATE_AGENT_SUCCESS",
    payload: data
  }
}

export const createAgentFail = (data) => {
  return {
    type: "CREATE_AGENT_FAIL",
    payload: data
  }
}

export const getListEndUser = (data) => {
  return {
    type: "GET_LIST_END_USER",
    payload: data
  }
}

export const getListEndUserSuccess = (data) => {
  return {
    type: "GET_LIST_END_USER_SUCCESS",
    payload: data
  }
}

export const getListEndUserFail = (data) => {
  return {
    type: "GET_LIST_END_USER_FAIL",
    payload: data
  }
}

export const updateAgent = (data) => {
  return {
    type: "UPDATE_AGENT",
    payload: data
  }
}

export const updateAgentSuccess = (data) => {
  return {
    type: "UPDATE_AGENT_SUCCESS",
    payload: data
  }
}

export const updateAgentFail = (data) => {
  return {
    type: "UPDATE_AGENT_FAIL",
    payload: data
  }
}

export const deleteAgent = (data) => {
  return {
    type: "DELETE_AGENT",
    payload: data
  }
}

export const deleteAgentSuccess = (data) => {
  return {
    type: "DELETE_AGENT_SUCCESS",
    payload: data
  }
}

export const deleteAgentFail = (data) => {
  return {
    type: "DELETE_AGENT_FAIL",
    payload: data
  }
}

export const createEndUser = (data) => {
  return {
    type: "CREATE_END_USER",
    payload: data
  }
}

export const createEndUserSuccess = (data) => {
  return {
    type: "CREATE_END_USER_SUCCESS",
    payload: data
  }
}

export const createEndUserFail = (data) => {
  return {
    type: "CREATE_END_USER_FAIL",
    payload: data
  }
}

const adminAgentReducer = (
  state = {
    isCreateEndUser: false,
    isCreateAgent: false,
    newAgent: null,
    newEndUser: null,
    isFetchEndUser: false,
    listEndUser: [],
    isUpdateEndUser: false,
    isDeleteEndUser: false
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
      case REHYDRATE: 
        const { adminAgentReducer } = payload || {}
        const { listEndUser } = adminAgentReducer || {}
        return { ...state, listEndUser: listEndUser || []};
      case "CREATE_AGENT": return {...state, isCreateAgent: true}
      case "CREATE_AGENT_SUCCESS": return {...state, isCreateAgent: false, newAgent: payload}
      case "CREATE_AGENT_FAIL": return {...state, isCreateAgent: false}
      case "GET_LIST_AGENT": return {...state, isFetchEndUser: true}
      case "GET_LIST_AGENT_SUCCESS": return {...state, isFetchEndUser: false, listEndUser: payload?.list || []}
      case "GET_LIST_AGENT_FAIL": return {...state, isFetchEndUser: false}
      case "UPDATE_AGENT": return {...state, isUpdateEndUser: true}
      case "UPDATE_AGENT_SUCCESS": return {...state, isUpdateEndUser: false}
      case "UPDATE_AGENT_FAIL": return {...state, isUpdateEndUser: false}
      case "DELETE_AGENT": return {...state, isDeleteEndUser: true}
      case "DELETE_AGENT_SUCCESS": return {...state, isDeleteEndUser: false}
      case "DELETE_AGENT_FAIL": return {...state, isDeleteEndUser: false}
      case "CREATE_END_USER": return {...state, isCreateEndUser: true}
      case "CREATE_END_USER_SUCCESS": return {...state, isCreateEndUser: false, newEndUser: payload}
      case "CREATE_END_USER_FAIL": return {...state, isCreateEndUser: false}
      default:
        return { ...state };
  }
};

export default adminAgentReducer;
