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

export const toggleMetaMaskDialog = (data) => {
  return {
    type: "TOGGLE_METAMASK_DIALOG",
    payload: data
  }
}

export const saveTransactionData = (data) => {
  return {
    type: "SAVE_TRANSACTION_DATA",
    payload: data
  }
}

export const toggleCheckWallet =(data) => {
  return {
    type: "TOGGLE_CHECK_WALLET",
    payload: data
  }
}

export const closeCheckWallet =(data) => {
  return {
    type: "CLOSE_CHECK_WALLET",
    payload: data
  }
}

const walletReducer = (
  state = {
    isWalletDialog: false,
    isTransactionDialog: false,
    isMetamaskDialog: false,
    transactionData: null,
    depositData: null,
    isCheckWallet: false,
    typeWallet: "",
    goldCombo: 0,
    totalExtra: 0,
    price: 0
  },
  action
) => {
  let {
    type,
    payload
  } = action;
  switch (type) {
    case REHYDRATE:
      return { ...state };
    case "TOGGLE_WALLET_DIALOG":
      return { ...state, isWalletDialog: !state.isWalletDialog, price: payload || 0 };
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
    case "TOGGLE_METAMASK_DIALOG": return {...state, isMetamaskDialog: !state.isMetamaskDialog}
    case "SAVE_TRANSACTION_DATA": return {...state, transactionData: payload?.transactionData, depositData: payload?.depositData}
    case "TOGGLE_CHECK_WALLET" : 

    return {...state, isCheckWallet: !state.isCheckWallet, typeWallet:payload?.type, goldCombo:payload?.gold, totalExtra:payload?.total}
    case "CLOSE_CHECK_WALLET" : return {...state, isCheckWallet: false}
    default:
      return state;
  }
};

export default walletReducer;
