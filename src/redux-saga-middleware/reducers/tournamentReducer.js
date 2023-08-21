export const createTournament = (data) => {
  return {
    type: "CREATE_TOURNAMENT",
    payload: data,
  };
};
export const createTournamentReady = (data) => {
  return {
    type: "CREATE_TOURNAMENT_READY",
    payload: data,
  };
};
export const createTournamentSuccess = (data) => {
  return {
    type: "CREATE_TOURNAMENT_SUCESS",
    payload: data,
  };
};
export const createTournamentFail = (data) => {
  return {
    type: "CREATE_TOURNAMENT_FAIL",
    payload: data,
  };
};

export const toggleTournamentShow = (data) => {
  return {
    type: "TOGGLE_TOURNAMENT_SHOW",
    payload: data,
  };
};

export const toggleBuyTicket = (data) => {
  return {
    type: "TOGGLE_BUYTICKET",
    payload: data,
  };
};
export const getDailyTour = (data) => {
  return {
    type: "GET_LIST_DAILY_TOURNAMENT",
    payload: data,
  };
};
export const getHourlyTour = (data) => {
  return {
    type: "GET_LIST_HOURLY_TOURNAMENT",
    payload: data,
  };
};
export const getHotTour = (data) => {
  return {
    type: "GET_LIST_HOT_TOURNAMENT",
    payload: data,
  };
};
export const getWeeklyTour = (data) => {
  return {
    type: "GET_LIST_WEEKLY_TOURNAMENT",
    payload: data,
  };
};
export const getBiggestEndTourRedux = (data) => {
  return {
    type: "GET_BIGGEST_SUCCESS",
    payload: data,
  };
};
export const getBrandTourSuccess = (data) => {
  return {
    type: "GET_BRAND_TOUR_SUCCESS",
    payload: data,
  };
};

export const getListGameForTournament = (data) => {
  return {
    type: "GET_LIST_GAME_FOR_TOURNAMENT",
    payload: data,
  };
};

export const getListGameForTournamentSuccess = (data) => {
  return {
    type: "GET_LIST_GAME_FOR_TOURNAMENT_SUCCESS",
    payload: data,
  };
};

export const getListGameForTournamentFail = (data) => {
  return {
    type: "GET_LIST_GAME_FOR_TOURNAMENT_FAIL",
    payload: data,
  };
};

export const getSkinForTournament = (data) => {
  return {
    type: "GET_SKIN_FOR_TOURNAMENT",
    payload: data,
  };
};

export const getSkinForTournamentSuccess = (data) => {
  return {
    type: "GET_SKIN_FOR_TOURNAMENT_SUCCESS",
    payload: data,
  };
};

export const getSkinForTournamentFail = (data) => {
  return {
    type: "GET_SKIN_FOR_TOURNAMENT_FAIL",
    payload: data,
  };
};

export const getBrandTournament = (data) => {
  return {
    type: "GET_BRAND_TOURNAMENT",
    payload: data,
  };
};

export const getBrandTournamentSuccess = (data) => {
  return {
    type: "GET_BRAND_TOURNAMENT_SUCCESS",
    payload: data,
  };
};

export const getBrandTournamentFail = (data) => {
  return {
    type: "GET_BRAND_TOURNAMENT_FAIL",
    payload: data,
  };
};

const tournamentReducer = (
  state = {
    //success=true&&fail=false --> success, fail=true&&success=false --> fail, success=false && fail=false --> Loading
    isCreateTournamentSuccess: true,
    isCreateTournamentFail: true,
    tournamentRes: [],
    isTournamentShow: false,
    isBuyTicket: false,
    dailyTournament: [],
    weeklyTournament: [],
    hourlyTournament: [],
    hotTournament: [],
    gameForTournament: [],
    isFecthGameForTournament: false,
    skinTournament: [],
    isFecthSkinTournament: false,
    listBrand: [],
    isFecthBrand: false,
    biggestEndTour: [],
    brandTour: [],
    //--------------------------------------
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    //----------- Tournament -----------
    case "CREATE_TOURNAMENT_READY": {
      return {
        ...state,
        isCreateTournamentSuccess: false,
        isCreateTournamentFail: false,
      };
    }
    case "CREATE_TOURNAMENT_SUCESS": {
      return {
        ...state,
        isCreateTournamentSuccess: true,
        isCreateTournamentFail: false,
        tournamentRes: payload,
      };
    }
    case "CREATE_TOURNAMENT_FAIL": {
      return {
        ...state,
        isCreateTournamentSuccess: false,
        isCreateTournamentFail: true,
        tournamentRes: payload,
      };
    }
    case "TOGGLE_TOURNAMENT_SHOW":
      return { ...state, isTournamentShow: !state.isTournamentShow };
    case "TOGGLE_BUYTICKET":
      return { ...state, isBuyTicket: !state.isBuyTicket };
    case "GET_LIST_HOT_TOURNAMENT":
      return {
        ...state,
        hotTournament: payload,
      };
    case "GET_LIST_DAILY_TOURNAMENT":
      return {
        ...state,
        dailyTournament: payload,
      };
    case "GET_LIST_HOURLY_TOURNAMENT":
      return {
        ...state,
        hourlyTournament: payload,
      };
    case "GET_LIST_WEEKLY_TOURNAMENT":
      return {
        ...state,
        weeklyTournament: payload,
      };
    case "GET_LIST_GAME_FOR_TOURNAMENT":
      return {
        ...state,
        isFecthGameForTournament: true,
      };
    case "GET_LIST_GAME_FOR_TOURNAMENT_SUCCESS":
      return {
        ...state,
        isFecthGameForTournament: false,
        gameForTournament: payload,
      };
    case "GET_LIST_GAME_FOR_TOURNAMENT_FAIL":
      return {
        ...state,
        isFecthGameForTournament: false,
      };
    case "GET_SKIN_FOR_TOURNAMENT":
      return {
        ...state,
        isFecthSkinTournament: true,
      };
    case "GET_SKIN_FOR_TOURNAMENT_SUCCESS":
      return {
        ...state,
        isFecthSkinTournament: false,
        skinTournament: payload.list,
      };
    case "GET_SKIN_FOR_TOURNAMENT_FAIL":
      return {
        ...state,
        isFecthSkinTournament: false,
      };
    case "GET_BRAND_TOURNAMENT":
      return {
        ...state,
        isFecthBrand: true,
      };
    case "GET_BRAND_TOURNAMENT_SUCCESS":
      return {
        ...state,
        isFecthBrand: false,
        listBrand: payload.list,
      };
    case "GET_BRAND_TOURNAMENT_FAIL":
      return {
        ...state,
        isFecthBrand: false,
      }
    case "GET_BIGGEST_SUCCESS":
      return {
        ...state,
        biggestEndTour: payload,
      };
    case "GET_BRAND_TOUR_SUCCESS":
      return {
        ...state,
        brandTour: payload,
      };
    default:
      return state;
  }
};
export default tournamentReducer;
