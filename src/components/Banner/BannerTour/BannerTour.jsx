import { Box, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import CountDownBannerHot from "../../../pages/NewHomePageComponent/CountDownBannerHot";
import { imageHome } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { useSelector } from "react-redux";

const BannerTour = (props) => {
  const { rewardName, userAvatar, userName, endTime, userScore, tourId } =
    props;
  const { device } = useSelector((state) => state.deviceReducer);
  const navigate = useNavigate();
  const defaultRewardName = "NAME OF PROMOTION REWARD";
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "324px",
        width: "100%",
        background: `url(${
          device === "Tablet"
            ? imageHome.christmasMobileBanner
            : imageHome.christmasBanner
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: device === "Tablet" ? "20px" : "30px 0 30px 46px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
          width: "50%",
        }}
      >
        <Box>
          <Box
            sx={{
              padding: device === "Tablet" ? "3px 10px" : "6px 15px",
              backgroundColor: "#496BB4",
              borderRadius: "20px",
            }}
          >
            <Typography
              sx={{
                color: "white",
                textTransform: "uppercase",
                fontSize: device === "Tablet" ? "15px" : "20px",
                fontWeight: 700,
                lineHeight: 1.5,
              }}
            >
              Promotion of the week
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: device === "Tablet" ? "15px" : "20px",
                color: "#F6B403",
                fontWeight: 500,
                textTransform: "uppercase",
                lineHeight: 1.5,
                marginTop: "10px",
              }}
            >
              SPONSORED BY: PLAY 4 PROMO
            </Typography>
          </Box>
        </Box>

        {/* <Box>
          <Typography
            sx={{
              fontSize: "20px",
              color: "white",
              fontWeight: 700,
              textTransform: "uppercase",
              lineHeight: 1.5,
              marginTop: "10px",
            }}
          >
            {tournamentName}
          </Typography>
        </Box> */}

        <Box sx={{ marginBottom: "0px", marginTop: "12px" }}>
          <Typography
            sx={{
              width: "100%",
              fontSize: device === "Tablet" ? "24px" : "40px",
              fontWeight: "700",
              textTransform: "uppercase",
              // background: "linear-gradient(180deg, #FEE803 0%, #FD8700 100%)",
              // backgroundClip: "text",
              // WebkitBackgroundClip: "text",
              // WebkitTextFillColor: "transparent",
              lineHeight: "50px",
              overflow: "hidden",
              textAlign: "center",
              color: "#fff",
              wordBreak: "break-word",
            }}
          >
            {(rewardName || defaultRewardName).length > 45
              ? (rewardName || defaultRewardName).slice(0, 40) + " ..."
              : rewardName || defaultRewardName}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#E90488",
            borderRadius: "10px",
            width: device === "Tablet" ? "90%" : "440px",
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 20px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                color: "#FFF",
                textAlign: "start",
                fontSize: "14px ",
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
              if (tourId !== "undefined" && tourId) {
                navigate(`/promotion-detail/${tourId}`);
              }
            }}
            style={{
              background: "linear-gradient(270deg, #4AA1EC 0%, #5840E9 100%)",
              outline: "none",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
              padding: device === "Tablet" ? "0px 20px" : "0px 32px",
              fontSize: device === "Tablet" ? "10px" : "20px",
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
          flexGrow: "1",
          height: "100%",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: device === "Tablet" ? "center" : "flex-end",
          flexDirection: device === "Tablet" ? "column" : "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginRight: "24px",
          }}
        >
          <Box
            sx={{
              width: device === "Tablet" ? "150px" : "208px",
              height: device === "Tablet" ? "145px" : "203px",
              background:
                "linear-gradient(127deg, rgba(60,106,179,1) 0%, rgba(50,158,216,1) 26%, rgba(233,235,245,1) 62%)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "center",
              clipPath:
                "polygon(50% 0%, 92% 0, 100% 8%, 100% 95%, 96% 100%, 4% 100%, 0 95%, 0 8%, 8% 0)",
            }}
          >
            <Box
              sx={{
                width: device === "Tablet" ? "143px" : "200px",
                height: device === "Tablet" ? "137px" : "195px",
                clipPath:
                  "polygon(50% 0%, 92% 0, 100% 8%, 100% 95%, 96% 100%, 4% 100%, 0 95%, 0 8%, 8% 0)",
              }}
              component={"img"}
              src={userAvatar}
            ></Box>
          </Box>
          <Box
            sx={{
              width: device === "Tablet" ? "100px" : "140px",
              height: device === "Tablet" ? "25px" : "30px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "linear-gradient(270deg, #5840E9 0%,  #4AA1EC 100%)",
              clipPath:
                "polygon( 0 0%,10% 0,100% 0,100% 10%,100% 76%,80% 157%,48% 268%,0% 76%,0% 0%)",
              marginTop: "-1px",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontWeight: "500",
                fontSize: device === "Tablet" ? "10px" : "15px",
                marginLeft: "0px !important",
              }}
            >
              {userName ? userName : "Super_"}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            marginTop: device === "Tablet" ? "10px" : "0px",
          }}
        >
          <Box
            sx={{ height: device === "Tablet" ? "70px" : "120px" }}
            component={"img"}
            src={imageHome.numberOne}
          ></Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                height: device === "Tablet" ? "30px" : "60px",
                width: device === "Tablet" ? "40px" : "80px",
                marginLeft: device === "Tablet" ? "-10px" : "-20px",
              }}
              component={"img"}
              src={imageHome.stIcon}
            ></Box>
            <Box
              sx={{
                clipPath:
                  "polygon(4% 0, 95% 1%, 100% 30%, 100% 70%, 95% 100%, 4% 100%, 0% 70%, 0% 30%)",
                width: device === "Tablet" ? "120px" : "150px",
                height: device === "Tablet" ? "25px" : "30px",
                background:
                  "linear-gradient(90deg, rgba(50,158,216,1) 7%, rgba(60,106,179,1) 94%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#ffff",
                fontStyle: "italic",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: device === "Tablet" ? "15px" : "20px",
                  marginLeft: "0px !important",
                }}
              >
                Score: {userScore || 99999}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BannerTour;
//  <Box
//    sx={{
//      flexGrow: "1",
//      height: "100%",
//      position: "relative",
//      display: width < 1024 ? "none" : "flex",
//      flexDirection: "column",
//      alignItems: "center",
//      marginRight: "24px",
//    }}
//  >
//    <Box
//      sx={{
//        width: "fit-content",
//        height: "200px",
//        display: "flex",
//        position: "absolute",
//        top: "8%",
//        zIndex: 100,
//      }}
//    >
//      <Box
//        sx={{
//          width: "140px",
//          height: "110px",
//          background: `url(${imageHome.BannerTourScore})`,
//          backgroundRepeat: "no-repeat",
//          backgroundSize: "cover",
//          backgroundPosition: "center",
//          marginTop: "72px",
//          display: "flex",
//          justifyContent: "center",
//          alignItems: "center",
//        }}
//      >
//        <Box
//          sx={{
//            marginTop: "-6px",
//            marginRight: "30px",
//            transform: "rotate(-4deg)",
//            textAlign: "center",
//          }}
//        >
//          {" "}
//          <Typography
//            sx={{
//              textTransform: "uppercase",
//              color: "#4A8ED7",
//              fontSize: "16px",
//              fontWeight: 800,
//            }}
//          >
//            Points
//          </Typography>
//          <Typography
//            sx={{
//              textTransform: "uppercase",
//              color: "#FD7E08",
//              fontSize: "25px",
//              fontWeight: 800,
//            }}
//          >
//            {userScore || 99999}
//          </Typography>{" "}
//        </Box>
//      </Box>
//      <Box
//        sx={{
//          width: width > 1024 ? "168px" : "158px",
//          height: width > 1024 ? "187px" : "177px",
//          border: "2px solid  rgba(246,212,0,1)",
//          boxShadow: "0px 0px 0px 8px #f5c40c",
//          borderRadius: "16px",
//          transform: "rotate(-9.075deg)",
//          marginLeft: "12px",
//        }}
//      >
//        <LazyLoadImage
//          alt="..."
//          style={{
//            width: "100%",
//            height: "100%",
//            objectFit: "cover",
//            borderRadius: "10px",
//          }}
//          src={userAvatar}
//          effect="blur"
//          wrapperProps={{
//            style: {
//              transitionDelay: "0.5s",
//            },
//          }}
//        ></LazyLoadImage>
//      </Box>
//      <Box
//        sx={{
//          marginLeft: "24px",
//          width: "94px",
//          height: "123px",
//          background: `url(${imageHome.BannerTourTop1})`,
//          backgroundRepeat: "no-repeat",
//          backgroundSize: "cover",
//          backgroundPosition: "center",
//        }}
//      ></Box>
//    </Box>
//    <Box
//      sx={{
//        background: `url(${imageHome.BannerTourName})`,
//        width: "324px",
//        height: "137px",
//        position: "relative",
//        marginTop: "auto",
//        marginBottom: "20px",
//      }}
//    >
//      <Typography
//        sx={{
//          position: "absolute",
//          top: "85%",
//          left: "45%",
//          transform: "translate(-50%,-50%)",
//          color: "#4A8ED7",
//          fontSize: "24px",
//          fontWeight: 1000,
//        }}
//      >
//        {userName ? userName : "Super_"}
//      </Typography>
//    </Box>
//  </Box>;
