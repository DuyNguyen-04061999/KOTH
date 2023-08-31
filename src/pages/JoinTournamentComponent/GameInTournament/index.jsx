import { Box, Typography } from "@mui/material";
import { images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";

export default function GameInTournament(props) {
  const { game } = props;
  const { width } = useWindowDimensions();

  return (
    <>
      <Box
        sx={{
          backgroundColor: width > 576 ? "#1D1329" : "none",
          width: "100%",
          borderRadius: "12px",
        }}
        className={width < 576 ? "" : "rounded"}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: width < 576 ? "center" : "start",
            color: "white",
          }}
        >
          {width < 576 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "white",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Cyntho !important",
                  fontWeight: " 500 !important",
                  fontSize: "20px",
                }}
              >
                {game?.gameName || "Game Name"}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Cyntho Next",
                  fontWeight: "500 !important",
                  fontSize: "12px",
                }}
              >
                Game for tournament
              </Typography>
            </Box>
          ) : (
            ""
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <img
              src={
                game?.gameAvatar
                  ? process.env.REACT_APP_SOCKET_SERVER + "/" + game?.gameAvatar
                  : images.gameHotTournament
              }
              alt="..."
              width={576 < width && width < 1200 ? width / 14 : 120}
              height={576 < width && width < 1200 ? width / 14 : 120}
              style={{ borderRadius: "10px" }}
            />
            {width > 576 && (
              <Typography
                sx={{
                  fontSize:
                    576 < width && width < 1200 ? `${width / 40}px` : "30px",
                  marginLeft:
                    576 < width && width < 1200 ? "25px" : "32px !important",
                }}
              >
                {game?.gameName || "Game Name"}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
