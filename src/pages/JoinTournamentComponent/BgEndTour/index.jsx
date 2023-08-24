import { Box, Typography } from "@mui/material";
import useWindowDimensions from "../../../utils/useWindowDimensions";

export default function BgEndGame() {
  const { width } = useWindowDimensions()
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: width < 576 ? 40 : 0,
          left: 0,
          width: "100%",
          height: width < 576 ? "315px" : "100%",
          backgroundColor: "#000000",
          zIndex: 1,
          opacity: 0.5,
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          top: 140,
          left: 0,
          width: "100%",
          zIndex: 2,
        }}
      >
        <Typography variant="h4" sx={{  color: "#fff",
            textAlign: "center",
            fontFamily: "Cyntho Next",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "normal",
            textTransform: "uppercase", }}>This tournament has ended</Typography>
      </Box>
    </>
  );
}
