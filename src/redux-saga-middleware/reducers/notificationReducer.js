export const getListNotification = (data) => {
  return {
    type: "GET_LIST_NOTIFICATION",
    payload: data,
  };
};

export const getListNotificationSuccess = (data) => {
  return {
    type: "GET_LIST_NOTIFICATION_SUCCESS",
    payload: data,
  };
};
export const addListNotificationSuccess = (data) => {
  return {
    type: "ADD_LIST_NOTIFICATION",
    payload: data,
  };
};
export const updateListNotification = (data) => {
  return {
    type: "UPDATE_LIST_NOTIFICATION",
    payload: data,
  };
};

export const getListNotificationFail = (data) => {
  return {
    type: "GET_LIST_NOTIFICATION_FAIL",
    payload: data,
  };
};

export const acceptFriendRequest = (data) => {
  return {
    type: "ACCEPT_FRIEND_REQUEST",
    payload: data,
  };
};

export const deleteFriendRequest = (data) => {
  return {
    type: "CANCEL_FRIEND_REQUEST",
    payload: data,
  };
};

export const readNotification = (data) => {
  return {
    type: "READ_NOTIFICATION",
    payload: data,
  };
};

export const readNotificationSuccess = (data) => {
  return {
    type: "READ_NOTIFICATION_SUCCESS",
    payload: data,
  };
};

export const readNotificationFail = (data) => {
  return {
    type: "READ_NOTIFICATION_FAIL",
    payload: data,
  };
};

const notificationReducer = (
  state = {
    isFetchListNotification: false,
    listNotifiaction: [],
    isReadNotification: false,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_LIST_NOTIFICATION":
      return { ...state, isFetchListNotification: true };
    case "GET_LIST_NOTIFICATION_SUCCESS":
      return {
        ...state,
        isFetchListNotification: false,
        listNotifiaction: payload || [],
      };
    case "ADD_LIST_NOTIFICATION":
      return {
        ...state,
        listNotifiaction: [payload, ...state.listNotifiaction],
      };
    case "UPDATE_LIST_NOTIFICATION":
      return {
        ...state,
        listNotifiaction: state.listNotifiaction.map((item, index) => {
          if (item.id === payload.id) {
            return payload;
          } else return item;
        }),
      };
    case "GET_LIST_NOTIFICATION_FAIL":
      return { ...state, isFetchListNotification: false };
    case "READ_NOTIFICATION":
      return { ...state };
    case "READ_NOTIFICATION_SUCCESS":
      return { ...state };
    case "READ_NOTIFICATION_FAIL":
      return { ...state };
    default:
      return { ...state };
  }
};

export default notificationReducer;
