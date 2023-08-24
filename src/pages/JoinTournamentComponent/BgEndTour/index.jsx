import { Box, Typography } from "@mui/material";

export default function BgEndGame() {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 40,
          left: 0,
          width: "100%",
          height: "315px",
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
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            textAlign: "center",
            fontFamily: "Cyntho Next",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "normal",
            textTransform: "uppercase",
          }}
        >
          End Game
        </Typography>
      </Box>
    </>
  );
}
