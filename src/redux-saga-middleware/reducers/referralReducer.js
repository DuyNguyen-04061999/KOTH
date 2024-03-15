export const getResSubListReady = () => {
  return {
    type: "GET_REGISTER_SUBCRIBE_LIST_READY",
  };
};
export const getResSubListSuccess = (data) => {
  return {
    type: "GET_REGISTER_LIST_SUCCESS",
    payload: data,
  };
};
export const getResSubListFail = () => {
  return {
    type: "GET_REGISTER_LIST_FAIL",
  };
};
export const getListTier = (data) => {
  return {
    type: "GET_LIST_TIER",
    payload: data,
  };
};
export const getListTierReady = (data) => {
  return {
    type: "GET_LIST_TIER_READY",
  };
};
export const updateCurrentLevel = (data) => {
  return {
    type: "UPDATE_CURRENT_LEVEL",
    payload: data,
  };
};
export const updateIsLoadingClaim = (data) => {
  return {
    type: "UPDATE_ISLOADING_LOADING_CLAIM",
    payload: data,
  };
};
export const updateIsLoadingClaimAll = (data) => {
  return {
    type: "UPDATE_ISLOADING_LOADING_CLAIM_ALL",
    payload: data,
  };
};
export const claimPhysicalReward = (data) => {
  return {
    type: "CLAIM_PHYSICAL_REWARD",
    payload: data,
  };
};
export const updateTierList = (data) => {
  return {
    type: "UPDATE_TIER_LIST",
    payload: data,
  };
};
export const openShareDialog = (data) => {
  return {
    type: "OPEN_SHARE_DIALOG",
  };
};
export const closeShareDialog = (data) => {
  return {
    type: "CLOSE_SHARE_DIALOG",
  };
};
export const openTierRewardDialog = (data) => {
  return {
    type: "OPEN_TIER_REWARD_DIALOG",
    payload: data,
  };
};
export const closeTierRewardDialog = (data) => {
  return {
    type: "CLOSE_TIER_REWARD_DIALOG",
  };
};
export const updateBonuses = (data) => {
  return {
    type: "UPDATE_BONUSES",
    payload: data,
  };
};
export const claimAllReward = (data) => {
  return {
    type: "CLAIM_ALL_REWARD",
    payload: data,
  };
};
export const getCurrentBonuses = (data) => {
  return {
    type: "GET_CURRENT_BONUSES",
  };
};
const referralReducer = (
  state = {
    registerList: [],
    isGetRegisterReady: false,
    isGetRegisterSuccess: false,
    isGetRegisterFail: false,
    //-----------------
    tierList: [],
    isFetchingTier: false,
    //-----------------
    currentLevel: {},
    //-----------------
    isLoadingClaim: false,
    //-----------------
    isLoadingClaimAll: false,
    //-----------------
    isOpenShareDialog: false,
    //-----------------
    isOpenTierDialog: false,
    currentTierRewardName: "",
    //-----------------
    totalBonuses: 0,
    totalPotentialBonuses: 0,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_REGISTER_SUBCRIBE_LIST_READY": {
      return {
        ...state,
        isGetRegisterReady: true,
        isGetRegisterSuccess: false,
        isGetRegisterFail: false,
        registerList: [],
      };
    }
    case "GET_REGISTER_LIST_SUCCESS": {
      return {
        ...state,
        isGetRegisterReady: false,
        isGetRegisterSuccess: true,
        isGetRegisterFail: false,
        registerList: payload,
      };
    }
    case "GET_REGISTER_LIST_FAIL": {
      return {
        ...state,
        isGetRegisterReady: false,
        isGetRegisterSuccess: false,
        isGetRegisterFail: true,
        registerList: [],
      };
    }
    case "GET_LIST_TIER": {
      return {
        ...state,
        tierList: payload,
        isFetchingTier: false,
      };
    }
    case "UPDATE_TIER_LIST": {
      return {
        ...state,
        tierList: state.tierList?.map((item, _) => {
          if (item?.id === payload?.tierId) {
            item.status = payload?.status;
            return item;
          }
          return item;
        }),
      };
    }
    case "UPDATE_CURRENT_LEVEL": {
      return {
        ...state,
        currentLevel: payload,
      };
    }
    case "UPDATE_ISLOADING_LOADING_CLAIM": {
      return {
        ...state,
        isLoadingClaim: payload,
      };
    }
    case "UPDATE_ISLOADING_LOADING_CLAIM_ALL": {
      return {
        ...state,
        isLoadingClaimAll: payload,
      };
    }
    case "OPEN_SHARE_DIALOG": {
      return {
        ...state,
        isOpenShareDialog: true,
      };
    }
    case "CLOSE_SHARE_DIALOG": {
      return {
        ...state,
        isOpenShareDialog: false,
      };
    }
    case "OPEN_TIER_REWARD_DIALOG": {
      return {
        ...state,
        isOpenTierDialog: true,
        currentTierRewardName: payload,
      };
    }
    case "CLOSE_TIER_REWARD_DIALOG": {
      return {
        ...state,
        isOpenTierDialog: false,
        currentTierRewardName: "",
      };
    }
    case "UPDATE_BONUSES": {
      return {
        ...state,
        totalBonuses: payload?.totalBonuses,
        totalPotentialBonuses: payload?.totalPotentialBonuses,
      };
    }
    case "GET_LIST_TIER_READY": {
      return {
        ...state,
        isFetchingTier: true,
      };
    }

    default:
      return { ...state };
  }
};
export default referralReducer;
