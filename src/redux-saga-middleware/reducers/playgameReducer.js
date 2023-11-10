const INTTIAL_STATE = {
  detailTournament: {},
};
export const updateDetailTour = (data) => {
  return {
    type: "UPDATE_DETAIL_TOURNAMENT",
    payload: data,
  };
};

export const updateDetailTourAfterPlayGame = (data) => {
  return {
    type: "UPDATE_DETAIL_TOURNAMENT_AFTER_START_GAME",
    payload: data,
  };
};

const playgameReducer = (state = INTTIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_DETAIL_TOURNAMENT":
      return { ...state, detailTournament: payload };
      case "UPDATE_DETAIL_TOURNAMENT_AFTER_START_GAME":
        return { ...state, detailTournament: {...state.detailTournament, extra: (state.detailTournament.extra - 1) || 0} };
    default:
      return { ...state };
  }
};

export default playgameReducer;
