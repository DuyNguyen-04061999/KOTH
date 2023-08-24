import { Box, Typography } from "@mui/material";
import { images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";

export default function GameInTournament(props) {
  const { game } = props
  const { width } = useWindowDimensions();

  return (
    <>
      <Box sx={{
        backgroundColor: width > 576 ?  '#1D1329' : "none",
        width: width < 576 ? '100%' : "85%"
      }} className={width < 576 ? "rounded d-flex justify-content-center" : "rounded"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: width < 576 ? "center" : "start",
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
              <Typography variant="h5">{game?.gameName || "Game Name"}</Typography>
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
            alignItems:"center",
            justifyContent: 'center'
          }}>
            <img
              src={game?.gameAvatar ? process.env.REACT_APP_SOCKET_SERVER + "/" + game?.gameAvatar : images.gameHotTournament}
              alt="..."
              width={150}
              height={150}
              style={{ borderRadius: "10px" }}
              className="mt-2"
            />
            {width > 576 ? (
                 <Typography className={width > 576 ? "ms-2" : "ms-0"} variant="h5">{game?.gameName || "Game Name"}</Typography>
            ) : ""}
          </Box>
        </Box>
      </Box>
    </>
  );
}
