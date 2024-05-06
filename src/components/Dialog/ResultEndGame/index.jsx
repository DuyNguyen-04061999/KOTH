import { Box, DialogActions, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  openPopupCompleteExtra,
  toggleStartGame,
} from "../../../redux-saga-middleware/reducers/appReducer";
import {
  finishGame,
  finishVideo,
  getRefactorDetailAuthPromotion,
} from "../../../redux-saga-middleware/reducers/promotionReducer";
import { CheckGuestUpgrade, toggleCloseResultEndGame } from "../../../redux-saga-middleware/reducers/tournamentReducer";
import { getClaimFirstGamePlay, getUserInfoReady } from "../../../redux-saga-middleware/reducers/userReducer";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { Close } from "@mui/icons-material";
import AnimButton from "../../AnimButton";
import { images } from "../../../utils/images";
import {
  clickTab,
  toggleLoginDialog,
} from "../../../redux-saga-middleware/reducers/authReducer";
import { getTokenGuest } from "../../../utils/getTokenGuest";

export default function ResultEndGame() {
  const { endGameScore, isResultEndGame } = useSelector(
    (state) => state.tournamentReducer
  );
  const { width } = useWindowDimensions();
  const {
    tokenUser,
    // countTicket
    tokenGuest
  } = useSelector((state) => state.userReducer);
  const {scoreGames} = useSelector((state) => state.appReducer)
  const token = localStorage.getItem("token")
  const dispatch = useDispatch();
  const { id } = useParams();
  const {user} = useSelector((state) => state.userReducer);
  const handleClose = () => {
    localStorage.removeItem("buyPackage");
    localStorage.removeItem("newNumberTicket");
    dispatch(toggleCloseResultEndGame());
    dispatch(toggleStartGame(false));
    dispatch(finishGame());
    dispatch(finishVideo());
    if (tokenUser || localStorage.getItem("token")) {
      dispatch(
        getRefactorDetailAuthPromotion({
          id,
          token: tokenUser,
        })
      );
      dispatch(getUserInfoReady());
    }
  };

  const check = localStorage.getItem("firstPlayGame");

  const handleToSignUp = () => {
    dispatch(
      getRefactorDetailAuthPromotion({
        id,
        token: tokenUser || tokenGuest,
      })
    );
    dispatch(CheckGuestUpgrade(true))
    dispatch(toggleCloseResultEndGame());
    dispatch(toggleLoginDialog());
    dispatch(clickTab("signup"));
  };

  const handleConfirm = () => {
    if(user?.isGuest === false) {
      if (check === "check") {
        dispatch(
          openPopupCompleteExtra({
            type: "firstPlay",
          })
        );
        localStorage.removeItem("firstPlayGame");
        localStorage.removeItem("buyPackage");
        localStorage.removeItem("newNumberTicket");
        dispatch(toggleCloseResultEndGame());
        dispatch(toggleStartGame(false));
        dispatch(finishGame());
        dispatch(finishVideo());
        dispatch(getClaimFirstGamePlay())
        // if (tokenUser || localStorage.getItem("token")) {
          dispatch(
            getRefactorDetailAuthPromotion({
              id,
              token: tokenUser,
            })
          );
          dispatch(getUserInfoReady());
        // }
      } else {
        localStorage.removeItem("buyPackage");
        localStorage.removeItem("newNumberTicket");
        dispatch(toggleCloseResultEndGame());
        dispatch(toggleStartGame(false));
        dispatch(finishGame());
        dispatch(finishVideo());
        // if (tokenUser || localStorage.getItem("token")) {
          dispatch(
            getRefactorDetailAuthPromotion({
              id,
              token: tokenUser,
            })
          );
          dispatch(getUserInfoReady());
        // }
      }
    } else {
    dispatch(CheckGuestUpgrade(true))
    dispatch(toggleCloseResultEndGame());
    dispatch(
      getRefactorDetailAuthPromotion({
        id,
        token: tokenUser || tokenGuest,
      })
    );
    dispatch(getUserInfoReady());
    dispatch(toggleStartGame(false));
    dispatch(finishGame());
    dispatch(finishVideo());
    localStorage.removeItem("buyPackage");
        localStorage.removeItem("newNumberTicket");
    }
  };

  return (
    <div>
      <Dialog
        fullScreen={width < 576 ? true : false}
        open={isResultEndGame}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        color="#181223"
        sx={{
          "& .MuiDialog-paper": {
            background: "#181223 !important",
            backgroundColor: "#181223 !important",
          },
          "& .MuiPaper-root-MuiDialog-paper": {
            backgroundColor: "#181223 !important",
          },
        }}
      >
        <Box>
          <Close
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "white",
              fontSize: "30px",
              zIndex: 1,
              cursor: "pointer",
            }}
            onClick={handleConfirm}
          />
        </Box>
        <Box
          sx={{
            background: "#181223",
            padding: width < 576 ? "24px" : "36px",
            maxWidth: "420px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ marginTop: "12px", marginBottom: "12px" }}>
              { user?.isGuest === false ? (
                <>
                  {" "}
                  <Typography
                  sx={{
                    fontSize: width < 576 ? "24px" : "24px",
                    fontWeight: 800,
                    color: "white",
                    fontStyle: "normal",
                    textTransform: "capitalize",
                    lineHeight: "130%",
                  }}
                >
                  TOTAL SCORE
                </Typography>
                 
                </>
              ) : (
                <Typography
                    sx={{
                      fontSize: width < 576 ? "24px" : "24px",
                      fontWeight: 800,
                      color: "white",
                      fontStyle: "normal",
                      textTransform: "capitalize",
                      lineHeight: "130%",
                    }}
                  >
                    SAVE PROGRESS
                  </Typography>
              )}
            </Box>
            <Box
              sx={{
                position: "relative",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <Box
                sx={{
                  width: 250,
                  height: 250,
                  backgroundImage: `url(${images.totalResult})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "40px",
                    color: "#fff",
                    fontWeight: "500",
                    fontStyle: "normal",
                  }}
                >
                  {endGameScore || 0}
                </Typography>
              </Box>
            </Box>
          </Box>
          {user?.isGuest === false ? (
            <>
              
            </>
          ) : (
            <>
              <Box>
                <Box component={"img"} alt="..." src={images.crossbar} sx={{width:"100%"}}></Box>
                <Typography
                  sx={{
                    fontSize: width < 576 ? "14px" : "14px",
                    fontWeight: 500,
                    color: "white",
                    fontStyle: "normal",
                    textTransform: "capitalize",
                    lineHeight: "130%",
                    textAlign:"center"
                  }}
                >
                  Sign Up to save progress and get coins.
                </Typography>
                <Box component={"img"} alt="..." src={images.crossbar} sx={{width:"100%"}}></Box>
              </Box>
            </>
          )}
          <DialogActions
            sx={{
              justifyContent: "center",
              marginTop: "24px",
              flexDirection: "column",
            }}
          >
            {user?.isGuest === false ? (
              <>
              <AnimButton
                  onClick={() => handleConfirm()}
                  type="primary"
                  text="Continue"
                ></AnimButton>
                
              </>
            ) : (
              <>
                <AnimButton
                  onClick={() => handleToSignUp()}
                  type="primary"
                  text="Sign Up"
                ></AnimButton>
              </>
            )}
            <Box className="mt-2">
              {user?.isGuest === false ? (
                <>
                <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: "18px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      lineHeight: "normal",
                      color: "#7848ED",
                    }}
                  >
                    View your game history
                  </Typography>
                  
                </>
              ) : (
                <>
                  <Typography
                    onClick={handleConfirm}
                    sx={{
                      textAlign: "center",
                      fontSize: "18px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      lineHeight: "normal",
                      color: "#7848ED",
                      cursor: "pointer",
                      marginTop:"15px !important",
                      marginLeft: "0px !important"
                    }}
                  >
                    Continue with Guest Mode
                  </Typography>
                </>
              )}
            </Box>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
