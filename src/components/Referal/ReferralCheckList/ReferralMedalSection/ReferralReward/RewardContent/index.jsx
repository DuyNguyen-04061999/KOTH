import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function RewardContent({ content, imgSrc }) {
  const { device } = useSelector((state) => state.deviceReducer);

  const textStyle = {
    textAlign: "start",
    marginLeft: "0px !important",
  };
  return (
    <Box
      sx={{
        width: "100%",
        border: "2px solid #374151",
        borderRadius: "8px",
        boxSizing: "bordr-box",
        padding: "5px 10px",
        marginTop: "5px",
        display: "flex",
        justifyContent: device === "Mobile" ? "space-between" : "center",
        alignItems: "center",
        height: "100px",
      }}
    >
      <Box
        sx={{ width: "80px", height: "auto" }}
        component={"img"}
        src={imgSrc}
      ></Box>
      <Box sx={{ width: device === "Mobile" ? "100%" : "80%" }}>
        <Typography
          sx={{
            ...textStyle,
            color: "#fff",
            fontSize: device === "Mobile" ? "12px" : "14px",
            wordWrap: "break-word",
          }}
        >
          {content}
        </Typography>
      </Box>
    </Box>
  );
}
