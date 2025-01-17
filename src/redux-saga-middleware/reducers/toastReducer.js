import { REHYDRATE } from "redux-persist";

export const showToast = (type, message) => {
  return {
    type: "SHOW_TOAST",
    payload: {
      type: type,
      message: message,
    },
  };
};

export const hideToast = () => {
  return {
    type: "HIDE_TOAST",
  };
};

const toastReducer = (
  state = {
    isShowToast: false,
    messageToast: "",
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case REHYDRATE:
      return { ...state };
    case "SHOW_TOAST":
      return {
        ...state,
        messageToast: payload.type,
      };
    case "HIDE_TOAST":
      return {
        ...state,
        isShowToast: false,
      };
    default:
      return { ...state };
  }
};

export default toastReducer;
