import { Box, Container, Typography } from "@mui/material";
import React from "react";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import {
  getFontSizeBigTitleDependOnWidth,
  getFontSizeTitleDependOnWidth,
} from "../../../utils/config";
export default function JoinTournament() {
  const { width } = useWindowDimensions();
  return (
    <Container maxWidth="lg" sx={{ paddingTop: "50px" }}>
      <Box
        sx={{
          backgroundColor: "white",
          width: "100%",
          height: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: width / 7,
            boxSizing: "border-box",
            padding: `${parseFloat(width / 51.9)}px`,
            backgroundColor: "lightgray",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: width / 7 - parseFloat(width / 51.9),
              height: "100%",
              backgroundColor: "black",
            }}
          >
            {parseFloat(width / 51.9)}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontSize: getFontSizeTitleDependOnWidth(width) }}>
              Welcome to the
            </Typography>
            <Typography
              sx={{
                fontSize: getFontSizeBigTitleDependOnWidth(width),
                fontWeight: "bolder",
              }}
            >
              LEADER CUP #8
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <button
              style={{
                padding: `${parseFloat(width / 106.67)}px ${parseFloat(
                  width / 27.4
                )}px`,
                borderRadius: "5px",
                border: "none",
                outline: "none",
                backgroundColor: "black",
                color: "white",
              }}
            >
              Join
            </button>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: parseFloat(width / 18.8),
            boxSizing: parseFloat(width / 43.63),
            //66 43.6
            padding: `${parseFloat(width / 66)}px ${parseFloat(
              width / 43.6
            )}px`,
          }}
        >
          <Box></Box>
          <Box></Box>
        </Box>
        <Box></Box>
      </Box>
    </Container>
  );
}
