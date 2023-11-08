import { REHYDRATE } from "redux-persist";

export const getWithdrawData = (data) => {
  return {
    type: "GET_WITHDRAW_DATA",
    payload: data,
  };
};
export const getDepostiData = (data) => {
  return {
    type: "GET_DEPOSIT_DATA",
    payload: data,
  };
};

export const updateWithDraw = (data) => {
  return {
    type: "UPDATE_WITHDRAW",
    payload: data,
  };
};

export const updateDeposit = (data) => {
  return {
    type: "UPDATE_DEPOSIT",
    payload: data,
  };
};

export const paymentLogoutSuccessFully = (data) => {
  return {
    type: "PAYMENT_LOGOUT_SUCCESS_FULLY",
    payload:data
  }
}

export const saveTime = (data) => {
  return {
    type:"SAVE_TIME",
    payload:data
  }
}

export const toggleDialogPromote = (data) => {
  return {
    type : "TOGGLE_DIALOG_PROMOTE",
    payload: data 
  }
}

export const toggleDialogFunds = (data) => {
  return {
    type : "TOGGLE_DIALOG_FUNDS",
    payload: data
  }
}

const paymentReducer = (
  state = {
    withdrawData: [],
    despositData: [],
    timeTrans: [],
    isDialogPromote: false,
    isNotiFunds: false,
    typeNoti: "",
  },
  action
) => {
  let { type, payload } = action;
  switch (type) {
    case REHYDRATE: return {...state}
    case "GET_WITHDRAW_DATA": {
      return {
        ...state,
        withdrawData: payload,
      };
    }
    case "GET_DEPOSIT_DATA": {
      return {
        ...state,
        despositData: payload,
      };
    }
    case "UPDATE_WITHDRAW": {
      return {
        ...state,
        withdrawData: [...state.withdrawData, payload],
      };
    }
    case "UPDATE_DEPOSIT": {
      return {
        ...state,
        despositData: [...state.despositData, payload],
      };
    }
    case "PAYMENT_LOGOUT_SUCCESS_FULLY" : {
      return {
        ...state,
        withdrawData: [],
        despositData: [],
      }
    }
    case "SAVE_TIME" : {
      return {
        ...state,
        timeTrans:payload
      }
    }
    case "TOGGLE_DIALOG_PROMOTE" : {
      return {
        ...state,
        isDialogPromote: !state.isDialogPromote
      }
    }
    case "TOGGLE_DIALOG_FUNDS" : {
      return {
        ...state,
        isNotiFunds: !state.isNotiFunds, typeNoti: payload
      }
    }
    default:
      return state;
  }
};
export default paymentReducer;
