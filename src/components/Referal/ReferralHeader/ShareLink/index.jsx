import { Box, Typography } from "@mui/material";
import React from "react";
import { imagesReferral } from "../../../../utils/imagesReferral";
import { useDispatch, useSelector } from "react-redux";
import { openShareDialog } from "../../../../redux-saga-middleware/reducers/referralReducer";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { images } from "../../../../utils/images";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import { sliceString } from "../../../../utils/stringSlice";
export default function ShareLink() {
  const { width } = useWindowDimensions();
  const { device } = useSelector((state) => state.deviceReducer);
  const { user } = useSelector((state) => state.userReducer);
  const currentUrl = window.location.href;
  const copyref = `${currentUrl?.replace("/referral", "")}/influencers/${
    user?.userName || ""
  }`;
  const { orientation } = useSelector((state) => state.gameReducer);
  const dispatch = useDispatch();
  const limitString = () => {
    if (
      device === "Mobile" ||
      (device === "Tablet" && orientation === "landscape")
    ) {
      return 20;
    } else if (
      device === "Desktop" ||
      (device === "Tablet" && orientation === "portrait")
    ) {
      return 30;
    }
  };
  return (
    <Box sx={{ marginTop: "12px" }}>
      {device !== "Mobile" && (
        <Typography
          sx={{
            marginLeft: "0px !important",
            color: "#fff",
            textAlign: "start",
            marginBottom: "5px !important",
          }}
        >
          Page Link
        </Typography>
      )}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Box sx={{ display: "flex", width: "69%" }}>
          <Box
            sx={{
              backgroundColor: "#3D2D53",
              color: "#fff",
              fontSize: "12px",
              borderRadius: "5px 0px 0px 5px",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              overflowX: "hidden",
              boxSizing: "border-box",
            }}
          >
            {sliceString(copyref, limitString())}
          </Box>
          <Box
            sx={{
              padding: device === "Mobile" ? "5px 10px" : "10px 20px",
              backgroundColor: "#7848ED",
              borderRadius: "0px 5px 5px 0px",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{ width: device === "Mobile" ? "15px" : "auto" }}
              onClick={() => {
                copy(copyref);
                toast.success("Copy link successfully!", {
                  icon: ({ theme, type }) => (
                    <img
                      style={{ width: "20px", marginRight: "10px" }}
                      alt="..."
                      src={images.successIcon}
                    />
                  ),
                  position: "top-center",
                  className:
                    width < 576
                      ? "success-background-small"
                      : "success-background",
                });
              }}
              component={"img"}
              src={imagesReferral.copyIcon}
            ></Box>
          </Box>
        </Box>
        <button
          onClick={() => {
            dispatch(openShareDialog());
          }}
          style={{
            backgroundColor: "#7848ED",
            border: "none",
            outline: "none",
            borderRadius: "3px",
            padding: device === "Mobile" ? "5px" : "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "28%",
          }}
        >
          <Box component={"img"} src={imagesReferral.LinkIcon}></Box>
          {device !== "Mobile" && (
            <Typography
              sx={{
                color: "#fff",
                marginLeft: "10px !important",
                fontWeight: "500",
                fontSize: "12px",
              }}
            >
              Share link
            </Typography>
          )}
        </button>
      </Box>
    </Box>
  );
}
