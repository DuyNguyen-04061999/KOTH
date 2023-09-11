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

export const getListAgent = (data) => {
  return {
    type: "GET_LIST_AGENT",
    payload: data
  }
}

export const getListAgentSuccess = (data) => {
  return {
    type: "GET_LIST_AGENT_SUCCESS",
    payload: data
  }
}

export const getListAgentFail = (data) => {
  return {
    type: "GET_LIST_AGENT_FAIL",
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

const adminAgentReducer = (
  state = {
    isCreateAgent: false,
    newAgent: null,
    isFetchAgent: false,
    listAgent: [],
    isUpdateAgent: false,
    isDeleteAgent: false
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
      case REHYDRATE: 
        const { adminAgentReducer } = payload || {}
        const { listAgent } = adminAgentReducer || {}
        return { ...state, listAgent: listAgent || []};
      case "CREATE_AGENT": return {...state, isCreateAgent: true}
      case "CREATE_AGENT_SUCCESS": return {...state, isCreateAgent: false, newAgent: payload}
      case "CREATE_AGENT_FAIL": return {...state, isCreateAgent: false}
      case "GET_LIST_AGENT": return {...state, isFetchAgent: true}
      case "GET_LIST_AGENT_SUCCESS": return {...state, isFetchAgent: false, listAgent: payload?.list || []}
      case "GET_LIST_AGENT_FAIL": return {...state, isFetchAgent: false}
      case "UPDATE_AGENT": return {...state, isUpdateAgent: true}
      case "UPDATE_AGENT_SUCCESS": return {...state, isUpdateAgent: false}
      case "UPDATE_AGENT_FAIL": return {...state, isUpdateAgent: false}
      case "DELETE_AGENT": return {...state, isDeleteAgent: true}
      case "DELETE_AGENT_SUCCESS": return {...state, isDeleteAgent: false}
      case "DELETE_AGENT_FAIL": return {...state, isDeleteAgent: false}
      default:
        return { ...state };
  }
};

export default adminAgentReducer;
