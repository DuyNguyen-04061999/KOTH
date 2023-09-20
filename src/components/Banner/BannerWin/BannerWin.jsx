import { useSelector } from "react-redux";
import CountDownBannerHot from "../../../pages/NewHomePageComponent/index";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import moment from "moment/moment";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { imageHome } from "../../../utils/images";

export default function BannerWin() {
  const { width } = useWindowDimensions();
  const { biggestEndTour, hotWeekTour } = useSelector(
    (state) => state.tournamentReducer
  );

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: `url(${imageHome.BannerWinBg})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat:"no-repeat",
        width: "100%",
        height: "349px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 6%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: useWindowDimensions().width > 1200 ? "9%" : "4%",
        }}
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
              position: "relative",
              width: "100%",
              height: "100%",
              border: "2px solid #f9d465",
              overflow: "hidden",
            }}
          >
            <img
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                width: "105%",
                height: "105%",
                objectFit: "cover",
                borderRadius: "16px",
              }}
              src={imageHome.BannerWinAva}
            ></img>
          </Box>
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
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "405px",
            height: "89px",
            backgroundImage: `url(${imageHome.BannerWinBig})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            marginTop: "30px",
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              top: "35%",
              left: "49%",
              transform: "translate(-50%,-50%)",
              fontSize: "20px",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#C52A0E",
              width: "max-content",
            }}
          >
            Big Tournament Winner
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              textTransform: "uppercase",
              color: "white",
              fontWeight: 700,
              fontSize: "14px",
              marginTop:"-8px"
            }}
          >
            Sponsor by: Samsung
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "56%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            zIndex: 10,
            width:"271px",
            textTransform:"uppercase"
          }}
        >
          <Typography
            sx={{
              fontSize: "52px",
              color: "transparent",
              WebkitTextStroke: "4px #ED3B14",
              width: "100%",
              position: "relative",
              fontWeight:800,
              wordWrap: "break-word",
              textTransform:"uppercase"
            }}
          >
            Galaxy Z-Flip 5
            <Typography
              sx={{
                fontWeight:800,
                position: "absolute",
                top: "50%",
                left: "49%",
                transform: "translate(-50%,-50%)",
                fontSize: "52px",
                color: "white",
                WebkitTextStroke: "2px rgba(251, 176, 21, 1)  ",
                width: "100%",
                wordWrap: "break-word"
              }}
            >
            Galaxy Z-Flip 5
            </Typography>
          </Typography>
        </Box>
        <Box
          sx={{
            width: "405px",
            height: "105px",
            background: `url(${imageHome.BannerWinCeleb})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            marginTop: "96px",
            marginBottom: "24px",
            wordWrap: "break-word"
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              color: "#FFC56F",
              fontSize: "19.714px",
              fontWeight: 700,
              top: "75%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: "max-content",
            }}
          >
            Celebrating Our Lucky Champion!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
