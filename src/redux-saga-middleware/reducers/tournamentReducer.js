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
    default:
      return state;
  }
};
export default tournamentReducer;
