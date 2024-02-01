import { REHYDRATE } from "redux-persist";

export const toggleAlertStripeProcess = (data) => {
  return {
    type: "TOGGLE_ALERT_STRIPE_PROCESS",
    payload: data,
  };
};

const stripeReducer = (
  state = {
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
