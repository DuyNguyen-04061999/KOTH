import { REHYDRATE } from "redux-persist";

export const getSettingReady = (data) => {
  return {
    type: "GET_SETTING_READY",
    payload: data,
  };
};

export const getSettingSuccess = (data) => {
  return {
    type: "GET_SETTING_SUCCESS",
    payload: data,
  };
};

export const getSettingFail = (data) => {
  return {
    type: "GET_SETTING_FAIL",
    payload: data,
  };
};

export const changeCurrentLanguage = (data) => {
  return {
    type: "CHANGE_CURRENT_LANGUAGE",
    payload: data,
  };
};

const settingReducer = (
  state = {
    isGetSetting: false,
    listSetting: {},
    systemLanguage: "en",
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case REHYDRATE: {
      const { settingReducer } = payload || {};
      const { systemLanguage } = settingReducer || "";
      return { ...state, systemLanguage: systemLanguage };
    }
    case "GET_SETTING_READY":
      return {
        ...state,
        isGetSetting: true,
      };
    case "GET_SETTING_SUCCESS":
      return {
        ...state,
        isGetSetting: false,
        listSetting: payload,
      };
    case "GET_SETTING_FAIL":
      return {
        ...state,
        isGetSetting: false,
        listSetting: {},
      };
    case "CHANGE_CURRENT_LANGUAGE":
      return {
        ...state,
        systemLanguage: payload,
      };
    default:
      return { ...state };
  }
};

export default settingReducer;
