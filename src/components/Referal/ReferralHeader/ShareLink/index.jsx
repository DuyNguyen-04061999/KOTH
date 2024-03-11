import { Box, Typography } from "@mui/material";
import React from "react";
import { imagesReferral } from "../../../../utils/imagesReferral";
import { useDispatch, useSelector } from "react-redux";
import { openShareDialog } from "../../../../redux-saga-middleware/reducers/referralReducer";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { images } from "../../../../utils/images";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
export default function ShareLink() {
  const { width, height } = useWindowDimensions();
  const { device } = useSelector((state) => state.deviceReducer);

  const dispatch = useDispatch();
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
            }}
          >
            https://play4promo.com/
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
                copy("https://play4promo.com/");
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
            width: "30%",
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
