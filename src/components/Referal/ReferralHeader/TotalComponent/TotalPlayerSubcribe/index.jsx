import { Box, Typography } from "@mui/material";
import React from "react";
import { imagesReferral } from "../../../../../utils/imagesReferral";
import { useSelector } from "react-redux";

export default function TotalPlayerSubcribe() {
  const { registerList } = useSelector((state) => state.referralReducer);
  const { device } = useSelector((state) => state.deviceReducer);
  return (
    <Box sx={{ position: "relative", height: "130px", width: "30%" }}>
      <Box
        sx={{
          width: "93px",
          height: "93px",
          backgroundImage: `url(${imagesReferral.totalPlayerIcon})`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          color: "#9D50E3",
          fontWeight: "700",
          position: "relative",
          zIndex: 2,
        }}
      >
        {
          registerList?.filter((n) => {
            return n.hasBuySubscription === true;
          })?.length
        }
      </Box>
      <Box
        sx={{
          width: "89px",
          height: "42px",
          backgroundImage: `url(${imagesReferral.iconFooter})`,
          backgroundPositionY: "0px",
          position: "absolute",
          bottom: "10px",
          zIndex: 1,
          left: "2px",
        }}
      ></Box>
      <Box
        sx={{
          backgroundColor: "rgba(68, 53, 101, 0.70)",
          backdropFilter: "blur(4.099999904632568px)",
          color: "#fff",
          width: "117px",
          position: "absolute",
          zIndex: 2,
          left: "-8px",
          borderRadius: "4px",
          // padding: "3px",
        }}
      >
        <Typography
          sx={{
            fontSize: device === "Mobile" ? "10px" : "12px",
            marginLeft: "0px !important",
          }}
        >
          Total Players Subscribed
        </Typography>
      </Box>
    </Box>
  );
}
