export const refreshTokenAction = (data) => {
  return {
    type: "REFRESH_TOKEN_ACTION",
    payload: data
  }
}

export const refreshTokenActionSuccess = (data) => {
  return {
    type: "REFRESH_TOKEN_ACTION_SUCCESS",
    payload: data
  }
}

export const refreshTokenActionFail = (data) => {
  return {
    type: "REFRESH_TOKEN_ACTION_FAIL",
    payload: data
  }
}

const refreshReducer = (state = {
  isRefreshToken: false
}, action) => {
  const { type } = action;
  switch (type) {
    case "":
      return {};
    case "REFRESH_TOKEN_ACTION": return {...state, isRefreshToken: true}
    case "REFRESH_TOKEN_ACTION_SUCCESS": return {...state, isRefreshToken: false}
    case "REFRESH_TOKEN_ACTION_FAIL": return {...state, isRefreshToken: false}
    default:
      return { ...state };
  }
};
export default refreshReducer;
