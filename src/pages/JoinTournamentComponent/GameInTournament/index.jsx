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
       {width < 576 ? (
         <Typography
         variant="body1"
         sx={{
           fontWeight: "700 !important",
           fontSize: "14px",
           textAlign: "left",
           color: "white",
           marginLeft:"0px !important",
           marginTop:"10px"
         }}
       >
         Game for promotion
       </Typography>
       ) :("")}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: width < 576 ? "center" : "start",
            color: "white",
           
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: width < 576 ? "column" : "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop:"10px",
              padding:width < 576 ? "0px" : "15px 10px 15px 10px"
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
              style={{ borderRadius: "10px", marginBottom:"5px" }}
            />
            {width < 576 ? (<Typography
              sx={{
                // fontFamily: "Cyntho !important",
                fontWeight: "700 !important",
                fontSize: "20px",
                color: "#7C81F2",
              }}
            >
              {game?.gameName || "Game Name"}
            </Typography>) : ("")}
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
