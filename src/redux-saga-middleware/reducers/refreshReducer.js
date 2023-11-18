const refreshReducer = (state = {}, action) => {
  const { type } = action;
  switch (type) {
    case "":
      return {};

    default:
      return { ...state };
  }
};
export default refreshReducer;
