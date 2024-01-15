export const getListComment = (data) => {
  return {
    type: "GET_LIST_COMMENT_IN_PROMOTION",
    payload: data,
  };
};

export const addCommentPromotion = (data) => {
  return {
    type: "ADD_COMMENT_IN_PROMOTION",
    payload: data,
  };
};
export const updateListComment = (data) => {
  return {
    type: "UPDATE_LIST_COMMENT",
    payload: data,
  };
};
export const readySendComment = (data) => {
  return {
    type: "READY_SEND_COMMENT",
    payload: data,
  };
};
export const successSendComment = (data) => {
  return {
    type: "SUCCESS_SEND_COMMENT",
    payload: data,
  };
};
export const failSendComment = (data) => {
  return {
    type: "FAIL_SEND_COMMENT",
  };
};

const commentReducer = (
  state = {
    listCommentPromo: [],
    isReadySendComment: false,
    isSuccessSendComment: false,
    isFailSendComment: false,
    postingComment: "",
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_LIST_COMMENT": {
      return {
        ...state,
        listCommentPromo: payload,
      };
    }
    case "READY_SEND_COMMENT": {
      return {
        ...state,
        isReadySendComment: true,
        isSuccessSendComment: false,
        isFailSendComment: false,
      };
    }
    case "SUCCESS_SEND_COMMENT": {
      return {
        ...state,
        isReadySendComment: false,
        isSuccessSendComment: true,
        isFailSendComment: false,
        listCommentPromo: [...state.listCommentPromo, payload],
        postingComment: "",
      };
    }
    case "FAIL_SEND_COMMENT": {
      return {
        ...state,
        isReadySendComment: false,
        isSuccessSendComment: false,
        isFailSendComment: true,
        postingComment: "",
      };
    }
    case "ADD_COMMENT_IN_PROMOTION": {
      return {
        ...state,
        postingComment: payload?.comment,
      };
    }

    default:
      return { ...state };
  }
};
export default commentReducer;
