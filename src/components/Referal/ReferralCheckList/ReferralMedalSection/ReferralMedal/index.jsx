import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function ReferralMedal({
  imgSrc,
  gradient,
  selected,
  index,
  name,
}) {
  const { device } = useSelector((state) => state.deviceReducer);
  return (
    <Box
      sx={
        selected !== name
          ? {
              backgroundImage: gradient,
              padding: "2px",
              borderRadius: "8px",
              boxSizing: "border-box",
            }
          : {
              backgroundImage: gradient,
              padding: "4px",
              borderRadius: "8px",
              boxSizing: "border-box",
            }
      }
    >
      <Box
        sx={{
          backgroundColor: "#0F041D",
          padding: "20px 10px",
          borderRadius: "8px",
          boxShadow:
            selected === name
              ? "0px 10px 18.3px 0px rgba(254, 196, 143, 0.3) inset"
              : "none",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: "cover",
            width: device === "Mobile" ? "100px" : "148px",
            height: device === "Mobile" ? "100px" : "146px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontSize: device === "Mobile" ? "12px" : "14px",
              textTransform: "uppercase",
              fontWeight: "700",
            }}
          >
            {name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
