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

export const updateDetailAccountAfterChangeStatus = (data) => {
  return {
    type: "UPDATE_DETAIL_ACCOUNT_AFTER_CHANGE_STATUS",
    payload: data
  }
}

export const updateDetailAccountAfterChangeNickname = (data) => {
  return {
    type: "UPDATE_DETAIL_ACCOUNT_AFTER_CHANGE_NICK_NAME",
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
    case "UPDATE_DETAIL_ACCOUNT_AFTER_CHANGE_STATUS": return {...state, detailAccount: {...state.detailAccount, status: payload || 0} || null}
    case "UPDATE_DETAIL_ACCOUNT_AFTER_CHANGE_NICK_NAME": return {...state, detailAccount: {...state.detailAccount, nickName: payload || ""} || null}
    default:
      return { ...state };
  }
};

export default adminReducer_;
