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
import { imageHome, images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";

const BannerTourMobile = (props) => {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const { rewardName, userAvatar, userName, endTime, userScore, tourId } =
    props;
  const defaultRewardName = "NAME OF PROMOTION REWARD";
  return (
    <LazyLoadComponent>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "210px",
          width: "100%",
          background: `url(${imageHome.christmasMobileBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: width < 992 ? "10px 5px 10px 10px" : "30px 0 30px 46px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "55%",
          }}
        >
          <Box>
            <Box
              sx={{
                padding: "6px 6px",
                backgroundColor: "#496BB4",
                borderRadius: "10px",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  textTransform: "uppercase",
                  fontSize: "9px",
                  fontWeight: 700,
                  lineHeight: 1.5,
                  marginLeft: "0px !important",
                }}
              >
                Promotion of the week
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "8px",
                  color: "#F6B403",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  lineHeight: 1.5,
                  marginTop: "5px",
                }}
              >
                SPONSORED BY: PLAY 4 PROMO
              </Typography>
            </Box>
          </Box>
          <Box sx={{ margin: "10px 0px" }}>
            <Typography
              sx={{
                width: "100%",
                fontSize: "13px",
                fontWeight: "700",
                textTransform: "uppercase",
                // background: "linear-gradient(180deg, #FEE803 0%, #FD8700 100%)",
                // backgroundClip: "text",
                // WebkitBackgroundClip: "text",
                // WebkitTextFillColor: "transparent",
                overflow: "hidden",
                textAlign: "center",
                color: "#fff",
                wordBreak: "break-word",
              }}
            >
              {(rewardName || defaultRewardName).length > 14
                ? (rewardName || defaultRewardName).slice(0, 14) + " ..."
                : rewardName || defaultRewardName}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#E90488",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-around",
              padding: "5px",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                color: "#FFF",
                textAlign: "start",
                fontSize: "10px",
                marginLeft: "0px !important",
                fontWeight: 700,
              }}
            >
              <CountDownBannerHot
                expiryTime={moment(endTime || "20/10/2023")}
              />
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
                borderRadius: "5px",
                color: "#fff",
                fontSize: width < 1024 ? "8px" : "20px",
                cursor: "pointer",
                padding: "3px 8px",
                width: "40%",
              }}
            >
              UPPER CASE
            </button>
          </Box>
        </Box>
        <Box
          sx={{
            flexGrow: "1",
            height: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "5px 0px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100px",
                height: "100px",
                background:
                  "linear-gradient(0deg, rgba(60,106,179,1) 0%,rgba(233,235,245,1) 45%, rgba(50,158,216,1) 62%)",
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
                  width: "95px",
                  height: "95px",
                  clipPath:
                    "polygon(50% 0%, 92% 0, 100% 8%, 100% 95%, 96% 100%, 4% 100%, 0 95%, 0 8%, 8% 0)",
                }}
                component={"img"}
                src={userAvatar ? userAvatar : images.undefinedAvatar}
              ></Box>
            </Box>
            <Box
              sx={{
                width: "80px",
                height: "20px",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                  "linear-gradient(270deg, #5840E9 0%,  #4AA1EC 100%)",
                clipPath:
                  "polygon( 0 0%,10% 0,100% 0,100% 10%,100% 76%,80% 157%,48% 268%,0% 76%,0% 0%)",
              }}
            >
              <Typography
                sx={{ color: "#fff", fontWeight: "500", fontSize: "12px" }}
              >
                {userName ? userName : "Super_"}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{ height: "50px" }}
              component={"img"}
              src={imageHome.numberOne}
            ></Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  height: "20px",
                  width: "20px",
                }}
                component={"img"}
                src={imageHome.stIcon}
              ></Box>
              <Box
                sx={{
                  clipPath:
                    "polygon(4% 0, 95% 1%, 100% 30%, 100% 70%, 95% 100%, 4% 100%, 0% 70%, 0% 30%)",
                  padding: "4px 12px 4px 10px",
                  background:
                    "linear-gradient(90deg, rgba(50,158,216,1) 7%, rgba(60,106,179,1) 94%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#ffff",
                  fontStyle: "italic",
                }}
              >
                <Typography sx={{ fontWeight: "700", fontSize: "10px" }}>
                  Score: {userScore || 99999}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </LazyLoadComponent>
  );
};

export default BannerTourMobile;
