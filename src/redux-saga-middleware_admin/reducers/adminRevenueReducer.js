import { REHYDRATE } from "redux-persist";

export const getTotal = (data) => {
  return {
    type: "GET_TOTAL",
    payload: data,
  };
};

export const getTotalSuccess = (data) => {
  return {
    type: "GET_TOTAL_SUCCESS",
    payload: data,
  };
};

export const getTotalFail = (data) => {
  return {
    type: "GET_TOTAL_FAIL",
    payload: data,
  };
};

const adminRevenueReducer = (
  state = {
    isFetchTotal: false,
    listTotal: [],
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case REHYDRATE:
      const { adminRevenueReducer } = payload || {};
      const { listTotal } = adminRevenueReducer || {};
      return { ...state, listTotal: listTotal || [] };
    case "GET_TOTAL":
      return { ...state, isFetchTotal: true };
    case "GET_TOTAL_SUCCESS":
      return { ...state, isFetchTotal: false, listTotal: payload?.data || [] };
    case "GET_TOTAL_FAIL":
      return { ...state, isFetchTotal: false };
    default:
      return { ...state };
  }
};

export default adminRevenueReducer;
