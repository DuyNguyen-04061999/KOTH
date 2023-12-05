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

export const editProfile = (data) => {
  return {
    type: "EDIT_PROFILE",
    payload: data,
  };
};

export const exitEditProfile = (data) => {
  return {
    type: "EXIT_EDIT_PROFILE",
    payload: data,
  };
};

export const removeNickNameWhenLogout = (data) => {
  return {
    type: "REMOVE_NICKNAME_WHEN_LOGOUT",
    payload: data,
  };
};

export const saveNickNameWhenLogin = (data) => {
  return {
    type: "SAVE_NICKNAME_WHEN_LOGIN",
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
    displayName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode:"",
    birthDay:"",
    isEditProfile: false,
    nickNameLogin: ""
  },
  action
) => {
  let { type, payload } = action;
  switch (type) {
    case REHYDRATE:
      {
        const { profileReducer } = payload || {}
        const { nickNameLogin } = profileReducer || ""
        return {...state, nickNameLogin: nickNameLogin || ""}
      }
    case "SAVE_NICKNAME_WHEN_LOGIN": return {...state, nickNameLogin: payload || ""}
    case "REMOVE_NICKNAME_WHEN_LOGOUT": return {...state, nickNameLogin: "" }
    case "TOGGLE_PROFILE_DIALOG":
      return { ...state, isProfileDialog: !state.isProfileDialog };
    case "EDIT_PROFILE":
      return { ...state, isEditProfile: true };
    case "EXIT_EDIT_PROFILE":
      return { ...state, isEditProfile: false };
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
        displayName:payload.displayName,
        address1:payload.address1,
        address2:payload.address2,
        city:payload.city,
        state:payload.state,
        zipCode:payload.zipCode,
        birthDay:payload.birthDay,
        nickNameLogin: payload.nickName || ""
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
        nickNameLogin: ""
      };
    case "CLOSE_PROFILE_DIALOG":
      return { ...state, isProfileDialog: false };
    default:
      return state;
  }
};

export default profileReducer;
