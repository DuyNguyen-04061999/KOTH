import { REHYDRATE } from "redux-persist";
export const callListSendingRequest = () => {
  return {
    type: "CALL_LIST_SENDING_REQUEST",
  };
};

export const getListSendingRequest = (data) => {
  return {
    type: "GET_LIST_SENDING",
    payload: data,
  };
};

export const cancelRequestingFriend = (data) => {
  return {
    type: "CALL_CANCEL_SENDING_REQUEST",
    payload: data,
  };
};
export const cancelRequestReady = (data) => {
  return {
    type: "CANCEL_REUQEST_READY",
  };
};
export const cancelRequestSuccess = (data) => {
  return {
    type: "CANCEL_REUQEST_SUCCESS",
    payload: data,
  };
};
export const cancelRequestFail = (data) => {
  return {
    type: "CANCEL_REUQEST_FAIL",
  };
};
const addFriendReducer = (
  state = {
    listSendingRequest: [],
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_LIST_SENDING":
      return {
        ...state,
        listSendingRequest: payload,
      };
    case "CANCEL_REUQEST_READY":
      return {
        ...state,
        cancelRequestReady: true,
        cancelRequestSuccess: false,
        cancelRequestFail: false,
      };
    case "CANCEL_REUQEST_SUCCESS":
      return {
        ...state,
        cancelRequestReady: false,
        cancelRequestSuccess: true,
        cancelRequestFail: false,
        listSendingRequest: state.listSendingRequest.filter((item) => {
          return item.userName !== payload;
        }),
      };
    case "CANCEL_REUQEST_FAIL":
      return {
        ...state,
        cancelRequestReady: false,
        cancelRequestSuccess: false,
        cancelRequestFail: true,
      };
    default:
      return { ...state };
  }
};

export default addFriendReducer;
