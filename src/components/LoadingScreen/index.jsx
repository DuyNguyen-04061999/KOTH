import {
  Box,
  Typography
} from "@mui/material";
import React from "react";
import { images } from "../../utils/images";

export default function LoadingScreen({ loadingProgression }) {
  return (
    <Box
      component={"div"}
      sx={{
        backgroundImage: `url(${images.bannerLoading})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100%",
        width: "100%",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        boxSizing: "border-box",
        paddingBottom: "50px",
        alignItems: "center",
        position: "absolute",
      }}
    >
      <Typography sx={{ color: "#00E8FF", fontSize: "25px" }}>
        {loadingProgression}%
      </Typography>
      <Typography
        sx={{
          color: "#fff",
          fontSize: "14px",
          fontWeight: "lighter !important",
        }}
      >
        Loading, Please wait ...
      </Typography>
    </Box>
  );
}
