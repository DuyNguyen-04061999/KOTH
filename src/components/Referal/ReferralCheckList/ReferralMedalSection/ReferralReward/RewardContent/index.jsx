import { Box, Typography } from "@mui/material";
import React from "react";

export default function RewardContent({ content, imgSrc }) {
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
        justifyContent: "center",
        alignItems: "center",
        height: "100px",
      }}
    >
      <Box sx={{ width: "20%" }}>
        <Box
          sx={{ width: "80px", height: "auto" }}
          component={"img"}
          src={imgSrc}
        ></Box>
      </Box>
      <Box sx={{ width: "80%" }}>
        {" "}
        <Typography
          sx={{
            ...textStyle,
            color: "#fff",
            fontSize: "14px",
            wordWrap: "break-word",
          }}
        >
          {content}
        </Typography>
      </Box>
    </Box>
  );
}
