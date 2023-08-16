import { REHYDRATE } from "redux-persist";

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

export const getListRef = (data) => {
  return {
    type: "GET_LIST_REF",
    payload: data
  }
}

export const getListRefSuccess = (data) => {
  return {
    type: "GET_LIST_REF_SUCCESS",
    payload: data
  }
}

export const getListRefFail = (data) => {
  return {
    type: "GET_LIST_REF_FAIL",
    payload: data
  }
}

const adminSubDistributorReducer = (
  state = {
    isProvideTicket: false,
    listRefs: [],
    isFetchRef: false
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
      case REHYDRATE: 
        const { adminSubDistributorReducer } = payload || {}
        const { listRefs } = adminSubDistributorReducer || {}
        return { ...state, listRefs: listRefs || []};
      case "PROVIDE_TICKET": return {...state, isProvideTicket: true}
      case "PROVIDE_TICKET_SUCCESS": return {...state, isProvideTicket: false}
      case "PROVIDE_TICKET_FAIL": return {...state, isProvideTicket: false}
      case "GET_LIST_REF": return {...state, isFetchRef: true}
      case "GET_LIST_REF_SUCCESS": return {...state, isFetchRef: false, listRefs: payload?.refs}
      case "GET_LIST_REF_FAIL": return {...state, isFetchRef: false}
      default:
        return { ...state };
  }
};

export default adminSubDistributorReducer;
