import { REHYDRATE } from "redux-persist";

const INTTIAL_STATE = {
  rooms: [],
  roomNav: true,
};

export const getListRoom = (data) => {
  return {
    type: "GET_LIST_ROOM",
    payload: data,
  };
};
export const setSelectNav = (data) => {
  return {
    type: "NAV_SELECT_ROOM",
  };
};
export const setWaitingNav = (data) => {
  return {
    type: "NAV_WAITING_ROOM",
  };
};

const roomReducer = (state = INTTIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case REHYDRATE:
      return { ...state };
    case "GET_LIST_ROOM":
      return { ...state, rooms: payload };
    case "NAV_SELECT_ROOM":
      return { ...state, roomNav: true };
    case "NAV_WAITING_ROOM":
      return { ...state, roomNav: false };
    default:
      return { ...state };
  }
};

export default roomReducer;
