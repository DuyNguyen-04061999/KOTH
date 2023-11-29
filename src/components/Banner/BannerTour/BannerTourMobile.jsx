import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React from "react";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router";
import CountDownBannerHot from "../../../pages/NewHomePageComponent/CountDownBannerHot";
import { imageHome } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";

const BannerTourMobile = (props) => {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const {
    tournamentName,
    rewardName,
    userAvatar,
    userName,
    endTime,
    userScore,
    tourId,
  } = props;
  return (
    <LazyLoadComponent>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "214px",
          background: `url(${imageHome.BannerTourBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "0 8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "190px",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              padding: "4px",
              backgroundColor: "#FD9800",
              borderRadius: "10px",
              width: "160px",
            }}
          >
            <Typography
              sx={{
                fontSize: "10px",
                color: "white",
                fontWeight: 700,
                paddingLeft: "5px",
                paddingRight: "5px",
                lineHeight: 1.5,
              }}
            >
              Promotion of the week
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "11px",
                color: "white",
                fontWeight: 500,
                textTransform: "uppercase",
                height: "38px",
                overflow: "hidden",
                marginTop: "5px",
                lineHeight: 1.5,
              }}
            >
              {tournamentName
                ? tournamentName
                : "Galaxy Quest: Win a Z Flip 5 Galaxy"}
            </Typography>
          </Box>

          <Box sx={{ width: "180px", marginBottom: "12px" }}>
            <Typography
              sx={{
                width: "100%",
                fontSize: "22px",
                fontWeight: 700,
                textTransform: "uppercase",
                background: "linear-gradient(180deg, #FEE803 0%, #FD8700 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: "0.9",
                height: "38px",
                overflow: "hidden",
                marginTop: "10px",
              }}
            >
              {rewardName ? rewardName : "Galaxy Quest: Win a Z Flip 5 Galaxy"}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#300854",
              borderRadius: "5px",
              width: "fit-content",
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
                  fontSize: "12px",
                  marginLeft: "0px !important",
                  marginRight: "5px",
                  fontWeight: 800,
                }}
              >
                <CountDownBannerHot
                  expiryTime={moment(endTime || "2024-09-08T01:30:00.000Z")}
                />
              </Box>
            </Box>
            <button
              onClick={() => {
                if (tourId !== "undefined") {
                  navigate(`/tournamentDetail/${tourId}`);
                }
              }}
              style={{
                background: "linear-gradient(270deg, #4AA1EC 0%, #5840E9 100%)",
                outline: "none",
                border: "none",
                borderRadius: "5px",
                color: "#fff",
                padding: "4px",
                fontSize: "10px",
                cursor: "pointer",
                fontWeight: 600,
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              Play now
            </button>
          </Box>
        </Box>
        <Box
          sx={{
            width: "fit-content",
            height: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "fit-content",
              height: "200px",
              display: "flex",
              position: "absolute",
              top: "26%",
              zIndex: 100,
            }}
          >
            <Box
              sx={{
                width: "58px",
                height: "49px",
                background: `url(${imageHome.BannerTourScore})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: width > 425 ? "flex" : "none",
                alignItems: "center",
                justifyContent: "flex-start",
                position: "absolute",
                top: "-20px",
                left: "-50px",
                zIndex: 10,
              }}
            >
              <Box
                sx={{
                  transform: "rotate(-4deg)",
                  textAlign: "center",
                }}
              >
                {" "}
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    color: "#4A8ED7",
                    fontSize: "6.292px",
                    fontWeight: 800,
                  }}
                >
                  Points
                </Typography>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    color: "#FD7E08",
                    fontSize: "9.832px",
                    fontWeight: 800,
                  }}
                >
                  {userScore || 99999}
                </Typography>{" "}
              </Box>
            </Box>
            <Box
              sx={{
                width: "69px",
                height: "78px",
                border: "2px solid  rgba(246,212,0,1)",
                boxShadow: "0px 0px 0px 8px #f5c40c",
                borderRadius: "16px",
                transform: "rotate(-9.075deg)",
              }}
            >
              <LazyLoadImage
                alt="..."
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "14px",
                }}
                src={userAvatar || imageHome.BannerWinAva}
                effect="blur"
                wrapperProps={{
                  style: {
                    transitionDelay: "0.5s",
                  },
                }}
              ></LazyLoadImage>
            </Box>
            <Box
              sx={{
                width: "34px",
                height: "45px",
                background: `url(${imageHome.BannerTourTop1})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "absolute",
                top: "-20px",
                right: "-40px",
                display: width > 425 ? "block" : "none",
              }}
            ></Box>
          </Box>
          <Box
            sx={{
              background: `url(${imageHome.BannerTourName})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
              width: "135px",
              height: "57px",
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
                fontSize: "10px",
                fontWeight: 800,
                textTransform: "uppercase",
                width: "max-content",
              }}
            >
              {userName || "SUPER_"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </LazyLoadComponent>
  );
};

export default BannerTourMobile;
