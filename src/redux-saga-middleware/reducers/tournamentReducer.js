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

export const getHotTourSuccess = (data) => {
  return {
    type: "GET_LIST_HOT_TOURNAMENT_SUCCESS",
    payload: data,
  };
};

export const getHotTourFail = (data) => {
  return {
    type: "GET_LIST_HOT_TOURNAMENT_FAIL",
    payload: data,
  };
};

export const getVipTour = (data) => {
  return {
    type: "GET_LIST_VIP_TOURNAMENT",
    payload: data,
  };
};

export const getVipTourSuccess = (data) => {
  return {
    type: "GET_LIST_VIP_TOURNAMENT_SUCCESS",
    payload: data,
  };
};

export const getVipTourFail = (data) => {
  return {
    type: "GET_LIST_VIP_TOURNAMENT_FAIL",
    payload: data,
  };
};

export const getStandardTour = (data) => {
  return {
    type: "GET_LIST_STANDARD_TOURNAMENT",
    payload: data,
  };
};

export const getStandardTourSuccess = (data) => {
  return {
    type: "GET_LIST_STANDARD_TOURNAMENT_SUCCESS",
    payload: data,
  };
};

export const getStandardTourFail = (data) => {
  return {
    type: "GET_LIST_STANDARD_TOURNAMENT_FAIL",
    payload: data,
  };
};

export const getOngoingTour = (data) => {
  return {
    type: "GET_LIST_ONGOING_TOURNAMENT",
    payload: data,
  };
};

export const getOngoingTourSuccess = (data) => {
  return {
    type: "GET_LIST_ONGOING_TOURNAMENT_SUCCESS",
    payload: data,
  };
};

export const getOngoingTourFail = (data) => {
  return {
    type: "GET_LIST_ONGOING_TOURNAMENT_FAIL",
    payload: data,
  };
};

export const getUpcomingTour = (data) => {
  return {
    type: "GET_LIST_UPCOMING_TOURNAMENT",
    payload: data,
  };
};

export const getUpcomingTourSuccess = (data) => {
  return {
    type: "GET_LIST_UPCOMING_TOURNAMENT_SUCCESS",
    payload: data,
  };
};

export const getUpcomingTourFail = (data) => {
  return {
    type: "GET_LIST_UPCOMING_TOURNAMENT_FAIL",
    payload: data,
  };
};

export const getEndedTour = (data) => {
  return {
    type: "GET_LIST_ENDED_TOURNAMENT",
    payload: data,
  };
};

export const getEndedTourSuccess = (data) => {
  return {
    type: "GET_LIST_ENDED_TOURNAMENT_SUCCESS",
    payload: data,
  };
};

export const getEndedTourFail = (data) => {
  return {
    type: "GET_LIST_ENDED_TOURNAMENT_FAIL",
    payload: data,
  };
};

export const getWeeklyTour = (data) => {
  return {
    type: "GET_LIST_WEEKLY_TOURNAMENT",
    payload: data,
  };
};
export const getBiggestEndTour = (data) => {
  return {
    type: "GET_BIGGEST_TOUR",
    payload: data,
  };
};
export const getBiggestEndTourSuccess = (data) => {
  return {
    type: "GET_BIGGEST_TOUR_SUCCESS",
    payload: data,
  };
};
export const getBiggestEndTourFail = (data) => {
  return {
    type: "GET_BIGGEST_TOUR_FAIL",
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
export const getHottestWeekTourSuccess = (data) => {
  return {
    type: "GET_HOTTEST_WEEK_TOUR_SUCCESS",
    payload: data,
  };
};
export const getThreeBrandTourSuccess = (data) => {
  return {
    type: "GET_THREE_BRAND_TOUR_SUCCESS",
    payload: data,
  };
};

export const toggleOpenResultEndGame = (data) => {
  return {
    type: "TOGGLE_OPEN_RESULT_END_GAME",
    payload: data,
  };
};
export const toggleCloseResultEndGame = (data) => {
  return {
    type: "TOGGLE_CLOSE_RESULT_END_GAME",
    payload: data,
  };
};

export const saveIdTournament = (data) => {
  return {
    type: "SAVE_ID_TOURNAMENT",
    payload: data,
  };
};

export const saveBoughtTournament = (data) => {
  return {
    type: "SAVE_BOUGHT_TOURNAMENT",
    payload: data,
  };
};

export const toggleExtra = (data) => {
  return {
    type : "TOGGLE_EXTRA",
    payload:data
  }
}

const tournamentReducer = (
  state = {
    //success=true&&fail=false --> success, fail=true&&success=false --> fail, success=false && fail=false --> Loading
    isCreateTournamentSuccess: true,
    isCreateTournamentFail: true,
    tournamentRes: [],
    isTournamentShow: false,
    isBuyTicket: false,
    isFetchHot: true,
    isFetchVip: true,
    isFetchStandard: true,
    isFetchOngoing: true,
    isFetchUpcoming: true,
    isFetchEnded: true,
    dailyTournament: [],
    weeklyTournament: [],
    hourlyTournament: [],
    hotTournament: [],
    vipTournament: [],
    standardTournament: [],
    ongoingTournament: [],
    upcomingTournament: [],
    endedTournament: [],
    gameForTournament: [],
    isFecthGameForTournament: false,
    skinTournament: [],
    isFecthSkinTournament: false,
    listBrand: [],
    isFecthBrand: false,
    biggestEndTour: [],
    isFetchBiggestTour: true,
    brandTour: [],
    hotWeekTour: [],
    threeBrandTour: [],
    isFetchThreeTour: true,
    isFetchHotWeek: true,
    isResultEndGame: false,
    endGameScore: 0,
    idTour: "",
    boughtTour: "",
    isExtra:false,
    noDataUpcoming: false,
    noDataHot:false,
    noDataOncoming:false,
    noDataEnd:false,
    noDataThreeBrand:false,
    noDataHotWeek:false,
    noDataBrand:false
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
        isFetchHot: true,
      };
    case "GET_LIST_HOT_TOURNAMENT_SUCCESS":
      return {
        ...state,
        hotTournament: payload,
        isFetchHot: false,
        noDataHot:  (!payload || (payload && payload?.length <= 0)) ? true : false
      };
    case "GET_LIST_HOT_TOURNAMENT_FAIL":
      return {
        ...state,
        isFetchHot: false,
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
    case "GET_LIST_VIP_TOURNAMENT":
      return {
        ...state,
        isFetchVip: true,
      };
    case "GET_LIST_VIP_TOURNAMENT_SUCCESS":
      return {
        ...state,
        vipTournament: payload,
        isFetchVip: false,
      };
    case "GET_LIST_VIP_TOURNAMENT_FAIL":
      return {
        ...state,
        isFetchVip: false,
      };
    case "GET_LIST_STANDARD_TOURNAMENT":
      return {
        ...state,
        isFetchStandard: true,
      };
    case "GET_LIST_STANDARD_TOURNAMENT_SUCCESS":
      return {
        ...state,
        standardTournament: payload,
        isFetchStandard: false,
      };
    case "GET_LIST_STANDARD_TOURNAMENT_FAIL":
      return {
        ...state,
        isFetchStandard: false,
      };
    case "GET_LIST_ONGOING_TOURNAMENT":
      return {
        ...state,
        isFetchOngoing: true,
      };
    case "GET_LIST_ONGOING_TOURNAMENT_SUCCESS":
      return {
        ...state,
        ongoingTournament: payload,
        isFetchOngoing: false,
        noDataOncoming:  (!payload || (payload && payload?.length <= 0)) ? true : false
      };
    case "GET_LIST_ONGOING_TOURNAMENT_FAIL":
      return {
        ...state,
        isFetchOngoing: false,
      };
    case "GET_LIST_UPCOMING_TOURNAMENT":
      return {
        ...state,
        isFetchUpcoming: true,
      };
    case "GET_LIST_UPCOMING_TOURNAMENT_SUCCESS":
      return {
        ...state,
        upcomingTournament: payload,
        isFetchUpcoming: false,
        noDataUpcoming: (!payload || (payload && payload?.length <= 0)) ? true : false
      };
    case "GET_LIST_UPCOMING_TOURNAMENT_FAIL":
      return {
        ...state,
        isFetchUpcoming: false,
      };
    case "GET_LIST_ENDED_TOURNAMENT":
      return {
        ...state,
        isFetchEnded: true,
      };
    case "GET_LIST_ENDED_TOURNAMENT_SUCCESS":
      return {
        ...state,
        endedTournament: payload,
        isFetchEnded: false,
        noDataEnd:  (!payload || (payload && payload?.length <= 0)) ? true : false
      };
    case "GET_LIST_ENDED_TOURNAMENT_FAIL":
      return {
        ...state,
        isFetchEnded: false,
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
      };
    case "GET_BIGGEST_TOUR":
      return {
        ...state,
        isFetchBiggestTour: true,
      };
    case "GET_BIGGEST_TOUR_SUCCESS":
      return {
        ...state,
        isFetchBiggestTour: false,
        biggestEndTour: payload,
      };
    case "GET_BIGGEST_TOUR_FAIL":
      return {
        ...state,
        isFetchBiggestTour: false,
      };
    case "GET_BRAND_TOUR_SUCCESS":
      return {
        ...state,
        isFecthBrand:false,
        brandTour: payload,
        noDataBrand:true
      };
    case "GET_HOTTEST_WEEK_TOUR_SUCCESS":
      return {
        ...state,
        isFetchHotWeek: false,
        hotWeekTour: payload,
        noDataHotWeek:true
      };
    case "GET_THREE_BRAND_TOUR_SUCCESS":
      return {
        ...state,
        isFetchThreeTour: false,
        threeBrandTour: payload,
        noDataThreeBrand: true
      };
    case "TOGGLE_OPEN_RESULT_END_GAME":
      return {
        ...state,
        isResultEndGame: true,
        endGameScore: payload || 0,
      };
    case "TOGGLE_CLOSE_RESULT_END_GAME":
      return {
        ...state,
        isResultEndGame: false,
        endGameScore: 0,
      };
    case "SAVE_ID_TOURNAMENT":
      return {
        ...state,
        idTour: payload,
      };
    case "SAVE_BOUGHT_TOURNAMENT":
      return {
        ...state,
        boughtTour: payload,
      };
    case "TOGGLE_EXTRA" : 
    return {
      ...state,
      isExtra: !state.isExtra
    }
    default:
      return { ...state };
  }
};
export default tournamentReducer;
