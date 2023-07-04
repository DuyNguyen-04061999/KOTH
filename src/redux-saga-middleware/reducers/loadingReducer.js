export const openLoading = () => {
  return {
    type: "OPEN_LOADING_EFFECT",
  };
};
export const closeLoading = () => {
  return {
    type: "CLOSE_LOADING_EFFECT",
  };
};
const loadingReducer = (
  state = {
    loadingState: false,
  },
  action
) => {
  let { type } = action;
  switch (type) {
    case "OPEN_LOADING_EFFECT": {
      return {
        ...state,
        loadingState: true,
      };
    }
    case "CLOSE_LOADING_EFFECT": {
      return {
        ...state,
        loadingState: false,
      };
    }
    default:
      return { ...state };
  }
};

export default loadingReducer;
