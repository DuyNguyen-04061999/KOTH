export const openLuckyWheelPopup = (data) => {
  return {
    type: "OPEN_POPUP_LUCKY_WHEEL",
    payload: data,
  };
};
export const closeLuckyWheelPopup = () => {
  return {
    type: "CLOSE_POPUP_LUCKY_WHEEL",
  };
};
export const updateCountEveryDay = (data) => {
  return {
    type: "UPDATE_COUNT_EVERY_DAY",
    payload: data,
  };
};
export const addMoreSpinHistory = (data) => {
  return {
    type: "ADD_MORE_SPIN_HISTORY",
    payload: data,
  };
};
export const updateRewardHistory = (data) => {
  return {
    type: "UPDATE_REWARD_HISTORY",
    payload: data,
  };
};
export const assigntotalAmount = (data) => {
  return {
    type: "ASSIGN_TOTAL_AMOUNT",
    payload: data,
  };
};
export const addMoretotalAmount = (data) => {
  return {
    type: "ADD_MORE_TOTAL_AMOUNT",
    payload: data,
  };
};
export const updateExpiryTime = (data) => {
  return {
    type: "UPDATE_EXPIRTY_TIME",
    payload: data,
  };
};
const luckyWheelReducer = (
  state = {
    popupLuckyWheel: false,
    collectedPoint: 0,
    countEveryday: 0,
    rewardHistory: [],
    totalAmount: 0,
    expiryTime: 6/10/2023 ,
  },
  action
) => {
  let { type, payload } = action;
  switch (type) {
    case "OPEN_POPUP_LUCKY_WHEEL": {
      return {
        ...state,
        popupLuckyWheel: true,
        collectedPoint: payload,
      };
    }
    case "CLOSE_POPUP_LUCKY_WHEEL": {
      return {
        ...state,
        popupLuckyWheel: false,
      };
    }
    case "UPDATE_COUNT_EVERY_DAY": {
      return {
        ...state,
        countEveryday: payload,
      };
    }
    case "UPDATE_REWARD_HISTORY": {
      return {
        ...state,
        rewardHistory: payload,
      };
    }
    case "ADD_MORE_SPIN_HISTORY": {
      return {
        ...state,
        rewardHistory: [
          {
            createdAt: payload?.createdAt,
            rhDescription: payload?.rhDescription,
            rhLsp: {
              lspName: payload?.rhLsp?.lspName,
            },
            rhType: payload?.rhType,
            rhUser: { userName: payload?.rhUser?.userName },
            rhValue: payload?.rhValue,
            rhtypeMoney: payload?.rhtypeMoney,
          },
          ...state.rewardHistory,
        ],
      };
    }
    case "ASSIGN_TOTAL_AMOUNT": {
      return {
        ...state,
        totalAmount: payload,
      };
    }
    case "ADD_MORE_TOTAL_AMOUNT": {
      return {
        ...state,
        totalAmount: state.totalAmount + payload,
      };
    }
    case "UPDATE_EXPIRTY_TIME": {
      return {
        ...state,
        expiryTime: payload,
      };
    }
    default:
      return { ...state };
  }
};

export default luckyWheelReducer;
