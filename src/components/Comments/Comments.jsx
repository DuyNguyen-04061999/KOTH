import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import CommentItem from "./CommentItem";
import { images } from "../../utils/images";
import FullCommnet from "./FullCommnet";
import useWindowDimensions from "../../utils/useWindowDimensions";

export default function Comments() {
  const [open, setOpen] = useState(false);
  const { width } = useWindowDimensions();
  return (
    <Box
      sx={{
        padding: "16px 25px",
        boxSizing: "border-box",
        width: "100%",
        backgroundColor: "#1D1329",
        borderRadius: "12px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {" "}
        <Typography
          sx={{
            color: "#fff",
            fontWeight: "700",
            textAlign: "start",
            marginLeft: "0px !important",
            fontSize: width < 576 ? "14px" : "16px",
          }}
        >
          Comments
        </Typography>
        <Box
          onClick={() => {
            setOpen(true);
          }}
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <Box
            sx={{ color: "#BE48ED", fontSize: width < 576 ? "12px" : "14px" }}
          >
            View all
          </Box>
          <Box
            sx={{
              width: width < 576 ? "10px" : "12px",
              height: width < 576 ? "10px" : "12px",
              marginLeft: "5px",
            }}
            component={"img"}
            src={images.viewAllButton}
          ></Box>
        </Box>
      </Box>
      <CommentItem type="other" />
      <CommentItem type="other" />
      <CommentItem type="other" />
      <CommentItem type="other" />
      <FullCommnet
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </Box>
  );
}
