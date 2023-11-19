import { REHYDRATE } from "redux-persist";

export const toggleProfileDialog = (data) => {
  return {
    type: "TOGGLE_PROFILE_DIALOG",
    payload: data,
  };
};

export const closeProfileDialog = (data) => {
  return {
    type: "CLOSE_PROFILE_DIALOG",
    payload: data,
  };
};

export const saveDataProfile = (data) => {
  return {
    type: "SAVE_DATA_PROFILE",
    payload: data,
  };
};

export const deleteFriendSuccesFully = (data) => {
  return {
    type: "DELETE_FRIEND_SUCCES_FULLY",
    payload: data,
  };
};

export const resetDelteFriend = () => {
  return {
    type: "RESET_DELETE_FRIEND",
    payload: "",
  };
};

export const profileLogoutSuccessFully = (data) => {
  return {
    type: "PROFILE_LOGOUT_SUCCESS_FULLY",
    payload: data,
  };
};

const profileReducer = (
  state = {
    isProfileDialog: false,
    id: "",
    email: "",
    refCode: "",
    phone: "",
    userNameProfile: "",
    userNickNameProfile: "",
    avatarUrl: "",
    firstName: "",
    lastName: "",
    deleteFriendValue: "",
    nickName: "",
  },
  action
) => {
  let { type, payload } = action;
  switch (type) {
    case REHYDRATE:
      return { ...state };
    case "TOGGLE_PROFILE_DIALOG":
      return { ...state, isProfileDialog: !state.isProfileDialog };
    case "SAVE_DATA_PROFILE":
      return {
        ...state,
        id: payload.id,
        email: payload.email,
        refCode: payload.refCode,
        phone: payload.phone,
        userNameProfile: payload?.userNameProfile,
        userNickNameProfile: payload?.userNickNameProfile,
        avatarUrl: payload.avatarUrl,
        firstName: payload.firstName,
        lastName: payload.lastName,
        nickName: payload.nickName,
      };
    case "DELETE_FRIEND_SUCCES_FULLY":
      return { ...state, deleteFriendValue: payload };
    case "RESET_DELETE_FRIEND":
      return { ...state, deleteFriendValue: payload };
    case "PROFILE_LOGOUT_SUCCESS_FULLY":
      return {
        ...state,
        isProfileDialog: false,
        id: "",
        email: "",
        refCode: "",
        phone: "",
        userNameProfile: "",
        avatarUrl: "",
        firstName: "",
        lastName: "",
        deleteFriendValue: "",
      };
    case "CLOSE_PROFILE_DIALOG":
      return { ...state, isProfileDialog: false };
    default:
      return state;
  }
};

export default profileReducer;
