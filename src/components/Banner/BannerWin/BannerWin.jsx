import { Box, Typography } from "@mui/material";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { imageHome } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";

export default function BannerWin(props) {
  const { rewardName, sponsorName, userAvatar, userName } = props;
  const { width } = useWindowDimensions();

  return (
    <LazyLoadComponent>
      <Box
        sx={{
          background: `url(${imageHome.BannerWinBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "349px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: width > 1024 ? "0 6%" : "0 2%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: width > 1024 ? "9%" : "0",
          }}
        >
          <Box
            sx={{
              width: width > 1024 ? "182px" : "158px",
              height: width > 1024 ? "204px" : "177px",
              border: "2px solid  rgba(246,212,0,1)",
              boxShadow: "0px 0px 0px 8px #f5c40c",
              borderRadius: "16px",
            }}
          >
            <img
              alt="..."
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
              marginTop: "12px",
              border: "2px solid #7C81F2",
              borderRadius: "8px",
              width: width > 1024 ? "229px" : "200px",
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
              {userName}
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
              width: width > 1024 ? "405px" : "300px",
              height: width > 1024 ? "89px" : "67px",
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
                fontSize: width > 1024 ? "20px" : "14px",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "#C52A0E",
                width: "max-content",
              }}
            >
              Big Promotion Winner
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                textTransform: "uppercase",
                color: "white",
                fontWeight: 700,
                fontSize: "14px",
                marginTop: "-8px",
              }}
            >
              Sponsored by: {sponsorName}
            </Typography>
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "56%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              zIndex: 10,
              width: "271px",
              textTransform: "uppercase",
            }}
          >
            <Box
              sx={{
                fontSize: "38px",
                WebkitTextStroke: "0.1px #f5c40c",
                color: " #ED3B14",
                width: "100%",
                fontFamily: "Cyntho Next",
                position: "relative",
                fontWeight: "800 !important",
                wordWrap: "break-word",
                overflow: "hidden",
                lineHeight: 1.2,
                textAlign: "center",
                maxHeight: "80px",
              }}
            >
              {rewardName}
              {/* <Typography
              sx={{
                fontWeight: 800,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                fontSize: "35px",
                color: "white",
                WebkitTextStroke: "2px rgba(251, 176, 21, 1)  ",
                width: "100%",
                wordWrap: "break-word",
                overflow: "hidden",
                lineHeight: 1.2,
                textAlign: "center",
                maxHeight: "80px",
              }}
            >
              {rewardName}
            </Typography> */}
            </Box>
          </Box>
          <Box
            sx={{
              width: width > 1024 ? "405px" : "300px",
              height: width > 1024 ? "105px" : "78px",
              background: `url(${imageHome.BannerWinCeleb})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              marginTop: "96px",
              marginBottom: "24px",
              wordWrap: "break-word",
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                color: "#FFC56F",
                fontSize: width > 1024 ? "19.714px" : "14px",
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
    </LazyLoadComponent>
  );
}
