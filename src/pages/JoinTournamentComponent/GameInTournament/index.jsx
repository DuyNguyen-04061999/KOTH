import { Box, Typography } from "@mui/material";
import { images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";

export default function GameInTournament() {
  const { width } = useWindowDimensions();

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "white",
          }}
        >
          {width < 576 ? (
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "white",
            }}>
              <Typography variant="h5">Ping Pong</Typography>
              <Typography
                variant="body1"
                sx={{ fontFamily: "Cyntho", fontWeight: "500 !important" }}
              >
                Game for tournament
              </Typography>
            </Box>
          ) : (
            ""
          )}
          <Box sx={{
            display:"flex",
            alignItems:"center"
          }}>
            <img
              src={images.gameHotTournament}
              alt="..."
              width={150}
              height={150}
              style={{ borderRadius: "10px" }}
              className="mt-2"
            />
            {width > 576 ? (
                 <Typography variant="h5">Ping Pong</Typography>
            ) : ""}
          </Box>
        </Box>
      </Box>
    </>
  );
}
