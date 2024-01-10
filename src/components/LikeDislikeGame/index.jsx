import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { imageHome } from "../../utils/images";
export default function LikeDislikeGame() {
  const [isLike, setIsLike] = useState(false);
  const [isDisLike, setIsDisLike] = useState(false);
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{ width: "20px", height: "20px" }}
          component={"img"}
          src={!isLike ? imageHome.passiveLike : imageHome.activeLike}
        ></Box>
        <Typography sx={{ color: isLike ? "#F05153" : "#979797" }}>
          50
        </Typography>
      </Box>
      <Box
        sx={{
          width: "2px",
          height: "16px",
          backgroundColor: "#979797",
          margin: "0px 12px",
        }}
      ></Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{ width: "20px", height: "20px" }}
          component={"img"}
          src={!isDisLike ? imageHome.passiveDisLike : imageHome.activeDisLike}
        ></Box>
        <Typography sx={{ color: isDisLike ? "#F05153" : "#979797" }}>
          50
        </Typography>
      </Box>{" "}
    </Box>
  );
}
