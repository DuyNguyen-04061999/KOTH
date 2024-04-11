import { Box, Dialog, DialogActions, Typography } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { closeDialogGif } from "../../../redux-saga-middleware/reducers/appReducer";
import { imageHome, images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import AnimButton from "../../AnimButton";

const DialogGift = ({
  bonusName = "Value extra pack",
  bonusQuantity = 20,
  isSecondDay = false,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const { isDialogGif } = useSelector((state) => state.appReducer);

  const handleClose = () => {
    dispatch(closeDialogGif());
  };

  const handleConfirm = () => {
    dispatch(closeDialogGif());
  };
  const { width } = useWindowDimensions();

  return ReactDOM.createPortal(
    <div>
      <Dialog
        open={isDialogGif}
        fullScreen={width < 576 ? true : false}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        color="#352658"
        sx={{
          "MuiDialog-paper": {
            background: "#181223",
          },
          height: "100%",
          "& .MuiPaper-root": {
            backgroundColor: "#181223 !important",
            justifyContent:"center"
          },
        }}
      >
        <Box
          sx={{
            background: "#181223",
            padding: width < 576 ? "24px" : "36px",
            maxWidth: "420px",
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
            {/* <Box>
              <Typography
                sx={{
                  fontSize: width < 576 ? "12px" : "14px",
                  fontWeight: 800,
                  color: "white",
                }}
              >
                Welcome {isSecondDay} {user?.userNickName}!
              </Typography>
            </Box> */}
            <Box sx={{ marginTop: "8px" }}>
              <Typography
                sx={{
                  fontSize:'24px',
                  fontWeight: 700,
                  color: "white",
                  textAlign:"center",
                  fontStyle:"normal",
                  lineHeight:"normal",
                  textTransform:"capitalize"

                }}
              >
                Welcome To Play4Promo!
              </Typography>
            </Box>
            <Box sx={{ position: "relative", width: "100%" }} className="pt-3 pb-3">
              <LazyLoadImage
                src={images.pepeTicket}
                style={{ width: "100%" }}
                effect="blur"
                wrapperProps={{
                  style: {
                    transitionDelay: "0.5s",
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontSize: width < 576 ? "16px" : "16px",
                  fontWeight: "700",
                  color: "white",
                  lineHeight: "130%",
                  fontStyle:"normal",
                  whiteSpace:"nowrap",
                  textOverflow:"ellipsis"
                }}
              >
                Your temporary account name: {isSecondDay} {user?.userNickName}!
              </Typography>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Typography
                  sx={{
                    fontSize: width < 576 ? "16px" : "16px",
                    fontWeight: "700",
                    color: "white",
                    lineHeight: "130%",
                    fontStyle:"normal",
                    whiteSpace:"nowrap",
                    textOverflow:"ellipsis"
                  }}
                >
                  You gained
                </Typography>
                <Typography
                  sx={{
                    fontSize: width < 576 ? "16px" : "16px",
                    fontWeight: "800",
                    color: "#7848ED",
                    textTransform: "uppercase",
                    fontStyle:"normal",
                    whiteSpace:"nowrap",
                    textOverflow:"ellipsis"
                  }}
                >
                  5 PROMOTION EXTRAS
                </Typography>
              </Box>
              <Box
                sx={{
                  fontSize: width < 576 ? "16px" : "16px",
                  fontWeight: "700",
                  color: "white",
                  lineHeight: "130%",
                  fontStyle:"normal",
                  whiteSpace:"nowrap",
                  textOverflow:"ellipsis"
                }}
              >
                Complete profile to gain 10
                <Typography
                sx={{
                  fontSize: width < 576 ? "16px " : "16px",
                  fontWeight: "800",
                  textTransform: "uppercase",
                  color: "#7848ED",
                  textAlign:"center"
                }}
              >
                PROMOTION EXTRAS
              </Typography>
              </Box>
            </Box>
          </Box>
          <DialogActions
            sx={{
              justifyContent: "center",
              marginTop: "24px",
            }}
          >
            <AnimButton
              onClick={() => handleConfirm()}
              type="primary"
              text="Next"
            />
          </DialogActions>
        </Box>
      </Dialog>
    </div>,
    document.body
  );
};

export default DialogGift;
