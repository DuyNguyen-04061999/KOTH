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

const paymentReducer = (
  state = {
    withdrawData: [],
    despositData: [],
  },
  action
) => {
  let { type, payload } = action;
  switch (type) {
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
    default:
      return state;
  }
};
export default paymentReducer;
