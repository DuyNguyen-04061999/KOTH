import { useSelector } from "react-redux";
import CountDownBannerHot from "../../../pages/NewHomePageComponent/index";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import moment from "moment/moment";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { imageDesktop, imageHome, images } from "../../../utils/images";

export default function BannerWin() {
  const { width } = useWindowDimensions();
  const { biggestEndTour, hotWeekTour } = useSelector(
    (state) => state.tournamentReducer
  );
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: "grey",
        width: "100%",
        height: "349px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 10%"
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box
          sx={{
            width: "200px",
            height: "200px",
            border: "10px solid #f5c500",
            borderRadius: "16px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              border: "2px solid #f9d465",
            }}
            component={"img"}
            src={images.Bitcoin}
          ></Box>
        </Box>
        <Box
          sx={{
            marginTop: "12px",
            border: "2px solid #7C81F2",
            borderRadius: "8px",
            width: "229px",
            height: "46px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(108, 5, 189, 0.60)",
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              color: "#FFF8B7",
              fontWeight: 800,
              textTransform: "uppercase",
              margin: "0 !important",
            }}
          >
            {" "}
            Ana belle 3333
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box sx={{width: "405px", height: "89px"}}>
          <Typography>Big Tournament Winner</Typography>
        </Box>
        <Box>
          <Typography>Sponsor by: Samsung</Typography>
        </Box>
        <Box  sx={{width: "271px", height: "130px"}}>
          <Typography sx={{fontSize:"54.492px",color:"white", WebkitTextStroke:"2px #ED3B14"}}>Galaxy Z-Flip 5</Typography>
        </Box>
        <Box  sx={{width: "405px", height: "105px"}}>
          <Typography>Celebrating Our Lucky Champion!</Typography>
        </Box>
      </Box>
    </Box>
  );
}
