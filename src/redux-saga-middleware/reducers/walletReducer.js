import { REHYDRATE } from "redux-persist";

export const toggleWalletDialog = (data) => {
  return {
    type: "TOGGLE_WALLET_DIALOG",
    payload: data,
  };
};
export const openTransactionDialog = (data) => {
  return {
    type: "OPEN_TRANSACTION_DIALOG",
  };
};
export const closeTransactionDialog = (data) => {
  return {
    type: "CLOSE_TRANSACTION_DIALOG",
  };
};

export const walletLogoutSuccessFully = (data) => {
  return {
    type: "WALLET_LOGOUT_SUCCESS_FULLY",
    payload:data
  }
}

const walletReducer = (
  state = {
    isWalletDialog: false,
    isTransactionDialog: false,
  },
  action
) => {
  let {
    type,
    //  payload
  } = action;
  switch (type) {
    case REHYDRATE:
      return { ...state };
    case "TOGGLE_WALLET_DIALOG":
      return { ...state, isWalletDialog: !state.isWalletDialog };
    case "OPEN_TRANSACTION_DIALOG":
      return { ...state, isTransactionDialog: true };
    case "CLOSE_TRANSACTION_DIALOG":
      return { ...state, isTransactionDialog: false };
    case "WALLET_LOGOUT_SUCCESS_FULLY" : {
      return {
        ...state,
        isWalletDialog: false,
        isTransactionDialog: false,
      }
    }
    default:
      return state;
  }
};

export default walletReducer;
