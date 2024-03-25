import { Box, Skeleton } from "@mui/material";
import React from "react";

const ParagraphLoading = (props) => {
  const {
    lines = 5,
    bgColor = "rgba(255,255,255,0.5)",
    width = "100%",
    height = 16,
  } = props;
  const paragraphLoading = [];
  for (let i = 0; i < lines; i++) {
    paragraphLoading.push(
      <Box sx={{ marginBottom: "24px", width: width }} key={i}>
        <Skeleton width={"100%"} sx={{ bgcolor: bgColor }} height={height} />
        <Skeleton width={"80%"} sx={{ bgcolor: bgColor }} height={height} />
      </Box>
    );
  }
  return paragraphLoading;
};

export default ParagraphLoading;
