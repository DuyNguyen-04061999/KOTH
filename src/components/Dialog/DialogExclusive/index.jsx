import { Box, Dialog, DialogActions, Typography } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { closeDialogExclusive, closeDialogGif } from "../../../redux-saga-middleware/reducers/appReducer";
import { imageHome } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import AnimButton from "../../AnimButton";

const DialogExclusive = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.userReducer);
  const { isDialogExclusive } = useSelector((state) => state.appReducer);
  const handleClose = () => {
    dispatch(closeDialogExclusive())
  };

  const handleConfirm = () => {
    dispatch(closeDialogExclusive())
  };
  const { width } = useWindowDimensions();

  return ReactDOM.createPortal(
    <div>
      <Dialog
        open={isDialogExclusive}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        color="#352658"
        sx={{
          "MuiDialog-paper": {
            background: "#352658",
          },
        }}
      >
        <Box
          sx={{
            background: "#352658",
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
            <Box sx={{ marginTop: "8px" }}>
              <Typography
                sx={{
                  fontSize: width < 576 ? "16px" : "18px",
                  fontWeight: 800,
                  color: "white",
                  textTransform: "uppercase",
                }}
              >
                YOU HAVE REGISTERED!
              </Typography>
            </Box>
            <Box sx={{ position: "relative", width: "100%" }}>
              <LazyLoadImage
                src={imageHome.BannerGift}
                style={{ width: "100%" }}
                effect="blur"
                wrapperProps={{
                  style: {
                    transitionDelay: "0.5s",
                  },
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: "-32px",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: width < 576 ? "12px " : "16px",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    color: "white",
                  }}
                >
                  wish you a great experience on this website
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
              text="Continue"
            />
          </DialogActions>
        </Box>
      </Dialog>
    </div>,
    document.body
  );
};

export default DialogExclusive;
