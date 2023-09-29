import { Dialog, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React from "react";
import { images } from "../../../../utils/images";

export default function GamePreview() {
  return (
    <Box sx={{ padding: "28px 28px 0px 28px" }}>
      <Typography
        sx={{
          color: "#fff",
          fontWeight: "600 !important",
          fontSize: "14px",
          marginLeft: "0px",
        }}
      >
        Game Preview
      </Typography>
      <ScrollingCarousel>
        <Box sx={{ boxSizing: "border-box", padding: "8px" }}>
          <Box component={"img"} src={images.GamePreview1}></Box>
        </Box>
        <Box sx={{ boxSizing: "border-box", padding: "8px" }}>
          <Box component={"img"} src={images.GamePreview1}></Box>
        </Box>
        <Box sx={{ boxSizing: "border-box", padding: "8px" }}>
          <Box component={"img"} src={images.GamePreview1}></Box>
        </Box>
        <Box sx={{ boxSizing: "border-box", padding: "8px" }}>
          <Box component={"img"} src={images.GamePreview3}></Box>
        </Box>
        <Box sx={{ boxSizing: "border-box", padding: "8px" }}>
          <Box component={"img"} src={images.GamePreview3}></Box>
        </Box>
      </ScrollingCarousel>
      <Dialog open={true} sx={{ zIndex: "100000" }}>
        <Box
          sx={{ width: "", height: "" }}
          component={"img"}
          src={images.GamePreview3}
        ></Box>
      </Dialog>
    </Box>
  );
}
