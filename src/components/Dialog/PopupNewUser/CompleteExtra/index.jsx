import { Box, Dialog, DialogActions, Typography } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { imageHome, images } from "../../../../utils/images";
import AnimButton from "../../../AnimButton";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import { Close } from "@mui/icons-material";
import { closePopupCompleteExtra, getScoreGame, getTypeDoneStep1, getTypeDoneStep2, getTypeFirstPlay, getTypeSecondPlay, openPopupCompleteProfile } from "../../../../redux-saga-middleware/reducers/appReducer";
import { getClaimFirstGamePlay, getClaimPrizeInfo, getClaimPrizeOptional, getMyInfor } from "../../../../redux-saga-middleware/reducers/userReducer";

const CompleteExtra = ({
  bonusName = "Value extra pack",
  bonusQuantity = 20,
  isSecondDay = false,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const { isOpenPopupCompleteExtra, typeCompleteExtra , scoreGame} = useSelector(
    (state) => state.appReducer
  );

  const handleClose = () => {
    dispatch(closePopupCompleteExtra())
    dispatch(getScoreGame())
    if(typeCompleteExtra === "firstPlay") {
      dispatch(getClaimFirstGamePlay())
    }
    dispatch(getMyInfor())
  };

  const handleConfirm = () => {};
  const handleFirstPlay = () => {
    dispatch(getClaimFirstGamePlay())
    dispatch(openPopupCompleteProfile({
      type:"step1"
    }))
    dispatch(closePopupCompleteExtra())
  }
  const handleDoneStep1 = () => {
    dispatch(closePopupCompleteExtra())
    dispatch(getMyInfor())

  }
  const handleDoneStep2 = () => {
    dispatch(closePopupCompleteExtra())
    dispatch(getMyInfor())
  }
  const handleSecondPlay = () => {
    dispatch(openPopupCompleteProfile({
      type:"step1"
    }))
    // dispatch(getTypeSecondPlay({
    //   type: "secondPlay"
    // }))
  }
  
  const { width } = useWindowDimensions();

  return ReactDOM.createPortal(
    <div>
      <Dialog
        fullScreen={width < 576 ? true : false}
        open={isOpenPopupCompleteExtra}
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
        {typeCompleteExtra === "doneStep1" ? (
          <></>
        ) : (
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
            onClick={handleClose}
          />
        </Box>
        )}
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
              {typeCompleteExtra === "firstPlay" ? (
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
                  Congratulations!
                </Typography>
              ) : typeCompleteExtra === "doneStep1" ? (
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
                  You completed step 1!
                </Typography>
              ) : typeCompleteExtra === "doneStep2" ? (
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
                  You Completed Your Profile!
                </Typography>
              ) : typeCompleteExtra === "secondPlay" ? (
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
                  Don’t miss out On your gift!
                </Typography>
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
                  You Completed Your Profile!
                </Typography>
              )}
            </Box>
            <Box>
              {typeCompleteExtra === "firstPlay" ? (
                <LazyLoadImage
                  src={images.pepeGaming}
                  effect="blur"
                  wrapperProps={{
                    style: {
                      transitionDelay: "0.5s",
                    },
                  }}
                />
              ) : (
                <LazyLoadImage
                  src={images.pepeGift}
                  effect="blur"
                  wrapperProps={{
                    style: {
                      transitionDelay: "0.5s",
                    },
                  }}
                />
              )}
            </Box>
            <Box sx={{ marginTop: "24px" }}>
              {typeCompleteExtra === "firstPlay" ? (
                <Typography
                  sx={{
                    fontSize: width < 576 ? "16px" : "16px",
                    color: "white",
                    fontWeight: "700",
                    lineHeight: "normal",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    textAlign: "center",
                  }}
                >
                  You finished your first game and gained{" "}
                  <Typography sx={{ color: "#7648ED" }} variant="outlined">
                    5 PROMOTION EXTRAS
                  </Typography>
                </Typography>
              ) : typeCompleteExtra === "doneStep1" ? (
                <Typography
                  sx={{
                    fontSize: width < 576 ? "16px" : "16px",
                    color: "white",
                    fontWeight: "700",
                    lineHeight: "normal",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    textAlign: "center",
                  }}
                >
                  You gained{" "}
                  <Typography sx={{ color: "#7648ED" }} variant="outlined">
                    5 PROMOTION EXTRAS
                  </Typography>{" "}
                  Promotion extras will be sent to you automatically.
                </Typography>
              ) : typeCompleteExtra === "doneStep2" ? (
                <Typography
                  sx={{
                    fontSize: width < 576 ? "16px" : "16px",
                    color: "white",
                    fontWeight: "700",
                    lineHeight: "normal",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    textAlign: "center",
                  }}
                >
                  You gained{" "}
                  <Typography sx={{ color: "#7648ED" }} variant="outlined">
                    10 PROMOTION EXTRAS
                  </Typography>{" "}
                  Promotion extras will be sent to you automatically.
                </Typography>
              ) : typeCompleteExtra === "secondPlay" ? (
                <Typography
                  sx={{
                    fontSize: width < 576 ? "16px" : "16px",
                    color: "white",
                    fontWeight: "700",
                    lineHeight: "normal",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    textAlign: "center",
                  }}
                >
                  You can not play game now.
                </Typography>
              ) : (
                <></>
              )}
              {typeCompleteExtra === "firstPlay" ? (
                <Typography
                  sx={{
                    fontSize: width < 576 ? "16px" : "16px",
                    color: "white",
                    fontWeight: "700",
                    lineHeight: "normal",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    textAlign: "center",
                    marginTop:"15px"
                  }}
                >
                  Complete profile to gain 10 PROMOTION EXTRAS
                </Typography>
              ) : typeCompleteExtra === "secondPlay" ? (
                <Typography
                  sx={{
                    fontSize: width < 576 ? "16px" : "16px",
                    color: "white",
                    fontWeight: "700",
                    lineHeight: "normal",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    textAlign: "center",
                    marginTop:"15px"
                  }}
                >
                  Complete profile now to get{" "}
                  <Typography sx={{ color: "#7648ED" }} variant="outlined">
                    10 PROMOTION EXTRAS
                  </Typography>{" "}
                  and gain access to our games.
                </Typography>
              ) : (
                <></>
              )}
            </Box>
          </Box>
          <DialogActions
            sx={{
              justifyContent: "center",
              marginTop: "24px",
              flexDirection: "column",
            }}
          >
            {typeCompleteExtra === "firstPlay" ? (
              <AnimButton
                onClick={() => handleFirstPlay()}
                type="primary"
                text="Complete Profile"
              />
            ) : typeCompleteExtra === "doneStep1" ? (
              <AnimButton
                onClick={() => handleDoneStep1()}
                type="primary"
                text="Confirm "
              />
            ) : typeCompleteExtra == "doneStep2" ? (
              <AnimButton
                onClick={() => handleDoneStep2()}
                type="primary"
                text="Confirm"
              />
            ) : typeCompleteExtra === "secondPlay" ? (
              <AnimButton
                onClick={() => handleSecondPlay()}
                type="primary"
                text="Complete Profile"
              />
            ) : (
              <></>
            )}
            <Box>
              {typeCompleteExtra === "firstPlay" ? (
                <Typography onClick={() => {
                  handleClose()
                }} sx={{ color: " #7848ED", cursor: "pointer" }}>
                  skip
                </Typography>
              ) : typeCompleteExtra === "secondPlay" ? (
                <Typography onClick={handleClose} sx={{ color: " #7848ED", cursor: "pointer" }}>
                  skip
                </Typography>
              ) : (
                <></>
              )}
            </Box>
          </DialogActions>
        </Box>
      </Dialog>
    </div>,
    document.body
  );
};

export default CompleteExtra;
