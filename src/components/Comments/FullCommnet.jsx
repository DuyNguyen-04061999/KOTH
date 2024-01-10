import { Box, Dialog, Typography } from "@mui/material";
import React from "react";
import { images } from "../../utils/images";
import CommentItem from "./CommentItem";
import useWindowDimensions from "../../utils/useWindowDimensions";

export default function FullCommnet(props) {
  const { open, onClose } = props;
  const { width } = useWindowDimensions();
  return (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: "#1D1329",
          boxShadow: "none",
          width: "100%",
          padding: "16px 25px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        },
      }}
      fullScreen={width < 576 ? true : false}
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: width < 576 ? "16px" : "20px",
            color: "#fff",
            fontWeight: "700",
          }}
        >
          Comments
        </Typography>
        <Box
          onClick={onClose}
          sx={{ width: "20px", height: "20px", cursor: "pointer" }}
          component={"img"}
          src={images.closeButtonInvite}
        ></Box>
      </Box>
      <CommentItem type="personal" />
      <Box
        sx={{
          width: "100%",
          height: "1px",
          border: "0.5px solid #9384B7",
          margin: "30px 0px 0px ",
        }}
      ></Box>
      <Box
        sx={{
          height: "400px",
          overflow: "auto",
          "&::-webkit-scrollbar": { width: "2px" },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": { background: "#888" },
          marginTop: "10px",
          flexGrow: 1,
        }}
      >
        {" "}
        {[1, 2, 3, 1, 1, 1].map((item) => {
          return <CommentItem type="other" />;
        })}
      </Box>
    </Dialog>
  );
}
