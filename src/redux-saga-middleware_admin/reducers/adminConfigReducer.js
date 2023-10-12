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

export const getListTicket = (data) => {
  return {
    type: "GET_LIST_TICKET",
    payload: data
  }
}

export const getListTicketSuccess = (data) => {
  return {
    type: "GET_LIST_TICKET_SUCCESS",
    payload: data
  }
}

export const getListTicketFail = (data) => {
  return {
    type: "GET_LIST_TICKET_FAIL",
    payload: data
  }
}

export const provideTicket = (data) => {
  return {
    type: "PROVIDE_TICKET",
    payload: data
  }
}

export const provideTicketSuccess = (data) => {
  return {
    type: "PROVIDE_TICKET_SUCCESS",
    payload: data
  }
}

export const provideTicketFail = (data) => {
  return {
    type: "PROVIDE_TICKET_FAIL",
    payload: data
  }
}

export const activeAccount = (data) => {
  return {
    type: "ACTIVE_ACCOUNT",
    payload: data
  }
}

export const activeAccountSuccess = (data) => {
  return {
    type: "ACTIVE_ACCOUNT_SUCCESS",
    payload: data
  }
}

export const activeAccountFail = (data) => {
  return {
    type: "ACTIVE_ACCOUNT_FAIL",
    payload: data
  }
}

export const deleteAccount = (data) => {
  return {
    type: "DELETE_ACCOUNT",
    payload: data
  }
}

export const deleteAccountSuccess = (data) => {
  return {
    type: "DELETE_ACCOUNT_SUCCESS",
    payload: data
  }
}

export const deleteAccountFail = (data) => {
  return {
    type: "DELETE_ACCOUNT_FAIL",
    payload: data
  }
}

export const updateAccount = (data) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: data
  }
}

export const updateAccountSuccess = (data) => {
  return {
    type: "UPDATE_ACCOUNT_SUCCESS",
    payload: data
  }
}

export const updateAccountFail = (data) => {
  return {
    type: "UPDATE_ACCOUNT_FAIL",
    payload: data
  }
}

const adminConfigReducer = (
  state = {
    isFetchConfig: false,
    listRole: [],
    listPermission: [],
    listTicket: [],
    isFetchTicket: false,
    isProvideTicket: false,
    isActiveAccount: false,
    isDeleteAccount: false,
    isUpdateAccount: false
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
      case REHYDRATE: 
        const { adminConfigReducer } = payload || {}
        const { listRole, listTicket } = adminConfigReducer || {}
        return { ...state, listRole: listRole || [], listTicket: listTicket || [] };
      case "GET_CONFIG": return {...state, isFetchConfig: true}
      case "GET_CONFIG_SUCCESS": return {...state, isFetchConfig: false, listRole: payload?.roles, listPermission: payload?.pers}
      case "GET_CONFIG_FAIL": return {...state, isFetchConfig: false}
      case "GET_LIST_TICKET": return {...state, isFetchTicket: true}
      case "GET_LIST_TICKET_SUCCESS": return {...state, isFetchTicket: false, listTicket: payload?.list || []}
      case "GET_LIST_TICKET_FAIL": return {...state, isFetchTicket: false}
      case "PROVIDE_TICKET": return {...state, isProvideTicket: true}
      case "PROVIDE_TICKET_SUCCESS": return {...state, isProvideTicket: false}
      case "PROVIDE_TICKET_FAIL": return {...state, isProvideTicket: false}
      case "ACTIVE_ACCOUNT": return {...state, isActiveAccount: true}
      case "ACTIVE_ACCOUNT_SUCCESS": return {...state, isActiveAccount: false}
      case "ACTIVE_ACCOUNT_FAIL": return {...state, isActiveAccount: false}
      case "DELETE_ACCOUNT": return {...state, isDeleteAccount: true}
      case "DELETE_ACCOUNT_SUCCESS": return {...state, isDeleteAccount: false}
      case "DELETE_ACCOUNT_FAIL": return {...state, isDeleteAccount: false}
      case "UPDATE_ACCOUNT": return {...state, isUpdateAccount: true }
      case "UPDATE_ACCOUNT_SUCCESS": return {...state, isUpdateAccount: false }
      case "UPDATE_ACCOUNT_FAIL": return {...state, isUpdateAccount: false }
      default:
        return { ...state };
  }
};

export default adminConfigReducer;
