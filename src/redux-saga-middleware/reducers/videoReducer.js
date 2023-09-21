const videoReducer = (
  state = {
    skipSecond: 7,
  },
  action
) => {
  let { type, payload } = action;
  switch (type) {
    case "CHANGE_SECOND_SKIP_VIDEO":
      return {
        ...state,
        skipSecond: payload,
      };
    default:
      return state;
  }
};

export default videoReducer;
