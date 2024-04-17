import { Box } from "@mui/material";
import React from "react";
import { images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";

export default function WinnerNotification() {
  const { width } = useWindowDimensions();
  return (
    <Box
      className="mt-2"
      sx={{
        width: "100%",
        boxSizing: "border-box",
        maxWidth: width < 576 ? width - 100 : 190,
        padding: "8px",
        border: "2px solid #443565",
        borderRadius: "4px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "32px",
            height: "32px",
            marginRight: "8px",
            borderRadius: "4px",
          }}
          component={"img"}
          src={images.imageTutorial}
        ></Box>
        <Box>
          <p style={{ color: "#fff", fontWeight: "700", fontSize: "12px" }}>
            CONGRATULATIONS!
          </p>
          <p style={{ color: "#7C81F2", fontSize: "12px", fontWeight: "700" }}>
            Feng
          </p>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          padding: "4px",
          backgroundColor: "#352658",
          marginTop: "8px",
          borderRadius: "4px",
        }}
      >
        <p style={{ color: "#fff", fontSize: "12px" }}>
          Won 2 Tickets to see Taylor Swift: The Eras Tour in New Orleans...
        </p>
      </Box>
    </Box>
  );
}
