const refreshReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case "":
      return {};

    default:
      return { ...state };
  }
};
export default refreshReducer;
