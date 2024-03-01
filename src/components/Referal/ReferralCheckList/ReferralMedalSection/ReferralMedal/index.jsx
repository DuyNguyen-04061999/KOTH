import { Box, Typography } from "@mui/material";
import React from "react";

export default function ReferralMedal({
  imgSrc,
  gradient,
  selected,
  index,
  name,
}) {
  return (
    <Box
      sx={
        selected !== index
          ? { backgroundImage: gradient, padding: "2px", borderRadius: "8px" }
          : {
              backgroundImage: gradient,
              padding: "4px",
              borderRadius: "8px",
            }
      }
    >
      <Box
        sx={{
          backgroundColor: "#0F041D",
          padding: "20px 10px",
          borderRadius: "8px",
          boxShadow:
            selected === index
              ? "0px 10px 18.3px 0px rgba(254, 196, 143, 0.3) inset"
              : "none",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: "cover",
            width: "148px",
            height: "146px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontSize: "14px",
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
