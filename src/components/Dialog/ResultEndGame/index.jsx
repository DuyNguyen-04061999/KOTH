import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import _socket from "../../../redux-saga-middleware/config/socket";
import { toggleOpenResultEndGame } from "../../../redux-saga-middleware/reducers/tournamentReducer";
import "./index.scss";

export default function ResultEndGame() {
  const { endGameScore, isResultEndGame } = useSelector(
    (state) => state.tournamentReducer
  );
  const { token } = useSelector(
    (state) => state.authReducer
  );
  const [socket, setSocket] = useState(null)

  const dispatch = useDispatch();

  useEffect(() => {
    if(window.location.pathname  === "/changelog"){
      setSocket(null);
    }
    else{
      const socket = _socket;
      setSocket(socket);
    }
  }, []);

  const { id } = useParams()

  const handleClose = () => {
    dispatch(toggleOpenResultEndGame());
    if (token) {
      socket?.emit("detailTournament", {
        tournamentId: id,
      });
    }
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
          "& .MuiDialog-paper": {
            borderRadius: 0,
            backgroundColor: "transparent",
            boxShadow: "none",
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
                  onClick={() => {
                    dispatch(toggleOpenResultEndGame());
                    if (token) {
                      socket?.emit("detailTournament", {
                        tournamentId: id,
                      });
                    }
                  }}
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
