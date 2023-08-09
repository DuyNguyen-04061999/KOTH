import { REHYDRATE } from "redux-persist";

export const adminLogin = (data) => {
  return {
    type: "ADMIN_LOGIN",
    payload: data
  };
};

const adminAuthReducer = (
  state = {
    
  },
  action
) => {
  const { type } = action;
  switch (type) {
    case REHYDRATE:
      return { ...state };
    default:
      return { ...state };
  }
};

export default adminAuthReducer;
