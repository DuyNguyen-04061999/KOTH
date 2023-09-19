import { Box, Typography } from "@mui/material";
import React from "react";
import { imageHome } from "../../../utils/images";

const BannerWinMobile = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "208px",
        background: `url(${imageHome.BannerWinBgMobile})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "0 24px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "89px",
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            background: `url(${imageHome.BannerWinBigMobile})`,
            backgroundRepeat: "no-repeat",
            position: "relative",
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              top: "25%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: "100%",
              textAlign: "center",
              color: "#C52A0E",
              fontSize: "14px",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Big Tournament Winner
          </Typography>
        </Box>
        <Typography>Sponsor by: Samsung</Typography>
      </Box>
      <Box>
        <Box></Box>
        <Box></Box>
      </Box>
    </Box>
  );
};

export default BannerWinMobile;
