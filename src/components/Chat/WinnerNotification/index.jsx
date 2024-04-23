import { Box } from "@mui/material";
import React from "react";
import { images, images2 } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";

export default function WinnerNotification({ winnerName, content, avatar }) {
  const { width } = useWindowDimensions();
  return (
    <Box
      className="mt-2"
      sx={{
        width: "100%",
        boxSizing: "border-box",
        maxWidth: width < 576 ? width - 100 : 250,
        padding: "8px",
        border: "2px solid #443565",
        borderRadius: "4px",
      }}
    >
      <Box
        sx={{
          display: "flex",
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
          src={
            avatar
              ? process.env.REACT_APP_SOCKET_SERVER + "/" + avatar
              : images.imageTutorial
          }
        ></Box>
        <Box sx={{ marginLeft: "5px" }}>
          <p style={{ color: "#fff", fontWeight: "700", fontSize: "12px" }}>
            CONGRATULATIONS!
          </p>
          <p style={{ color: "#7C81F2", fontSize: "12px", fontWeight: "700" }}>
            {winnerName || ""}
          </p>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          padding: "4px",
          marginTop: "8px",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Box
          sx={{ width: "50px", height: "50px" }}
          component={"img"}
          src={images.notiIcon}
        ></Box>
        <Box>
          {" "}
          <p style={{ color: "#fff", fontSize: "16px", textAlign: "center" }}>
            Won
          </p>
          <p
            style={{
              color: "#FFE524",
              fontSize: "12px",
              wordBreak: "break-word",
              textAlign: "center",
            }}
          >
            {content ? content?.replace("Won ", "") : ""}
          </p>
        </Box>{" "}
        <Box
          sx={{ width: "50px", height: "50px", transform: "scaleX(-1)" }}
          component={"img"}
          src={images.notiIcon}
        ></Box>
      </Box>
    </Box>
  );
}
