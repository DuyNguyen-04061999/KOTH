import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Box, Typography } from "@mui/material";
import './index.scss'
import { useDispatch, useSelector } from "react-redux";
import { toggleOpenResultEndGame } from "../../../redux-saga-middleware/reducers/tournamentReducer";

export default function ResultEndGame() {
  const { endGameScore, isResultEndGame } = useSelector(state => state.tournamentReducer);
  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(toggleOpenResultEndGame())
    // window.location.reload()
  };

  return (
    <div>
      <Dialog
        open={isResultEndGame}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          zIndex: 2000,
            "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
                borderRadius: 0,
                backgroundColor:"transparent",
                boxShadow:"none"
              },
        }}
      >
        <Box
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
                <div className="heading-secondary">excellent work, keep going</div>
                {/* <p className="paragraph">
                  You scored higher than 65% of the people who have taken these
                  tests.
                </p> */}
              </div>
              <div className="summary__cta">
                <button onClick={() => {
                  // window.location.reload()
                }} className="btnResult btn__continue">Continue</button>
              </div>
            </div>
          </div>
        </Box>
      </Dialog>
    </div>
  );
}
