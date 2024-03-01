import { Box, Typography } from "@mui/material";
import React from "react";
import { imagesReferral } from "../../../../utils/imagesReferral";

export default function ShareLink() {
  return (
    <Box>
      <Typography
        sx={{
          marginLeft: "0px !important",
          color: "#fff",
          textAlign: "start",
          marginBottom: "5px !important",
        }}
      >
        Page Link
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              backgroundColor: "#3D2D53",
              color: "#fff",
              fontSize: "12px",
              borderRadius: "5px 0px 0px 5px",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            https://www.play4promo/tournament
          </Box>
          <Box
            sx={{
              padding: "10px",
              backgroundColor: "#7848ED",
              borderRadius: "0px 5px 5px 0px",
            }}
          >
            <Box component={"img"} src={imagesReferral.copyIcon}></Box>
          </Box>
        </Box>
        <button
          style={{
            backgroundColor: "#7848ED",
            border: "none",
            outline: "none",
            borderRadius: "3px",
            padding: "10px 15px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box component={"img"} src={imagesReferral.LinkIcon}></Box>
          <Typography
            sx={{
              color: "#fff",
              marginLeft: "10px !important",
              fontWeight: "500",
              fontSize: "12px",
            }}
          >
            Share link
          </Typography>
        </button>
      </Box>
    </Box>
  );
}
