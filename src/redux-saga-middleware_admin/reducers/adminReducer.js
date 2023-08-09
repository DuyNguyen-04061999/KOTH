import { REHYDRATE } from "redux-persist";

export const admin_ = (data) => {
  return {
    type: "ADMIN_",
    payload: data
  };
};

const adminReducer_ = (
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

export default adminReducer_;
