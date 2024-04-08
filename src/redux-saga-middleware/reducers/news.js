import { updatePopupClose } from "../../utils/referral";
import { REHYDRATE } from "redux-persist";



export const getListNews = (data) => {
  return {
    type: "GET_LIST_NEWS",
    payload: data
  };
};

export const getListNewsSuccess = (data) => {
    return {
      type: "GET_LIST_NEWS_SUCCESS",
      payload: data
    };
  };

  export const getListNewsFail = (data) => {
    return {
      type: "GET_LIST_NEWS_FAIL",
      payload: data
    };
  };

  export const getListNewsDetail = (data) => {
    return {
        type: "GET_LIST_NEWS_DETAIL",
        payload: data
    }
  }

  export const getListNewsDetailSuccess = (data) => {
    return {
        type: "GET_LIST_NEWS_DETAIL_SUCCESS",
        payload: data
    }
  }

  export const getListNewsDetailFail = (data) => {
    return {
        type: "GET_LIST_NEWS_DETAIL_FAIL",
        payload: data
    }
  }

  export const saveIdNews = (data) => {
    return {
        type: "SAVE_ID_NEWS",
        payload: data
    }
  }

  export const clearIdNews = (data) => {
    return {
        type: "CLEAR_ID_NEWS",
        payload: data
    }
  }

  export const clickTabNews = (data) => {
    return {
      type: "CLICK_TAB_NEWS",
      payload: data
    }
  }

const newsReducer = (
  state = {
    isFetchListNews: false,
    listNews: [],
    total:0,
    isNewsDetail: false,
    listNewDetail: {},
    idDetail:0,
    currentTab:"news"
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case REHYDRATE:
      return { ...state };
    case "GET_LIST_NEWS": {
      return {
        ...state,
        isFetchListNews: true
      };
    }
    case "GET_LIST_NEWS_SUCCESS" : {
        return {
            ...state,
            isFetchListNews: false,
            listNews: payload?.rows,
            total: payload?.count
        }
    }
    case  "GET_LIST_NEWS_FAIL" : {
        return {
            ...state,
            isFetchListNews: false
        }
    }
    case "GET_LIST_NEWS_DETAIL" : {
        return {
            ...state,
            isNewsDetail: true
        }
    }
    case  "GET_LIST_NEWS_DETAIL_SUCCESS" : {
        return {
            ...state,
            isNewsDetail: false,
            listNewDetail: payload
        }
    }
    case  "GET_LIST_NEWS_DETAIL_FAIL" : {
        return {
            ...state,
            isNewsDetail: false,
        }
    }
    case "SAVE_ID_NEWS" : {
        return {
            ...state,
            idDetail: payload?.id
        }
    }
    case "CLICK_TAB_NEWS" : {
      return {
        ...state,
        currentTab: payload?.type
      }
    }
    default:
      return { ...state };
  }
};
export default newsReducer;
