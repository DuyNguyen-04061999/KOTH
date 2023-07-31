export const createTournament = (data) => {
  return {
    type: "CREATE_TOURNAMENT",
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

const tournamentReducer = (
  state = {
    //success=true&&fail=false --> success, fail=true&&success=false --> fail, success=false && fail=false --> Loading
    isCreateTournamentSuccess: true,
    isCreateTournamentFail: true,
    tournamentRes: [],
    isTournamentShow: false,
    isBuyTicket: false,
    //--------------------------------------
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    //----------- Tournament -----------
    case "CREATE_TOURNAMENT": {
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
    default:
      return state;
  }
};
export default tournamentReducer;
