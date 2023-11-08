import { REHYDRATE } from "redux-persist";

export const showAlert = (type, message) => {
  return {
    type: "SHOW_ALERT",
    payload: {
      type: type,
      message: message,
    },
  };
};

export const hideAlert = () => {
  return {
    type: "HIDE_ALERT",
    payload: [],
  };
};

export const showToastNotification = (data) => {
  return {
    type: "SHOW_TOAST_NOTIFICATION",
    payload: data
  }
}

export const hideToastNotification = (data) => {
  return {
    type: "HIDE_TOAST_NOTIFICATION",
    payload: data
  }
}

const alertReducer = (
  state = {
    isShow: false,
    message: "Alert System",
    type: "success",
    isShowToastNotification: false,
    messageToastNotifiaction: "",
    typeToastNotification: ""
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case REHYDRATE:
      return { ...state };
    case "SHOW_ALERT":
      return {
        ...state,
        isShow: true,
        message: payload.message,
        type: payload.type,
      };
    case "HIDE_ALERT":
      return {
        ...state,
        isShow: false,
        message: "Alert System",
        type: "success",
      };
      case  "SHOW_TOAST_NOTIFICATION": return{...state, isShowToastNotification: true, messageToastNotification: payload?.message || "", typeToastNotification: payload?.type || ""}
      case  "HIDE_TOAST_NOTIFICATION": return{...state, isShowToastNotification: false, messageToastNotification: "", typeToastNotification: ""}
    default:
      return { ...state };
  }
};

export default alertReducer;
