import { REHYDRATE } from "redux-persist";

export const getStripe = (data) => {
  return {
    type: "GET_STRIPE",
    payload: data,
  };
};

export const getStripeSuccess = (data) => {
  return {
    type: "GET_STRIPE_SUCCESS",
    payload: data,
  };
};

export const getStripeFail = (data) => {
  return {
    type: "GET_STRIPE_FAIL",
    payload: data,
  };
};

export const getStripeURL = (data) => {
  return {
    type: "GET_STRIPE_URL",
    payload: data,
  };
};

export const toggleAlertStripeProcess = (data) => {
  return {
    type: "TOGGLE_ALERT_STRIPE_PROCESS",
    payload: data,
  };
};

const stripeReducer = (
  state = {
    isStripe: [],
    isFetchStripe: false,
    stripeURL: "",
    isAlertDialog: false,
    typeAlert: "success",
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case REHYDRATE:
      return { ...state };
    case "GET_STRIPE":
      return { ...state, isFetchStripe: true };
    case "GET_STRIPE_SUCCESS":
      return {
        ...state,
        isFetchStripe: false,
        stripeURL: payload?.paymentLink,
      };
    case "GET_STRIPE_FAIL":
      return { ...state, isFetchStripe: false };
    case "GET_STRIPE_URL":
      return { ...state };
    case "TOGGLE_ALERT_STRIPE_PROCESS":
      return {
        ...state,
        typeAlert: payload?.type,
        isAlertDialog: !state.isAlertDialog,
      };
    default:
      return { ...state };
  }
};

export default stripeReducer;
