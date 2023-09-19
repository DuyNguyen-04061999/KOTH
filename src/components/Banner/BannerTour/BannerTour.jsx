import { Box, Typography } from "@mui/material";
import React from "react";
import { imageHome } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { useNavigate } from "react-router-dom";

const BannerTour = () => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "349px",
        background: `url(${imageHome.BannerTourBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "0 0 0 46px",
      }}
    >
      <Box
        sx={{
          width: "198px",
          height: "198px",
          background: `url(${imageHome.BannerTourNameTour})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          marginTop: "120px",
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            width: "60%",
            height: "100%",
            top: "80%",
            left: "38%",
            transform: "translate(-50%,-50%)",
            textTransform: "uppercase",
            fontSize: "16px",
            fontWeight: 700,
            color: "white",
          }}
        >
          Tournament of the week
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
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
            Galaxy Quest: Win a Z Flip 5 Galaxy
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
            }}
          >
            Galaxy z-flip 5
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
            Sponsor by: Samsung
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
            <Typography
              sx={{
                color: "#FFF",
                textAlign: "start",
                fontSize: "24px",
                marginLeft: "0px !important",
                marginRight: "5px",
                fontWeight: 800,
              }}
            >
              1d:55h:32m
            </Typography>
          </Box>
          <button
            onClick={() => {
              navigate("/tournamentDetail/");
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
          background: `url(${imageHome.BannerTourName})`,
          width: "324px",
          height: "138px",
          position: "relative",
        }}
      >
        <Box sx={{ width: "500px", height: "200px", display: "flex" }}>
          <Box
            sx={{
              width: "140px",
              height: "110px",
              background: `url(${imageHome.BannerTourScore})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></Box>
          <Box
            sx={{
              position: "relative",
              width: "168px",
              height: "180px",
              border: "2px solid #f9d465",
              overflow: "hidden",
              marginLeft: "24px",
            }}
          >
            <img
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "100%",
                height: "100%",
                transform: "translate(-50%,-50%)",
                objectFit: "cover",
              }}
              src={imageHome.BannerWinAva}
            ></img>
          </Box>
          <Box></Box>
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
            Ana belle 33
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BannerTour;
