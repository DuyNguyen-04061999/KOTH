export const setTabHelpCenter = (data) => {
  return {
    type: "SET_TAB_HELPCENTER",
    payload: data,
  };
};

export const getListFAQPromote = (data) => {
  return {
    type: "GET_LIST_FAQ_PROMOTE",
    payload: data,
  };
};
export const getListFAQPromoteSuccess = (data) => {
  return {
    type: "GET_LIST_FAQ_PROMOTE_SUCCESS",
    payload: data,
  };
};

export const getListFAQPromoteFail = (data) => {
  return {
    type: "GET_LIST_FAQ_PROMOTE_FAIL",
    payload: data,
  };
};

const helpcenterReducer = (
  state = {
    tabHelpCenter: 0,
    listFAQPromote: [],
  },
  action
) => {
  let { type, payload } = action;
  switch (type) {
    case "SET_TAB_HELPCENTER": {
      if (payload !== state.tabHelpCenter) {
        return {
          ...state,
          tabHelpCenter: payload,
        };
      }
    }
    case "GET_LIST_FAQ_PROMOTE_SUCCESS": {
      return {
        ...state,
        listFAQPromote: payload,
      };
    }
    default:
      return { ...state };
  }
};

export default helpcenterReducer;
