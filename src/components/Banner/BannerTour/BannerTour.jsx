import { Box, Typography } from "@mui/material";
import React from "react";
import { imageHome } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { useNavigate } from "react-router-dom";
import CountDownBannerHot from "../../../pages/NewHomePageComponent/CountDownBannerHot";
import moment from "moment";

const BannerTour = (props) => {
  const {
    tournamentName,
    sponsorName,
    userAvatar,
    userName,
    endTime,
    userScore,
    tourId,
  } = props;
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "349px",
        width: "100%",
        background: `url(${imageHome.BannerTourBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "0 0 0 46px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              color: "white",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            {tournamentName}
          </Typography>
        </Box>
        <Box sx={{ marginBottom: "8px" }}>
          <Typography
            sx={{
              color: "white",
              textTransform: "uppercase",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            Tournament of the week
          </Typography>
        </Box>
        <Box sx={{ width: "380px", marginBottom: "12px" }}>
          <Typography
            sx={{
              width: "100%",
              fontSize: "80.176px",
              fontWeight: 800,
              textTransform: "uppercase",
              background: "linear-gradient(180deg, #FEE803 0%, #FD8700 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: "0.9",
              height: "140px",
              overflow: "hidden",
            }}
          >
            {tournamentName}
          </Typography>
        </Box>
        <Box sx={{ marginBottom: "8px" }}>
          <Typography
            sx={{
              color: "white",
              textTransform: "uppercase",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            Sponsor by: {sponsorName}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#300854",
            borderRadius: "5px",
            width: "326px",
            display: "flex",
            justifyContent: "space-between",
            padding: "12px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                color: "#FFF",
                textAlign: "start",
                fontSize: "24px",
                marginLeft: "0px !important",
                marginRight: "5px",
                fontWeight: 800,
              }}
            >
              <CountDownBannerHot
                expiryTime={moment(endTime || "20/10/2023")}
              />
            </Box>
          </Box>
          <button
            onClick={() => {
              navigate(`/tournamentDetail/${tourId}`);
            }}
            style={{
              background: "linear-gradient(270deg, #4AA1EC 0%, #5840E9 100%)",
              outline: "none",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
              padding: "0px 32px",
              fontSize: width < 1024 ? "12px" : "16px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Play now
          </button>
        </Box>
      </Box>
      <Box
        sx={{
          width: "440px",
          height: "100%",
          position: "relative",
          display: width < 1024 ? "none" : "flex",
          flexDirection: "column",
          alignItems: "center",
          marginRight: "24px",
        }}
      >
        <Box
          sx={{
            width: "fit-content",
            height: "200px",
            display: "flex",
            position: "absolute",
            top: "8%",
            zIndex: 100,
          }}
        >
          <Box
            sx={{
              width: "140px",
              height: "110px",
              background: `url(${imageHome.BannerTourScore})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              marginTop: "72px",
              display: "flex",
              alignItems: "center",
              justifyContent: ":center",
            }}
          >
            <Box
              sx={{
                marginLeft: "8px",
                marginTop: "-6px",
                transform: "rotate(-4deg)",
                textAlign: "center",
              }}
            >
              {" "}
              <Typography
                sx={{
                  textTransform: "uppercase",
                  color: "#4A8ED7",
                  fontSize: "16px",
                  fontWeight: 800,
                }}
              >
                Points
              </Typography>
              <Typography
                sx={{
                  textTransform: "uppercase",
                  color: "#FD7E08",
                  fontSize: "25px",
                  fontWeight: 800,
                }}
              >
                {userScore || 99999}
              </Typography>{" "}
            </Box>
          </Box>
          <Box
            sx={{
              width: useWindowDimensions().width > 1024 ? "168px" : "158px",
              height: useWindowDimensions().width > 1024 ? "187px" : "177px",
              border: "2px solid  rgba(246,212,0,1)",
              boxShadow: "0px 0px 0px 8px #f5c40c",
              borderRadius: "16px",
              transform: "rotate(-9.075deg)",
              marginLeft: "12px",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={userAvatar}
            ></img>
          </Box>
          <Box
            sx={{
              marginLeft: "24px",
              width: "94px",
              height: "123px",
              background: `url(${imageHome.BannerTourTop1})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></Box>
        </Box>
        <Box
          sx={{
            background: `url(${imageHome.BannerTourName})`,
            width: "324px",
            height: "137px",
            position: "relative",
            marginTop: "auto",
            marginBottom: "20px",
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              top: "85%",
              left: "45%",
              transform: "translate(-50%,-50%)",
              color: "#4A8ED7",
              fontSize: "20px",
              fontWeight: 800,
              textTransform: "uppercase",
            }}
          >
            {userName ? userName : "Super_"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BannerTour;