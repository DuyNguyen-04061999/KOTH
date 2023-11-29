import { Box, Dialog, DialogActions, Typography } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { imageHome } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import AnimButton from "../../AnimButton";

const DialogGift = () => {
  const { isReVerifyAccount, user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const handleClose = () => {};

  const handleConfirm = () => {};
  const { width } = useWindowDimensions();

  return ReactDOM.createPortal(
    <div>
      <Dialog
        open={false}
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
            <Box>
              <Typography
                sx={{
                  fontSize: width < 576 ? "12px" : "14px",
                  fontWeight: 800,
                  color: "white",
                }}
              >
                Welcome {user?.userNickName}!
              </Typography>
            </Box>
            <Box sx={{ marginTop: "8px" }}>
              <Typography
                sx={{
                  fontSize: width < 576 ? "16px" : "18px",
                  fontWeight: 800,
                  color: "white",
                  textTransform: "uppercase",
                }}
              >
                Your Special Gift Awaits!
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
                    fontSize: width < 576 ? "20px" : "26px",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    color: "white",
                  }}
                >
                  20 bonus extras
                </Typography>
                <Typography
                  sx={{
                    fontSize: width < 576 ? "12px " : "16px",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    color: "white",
                  }}
                >
                  Value extra pack
                </Typography>
              </Box>
            </Box>
            <Box sx={{ marginTop: "24px" }}>
              <Typography
                sx={{
                  fontSize: width < 576 ? "10px" : "14px",
                  color: "#9384B7",
                }}
              >
                We're thrilled to have you here! To kick off your journey, we're
                gifting you Value extra pack with 20 bonus extras. Use them
                across any promotion to compete and unlock rewards. Click 'Claim
                Now' to get your exclusive offer!
              </Typography>
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
              text="Claim Now"
            />
          </DialogActions>
        </Box>
      </Dialog>
    </div>,
    document.body
  );
};

export default DialogGift;
