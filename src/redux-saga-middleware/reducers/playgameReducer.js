const INTTIAL_STATE = {
  detailTournament: {},
};
export const updateDetailTour = (data) => {
  return {
    type: "UPDATE_DETAIL_TOURNAMENT",
    payload: data,
  };
};
const playgameReducer = (state = INTTIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_DETAIL_TOURNAMENT":
      return { ...state, detailTournament: payload };
    default:
      return { ...state };
  }
};

export default playgameReducer;
