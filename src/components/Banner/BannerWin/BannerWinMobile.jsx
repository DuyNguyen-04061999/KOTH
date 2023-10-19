import { Box, Typography } from "@mui/material";
import React from "react";
import { imageHome } from "../../../utils/images";

const BannerWinMobile = (props) => {
  const {
    rewardName,
    sponsorName,
    userAvatar,
    userName,
  } = props;
  return (
    <Box
      sx={{
        width: "100%",
        height: "218px",
        background: `url(${imageHome.BannerWinBgMobile})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "0 5%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "89px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            background: `url(${imageHome.BannerWinBigMobile})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            position: "relative",
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              top: "40%",
              left: "48%",
              transform: "translate(-50%,-50%)",
              width: "100%",
              textAlign: "center",
              color: "#C52A0E",
              fontSize: "14px",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Big Promotion Winner
          </Typography>
        </Box>
        <Typography
          sx={{
            marginTop: "-30px",
            color: "white",
            textTransform: "uppercase",
            fontSize: "8px",
            fontWeight: 700,
          }}
        >
          Sponsored  by: {sponsorName || "Play4Promo"}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft:"10px"
          }}
        >
          <Box
            sx={{
              width: "78px",
              height: "87px",
              border: "2px solid  rgba(246,212,0,1)",
              boxShadow: "0px 0px 0px 4px #f5c40c",
              borderRadius: "8px",
            }}
          >
            <img
              alt="..."
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={userAvatar || imageHome.BannerWinAva}
            ></img>
          </Box>
          <Box>
            <Typography
              sx={{
                color: "#FFF8B7",
                fontSize: "10px",
                fontWeight: 500,
                textTransform: "uppercase",
                marginTop: "8px",
              }}
            >
              {userName || "SUPER_"}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              top: "25%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              zIndex: 10,
              textTransform: "uppercase",
            }}
          >
            <Box
              sx={{
                fontSize: "24px",
                color: "transparent",
                WebkitTextStroke: "4px #ED3B14",
                width: "150px",
                position: "relative",
                fontWeight: 800,
                wordWrap: "break-word",
                textTransform: "uppercase",
                lineHeight: "1.5",
                height: "100px",
                overflow: "hidden",
                textAlign:"center",
              }}
            >
              {rewardName || "Reward Name"}
              <Typography
                sx={{
                  fontWeight: 800,
                  position: "absolute",
                  top: "50%",
                  left: "46%",
                  transform: "translate(-50%,-50%)",
                  fontSize: "23px",
                  color: "white",
                  WebkitTextStroke: "2px rgba(251, 176, 21, 1)  ",
                  wordWrap: "break-word",
                  lineHeight: "1.5",
                  height: "100px",
                  overflow: "hidden",
                  textAlign:"center",
                  width: "150px",
                }}
              >
                {rewardName || "Tournament Name"}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "193px",
              height: "50px",
              background: `url(${imageHome.BannerWinCeleb})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              marginTop: "50px",
              wordWrap: "break-word",
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                color: "#FFC56F",
                fontSize: "10px",
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
    </Box>
  );
};

export default BannerWinMobile;
