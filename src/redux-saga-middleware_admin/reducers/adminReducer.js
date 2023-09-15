import { REHYDRATE } from "redux-persist";

export const admin_ = (data) => {
  return {
    type: "ADMIN_",
    payload: data
  };
};

export const updateDetailAccount = (data) => {
  return {
    type: "UPDATE_DETAIL_ACCOUNT",
    payload: data
  }
}

const adminReducer_ = (
  state = {
    detailAccount: null,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case REHYDRATE:
      return { ...state };
    case "UPDATE_DETAIL_ACCOUNT": return {...state, detailAccount: payload || null}
    default:
      return { ...state };
  }
};

export default adminReducer_;
