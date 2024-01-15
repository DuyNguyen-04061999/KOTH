export const getListLikeDislike = () => {
  return {
    type: "GET_LIKE_DISLIKE_LIST",
  };
};
export const updateListLikeDislike = (data) => {
  return {
    type: "UPDATE_LIST_LIKE_DISLIKE",
    payload: data,
  };
};
export const updateLikeGame = (data) => {
  return {
    type: "UPDATE_LIKE_GAME",
    payload: data,
  };
};
export const updateDislikeGame = (data) => {
  return {
    type: "UPDATE_DISLIKE_LIKE_GAME",
    payload: data,
  };
};
export const likeGamePromotion = (data) => {
  return {
    type: "LIKE_GAME_IN_PROMOTION",
    payload: data,
  };
};
export const unLikeGamePromotion = (data) => {
  return {
    type: "UNLIKE_GAME_IN_PROMOTION",
    payload: data,
  };
};
export const unDisLikeGamePromotion = (data) => {
  return {
    type: "UNDISLIKE_GAME_IN_PROMOTION",
    payload: data,
  };
};
export const dislikeGamePromotion = (data) => {
  return {
    type: "DISLIKE_GAME_IN_PROMOTION",
    payload: data,
  };
};
export const updateLikeDislikeCount = (data) => {
  return {
    type: "UPDATE_LIKE_DISLIKE_COUNT",
    payload: data,
  };
};
export const getLikeDislikeCount = (data) => {
  return {
    type: "COUNT_LIKE_DISLIKE_PROMOTION",
    payload: data,
  };
};
const likeDislikeReducer = (
  state = {
    listGameLiked: [],
    listGameDisLiked: [],
    countLikeDislike: null,
  },
  action
) => {
  let { type, payload } = action;
  switch (type) {
    case "UPDATE_LIST_LIKE_DISLIKE":
      return {
        ...state,
        listGameLiked: payload?.listGameLiked,
        listGameDisLiked: payload?.listGameDisLiked,
      };
    case "UPDATE_LIKE_GAME": {
      return {
        ...state,
        listGameLiked: payload,
      };
    }
    case "UPDATE_DISLIKE_LIKE_GAME": {
      return {
        ...state,
        listGameDisLiked: payload,
      };
    }
    case "UPDATE_LIKE_DISLIKE_COUNT": {
      return {
        ...state,
        countLikeDislike: payload,
      };
    }
    default:
      return { ...state };
  }
};
export default likeDislikeReducer;
