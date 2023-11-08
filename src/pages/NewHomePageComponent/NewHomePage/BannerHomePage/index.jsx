import { Box } from "@mui/system";
import React from "react";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import { imageHome, images } from "../../../../utils/images";
import FlipCountDownItem from "../../../../components/FlipCountDownItem/FlipCountDownItem";
import { Typography } from "@mui/material";
import "moment-timezone";

export default function BannerHomePage({ setBannerCountDown }) {
  const { width } = useWindowDimensions();
  const releaseTime = Date.parse("20 Nov 2023 00:00:00 CDT");
  return (
    <Box
      sx={{
        height: width < 576 ? "205px" : "360px",
        width: "100%",
        marginBottom: "24px",
        position: "relative",
      }}
    >
      <Box
        component={"img"}
        src={imageHome.BGBannerCountDown}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ marginBottom: width < 576 ? "8px" : "16px" }}>
          <FlipCountDownItem
            setBannerCountDown={setBannerCountDown}
            oncompl
            distance={releaseTime}
          />
        </Box>
        <Box sx={{ marginBottom: width < 576 ? "8px" : "24px" }}>
          <Typography
            sx={{ fontSize: width < 576 ? "12px" : "24px", color: "white" }}
          >
            UNTIL
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: width < 576 ? "24px" : "42px",
              fontWeight: 700,
              textShadow: "0px 30px 21px rgba(17, 20, 45, 0.60)",
              color: "white",
            }}
          >
            RELEASE DATE
          </Typography>
        </Box>
      </Box>
      <Box
        component={"img"}
        src={images.adminLogo}
        sx={{
          position: "absolute",
          width: width < 576 ? "20px" : "50px",
          height: width < 576 ? "20px" : "50px",
          objectFit: "cover",
          top: width < 576 ? "10px" : "20px",
          right: width < 576 ? "10px" : "20px",
        }}
      ></Box>
    </Box>
  );
}
