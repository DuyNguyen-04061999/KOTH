import { useSelector } from "react-redux";
import CountDownBannerHot from "../../pages/NewHomePageComponent/CountDownBannerHot";
import useWindowDimensions from "../../utils/useWindowDimensions";
import moment from "moment/moment";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { imageDesktop, imageHome, images } from "../../utils/images";

export default function BannerTop1() {
  const { width } = useWindowDimensions();
  const { biggestEndTour, hotWeekTour } = useSelector(
    (state) => state.tournamentReducer
  );
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          marginTop: width < 576 ? "24px" : "32px",
          marginBottom: width < 576 ? "24px" : "32px",
          //   backgroundImage: `url(${
          //     width < 576
          //       ? imageHome.bannerTop1Mobile
          //       : imageHome.bannerTop1
          //   })`,
          backgroundImage: `url(${imageDesktop.bannertourDesk})`,
          width: "100%",
          height: "348.909px",
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ paddingLeft: "50px" }}>
          <Typography
            sx={{
              color: "#FFDC62",
              textAlign: "start",
              fontSize: "16.042px",
              marginLeft: "0px !important",
            }}
          >
            Galaxy Quest: Win a Z Flip 5 Galaxy
          </Typography>
          <Box className="name-tour">
            <Typography
              sx={{
                fontSize: "50px",
                textAlign: "start",
              }}
            >
              {String(hotWeekTour?.tournamentName)?.length > 10
                ? String(hotWeekTour?.tournamentName)?.slice(0, 15) + "..."
                : String(hotWeekTour?.tournamentName)}
            </Typography>
          </Box>
          <Typography sx={{
                fontSize:"14px",
                color:"white"
            }}>Sponsor by: Samsung</Typography>
          {/* <Box sx={{ display: "flex" }}>
            <Box
              sx={{ width: "60px", height: "auto" }}
              component={"img"}
              src={
                hotWeekTour &&
                hotWeekTour?.tournamentBrand &&
                hotWeekTour?.tournamentBrand?.brandAvatar
                  ? process.env.REACT_APP_SOCKET_SERVER +
                    "/" +
                    hotWeekTour?.tournamentBrand?.brandAvatar
                  : imageHome.brandAvatar
              }
            ></Box>
            <Box
              sx={{
                width: "2.027px",
                backgroundColor: "#371972",
                margin: "0px 12px 0px 12px",
              }}
            ></Box>
            <CountDownBannerHot
              expiryTime={moment(hotWeekTour?.tournamentEndAt)}
            />
          </Box> */}
          <Box
            sx={{
              backgroundColor: "#300854",
              borderRadius: "5px",
              marginTop: "35px",
              padding: "10.026px 14.037px",
              width: width < 1024 ? "310px" : "420px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CountDownBannerHot
                expiryTime={moment(hotWeekTour?.tournamentEndAt)}
              />
            </Box>
            <button
              onClick={() => {
                if (hotWeekTour?.id) {
                  navigate("/tournamentDetail/" + hotWeekTour?.id);
                }
              }}
              style={{
                background: "linear-gradient(270deg, #4AA1EC 0%, #5840E9 100%)",
                outline: "none",
                border: "none",
                borderRadius: "5px",
                color: "#fff",
                padding: "0px 40px",
                fontSize: width < 1024 ? "12px" : "16px",
                cursor: "pointer",
              }}
            >
              Play now
            </button>
          </Box>
        </Box>
        <Box
          sx={{
            width: "210px",
            height: "max-content",
            borderRadius: "50%",
            position: "relative",
            marginLeft: width < 1024 && "32px",
          }}
        >
          <Box
            sx={{
              borderRadius: "5%",
              width: 576 < width && 1024 > width ? "150px" : "142px",
              height: 576 < width && 1024 > width ? "150px" : "142px",
              position: "absolute",
              top: -111,
              left: 1,
              transform: "rotate(-9deg)",
              //   boxShadow: "4px 4px 0px 3px rgba(6,135,201,1)",
            }}
            src={
              hotWeekTour &&
              hotWeekTour?.bestUser &&
              hotWeekTour?.bestUser?.tUser &&
              hotWeekTour?.bestUser?.tUser?.userAccount &&
              hotWeekTour?.bestUser?.tUser?.userAccount?.accountAvatar
                ? process.env.REACT_APP_SOCKET_SERVER +
                  "/" +
                  hotWeekTour?.bestUser?.tUser?.userAccount?.accountAvatar
                : images.pool
            }
            component={"img"}
          ></Box>
          <Box
            sx={{
              width: "170px",
              height: "auto",
              position: "absolute",
              top: 576 < width && 1024 > width ? "-80px" : "-131px",
              left: 576 < width && 1024 > width ? "-40px" : "-17px",
            }}
            component={"img"}
            src={imageDesktop.bannertour5}
          ></Box>
          <Box
            sx={{
              position: "absolute",
              top: 114,
              left: -5,
              zIndex: 10,
            }}
          >
            <Typography
              sx={{ color: "#4A8ED7", fontSize: "26px", fontWeight: "bold" }}
            >
              Lam Dev
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
