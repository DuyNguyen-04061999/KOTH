import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { toggleStartGame } from "../../../redux-saga-middleware/reducers/appReducer";
import { finishGame, finishVideo, getRefactorDetailAuthPromotion } from "../../../redux-saga-middleware/reducers/promotionReducer";
import {
  toggleCloseResultEndGame,
} from "../../../redux-saga-middleware/reducers/tournamentReducer";
import { updateCountExtraAfterPlayGame } from "../../../redux-saga-middleware/reducers/userReducer";

export default function ResultEndGame() {
  const { endGameScore, isResultEndGame } = useSelector(
    (state) => state.tournamentReducer
  );
  const { detailTournament } = useSelector((state) => state.playgameReducer);

  const { tokenUser, countTicket } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const { id } = useParams();

  const handleClose = () => {
    dispatch(toggleCloseResultEndGame());
    dispatch(toggleStartGame(false));
    dispatch(finishGame())
    dispatch(finishVideo())
    if(detailTournament && (!detailTournament?.extra || detailTournament?.extra <= 0) && countTicket > 0) {
      dispatch(updateCountExtraAfterPlayGame(1))
    }
    
    if (tokenUser || localStorage.getItem("token")) {
      dispatch(getRefactorDetailAuthPromotion({
        id,
        token: tokenUser
      }))
    }
  };

  // isResultEndGame

  return (
    <div>
      <Dialog
        open={isResultEndGame}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          zIndex: 2000,
          "& .MuiDialog-paper": {
            borderRadius: 0,
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <Box
        component={"div"}
          id="results"
          sx={{
            width: "100%",
            borderRadius: 0,
          }}
        >
          <div className="results-summary-container">
            <div className="confetti">
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
            </div>
            <div className="results-summary-container__result">
              <div className="heading-tertiary">Your Result</div>
              <div className="result-box">
                <div className="heading-primary">{endGameScore || 0}</div>
                {/* <p className="result">of 100</p> */}
              </div>
              <div className="result-text-box">
                <div className="heading-secondary">
                  excellent work, keep going
                </div>
                {/* <p className="paragraph">
                  You scored higher than 65% of the people who have taken these
                  tests.
                </p> */}
              </div>
              <div className="summary__cta">
                <button
                  onClick={handleClose}
                  className="btnResult btn__continue"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Dialog>
    </div>
  );
}
