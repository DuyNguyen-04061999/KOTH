import {
  Box,
  Skeleton,
  Typography,
  // createTheme
} from "@mui/material";
import React from "react";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
// import InspirationTTF from "../../../../assets/font/CynthoNextMedium.otf";
import { imageHome } from "../../../../utils/images";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { CalculateDistance } from "../../../../components/CountDownTimer/utils/CalculateDistance";
import moment from "moment";
import InfinityIcon from "@mui/icons-material/AllInclusive";
import "./index.scss";

// const theme = createTheme({
//   typography: {
//     fontFamily: "Cyntho Next",
//   },
//   components: {
//     MuiCssBaseline: {
//       styleOverrides: {
//         "@font-face": {
//           fontFamily: "Cyntho Next",
//           src: `url(${InspirationTTF}) format("truetype")`,
//         },
//       },
//     },
//   },
// });

export default function ItemComponent({ countdown, tourInfo, isLoading }) {
  const { width } = useWindowDimensions();
  const [hours, setHour] = useState(null);
  const [minutes, setMinute] = useState(null);
  const [days, setDay] = useState(null);
  const [seconds, setSeconds] = useState(null);
  useEffect(() => {
    let countdownDate = new Date(moment(tourInfo?.tournamentEndAt)).getTime();
    let timeNow = new Date().getTime();
    setHour(CalculateDistance(countdownDate, timeNow).hours);
    setMinute(CalculateDistance(countdownDate, timeNow).minutes);
    setDay(CalculateDistance(countdownDate, timeNow).days);
  }, [tourInfo]);

  const styleTypography = {
    textAlign: "start",
    fontSize: width < 576 ? "14px" : "16px",
    fontWeight: "700 !important",
    marginLeft: "0px !important",
  };

  const [isHovered, setIsHovered] = useState(false);
  // Step 3: Add event listeners
  const handleMouseEnter = () => {
    // Step 4: Update state
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    // Step 4: Update state
    setIsHovered(false);
  };
  const navigate = useNavigate();
  return (
    <Box
      className="ms-2 me-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() =>
        !isLoading && navigate("/tournamentDetail/" + tourInfo?.id)
      }
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: width < 576 ? "155px" : "184px",
        cursor: isLoading ? "auto" : "pointer",
      }}
    >
      <Box
        sx={{
          height: "20px",
          width: "20px",
          bgcolor: "#1a151e",
          position: "absolute",
          borderRadius: "50%",
          top: width < 576 ? "234px" : "282px",
          left: "-10px",
        }}
      ></Box>
      <Box
        sx={{
          height: "20px",
          width: "20px",
          bgcolor: "#1a151e",
          position: "absolute",
          borderRadius: "50%",
          top: width < 576 ? "234px" : "282px",
          right: "-10px",
        }}
      ></Box>
      <Box
        sx={{
          width: "100%",
          height: width < 576 ? "244px" : "291px",
          bgcolor: "white",
          borderStartStartRadius: "8px",
          overflow: "hidden",
          borderStartEndRadius: "8px",
        }}
      >
        {isLoading ? (
          <Skeleton
            sx={{ height: width < 576 ? 156 : 184 }}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <Box
            sx={{
              maxHeight: width < 576 ? "156px" : "184px",
              minHeight: width < 576 ? "156px" : "184px",
              width: "100%",
              objectFit: "cover",
            }}
            component={"img"}
            src={
              tourInfo?.tournamentAvatar
                ? process.env.REACT_APP_SOCKET_SERVER +
                  "/" +
                  tourInfo?.tournamentAvatar
                : imageHome.brandImage
            }
          ></Box>
        )}
        <Box
          sx={{
            marginTop: "8px",
            padding: "0px 8px",
            display: "flex",
            justifyContent: countdown ? "space-between" : "flex-end",
            flexDirection: "column",
          }}
        >
          <span style={{ fontSize: "10px" }}>
            Sponsor:{tourInfo?.tournamentBrand?.brandName}
          </span>
          <Typography
            sx={{
              ...styleTypography,
              overflow: "hidden",
              color: "#000",
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: "normal",
              height: "32px",
              maxHeight: "42px",
              minHeight: "32px",
              width: "100%",
            }}
            className="tour-info"
          >
            {isLoading ? (
              <>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </>
            ) : (
              tourInfo?.tournamentName
            )}
          </Typography>
          <Box
            sx={{
              position: "absolute",
              width: "max-content",
              background: "rgba(0,0,0,0.23)",
              borderRadius: "16px",
              fontSize: "12px",
              padding: "6px",
              color: "white",
            }}
            className="more-info"
          >
            {tourInfo?.tournamentName}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: width < 576 ? "10px" : "16px",
            }}
          >
            {isLoading ? (
              <Skeleton variant="text" width={120} />
            ) : (
              countdown && (
                <Typography
                  sx={{
                    ...styleTypography,
                    fontSize: width < 576 ? "12px" : "14px",
                    color: "#5747EA",
                    fontWeight: "700 !important",
                    minWidth: "100px",
                  }}
                >
                  {`${days}d:${hours}h:${minutes}m`}
                </Typography>
              )
            )}

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{ width: "14px", height: "14px", marginRight: "5px" }}
                component={"img"}
                src={imageHome.iconMember}
              ></Box>
              <Typography
                sx={{
                  ...styleTypography,
                  fontSize: width < 576 ? "12px" : "14px",
                }}
              >
                {isLoading ? (
                  <Skeleton variant="text" width={20} />
                ) : tourInfo?.users?.length !== 0 ? (
                  tourInfo?.users?.length
                ) : (
                  "0"
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        className={isHovered === true ? "hover-card" : ""}
        sx={{
          width: "100%",
          height: width < 576 ? "64px" : "69px",
          bgcolor: isHovered === true ? "#42285B" : "#C0C0C0",
          color: isHovered === true ? "white" : "black",
          borderEndEndRadius: "8px",
          borderEndStartRadius: "8px",
          borderTop: "dashed 2px black",
          transition: "0.3s ease-out",
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: "12px 8px 6px 8px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {isLoading ? (
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              animation="wave"
            />
          ) : (
            <Box
              sx={{
                width: width < 576 ? `40px` : "49px",
                height: width < 576 ? `40px` : "49px",
                borderRadius: "4px",
              }}
              component={"img"}
              src={
                tourInfo &&
                tourInfo?.tourSkins &&
                tourInfo?.tourSkins?.length > 0 &&
                tourInfo?.tourSkins[0]?.skinGame &&
                tourInfo?.tourSkins[0]?.skinGame?.gameAvatar
                  ? process.env.REACT_APP_SOCKET_SERVER +
                    "/" +
                    tourInfo?.tourSkins[0]?.skinGame?.gameAvatar
                  : imageHome.brandImage
              }
            ></Box>
          )}
          <Box>
            <Typography
              sx={{
                ...styleTypography,
                fontSize: width < 576 ? "12px" : "14px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "120%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxHeight: "1rem",
                whiteSpace: "nowrap",
                maxWidth: "100px",
              }}
            >
              {isLoading ? (
                <Skeleton variant="text" />
              ) : tourInfo &&
                tourInfo?.tourSkins &&
                tourInfo?.tourSkins?.length > 0 &&
                tourInfo?.tourSkins[0]?.skinGame &&
                tourInfo?.tourSkins[0]?.skinGame?.gameName ? (
                tourInfo?.tourSkins[0]?.skinGame?.gameName
              ) : (
                "game Name"
              )}
            </Typography>
            <button
              onClick={() => navigate("/tournamentDetail/" + tourInfo?.id)}
              disabled={isLoading}
              style={{
                border: "none",
                outline: "none",
                width: width < 576 ? `90px` : "104px",
                borderRadius: "5px",
                background: "linear-gradient(270deg, #4AA1EC 0%, #5840E9 100%)",
                color: "#ffff",
                fontSize: width < 576 ? "12px" : "14px",
                minHeight: "24px",
              }}
            >
              {tourInfo && tourInfo?.tournamentStatus === 0
                ? "See More"
                : tourInfo?.tournamentStatus === 1
                ? "Play Now"
                : ""}
            </button>
          </Box>
        </Box>
      </Box>
    </Box>
    // <Box
    //   sx={{
    //     width: "100%",
    //     display: "flex",
    //     justifyContent: "center !important",
    //   }}
    // >
    //   {" "}
    //   <Box
    //     sx={{
    //       backgroundImage: `url(${imageHome.Voucher_tournament_mobile})`,
    //       width:
    //         width < 576
    //           ? `${parseFloat(width / 2.5)}px`
    //           : `${parseFloat(width / 10.43)}px`,
    //       height:
    //         width < 576
    //           ? `${parseFloat(width / 1.2)}px`
    //           : `${parseFloat(width / 5.3)}px`,
    //       backgroundSize: "cover",
    //       backgroundRepeat: "no-repeat",
    //       display: "flex",
    //       flexDirection: "column",
    //       justifyContent: "space-between",
    //       borderRadius: "8px",
    //       backgroundPosition: "center",
    //     }}
    //   >
    //     <Box
    //       sx={{
    //         width: "100%",
    //         borderRadius: "8px 8px 0px 0px",
    //         minHeight: "156px",
    //         maxHeight: "156px",
    //         objectFit: "cover",
    //       }}
    //       component={"img"}
    //       src={
    //         tourInfo?.tournamentBackground
    //           ? process.env.REACT_APP_SOCKET_SERVER +
    //             "/" +
    //             tourInfo?.tournamentBackground
    //           : imageHome.brandImage
    //       }
    //     ></Box>
    //     <Box
    //       sx={{
    //         padding: "0px 8px",
    //         display: "flex",
    //         justifyContent: countdown ? "space-between" : "flex-end",
    //         flexDirection: "column",
    //         marginBottom: "-8px"
    //       }}
    //     >
    //       <Typography
    //         sx={{
    //           ...styleTypography,
    //           overflow: "hidden",
    //           color: "#000",
    //           textOverflow: "eclipse",
    //           fontSize: "14px",
    //           fontStyle: "normal",
    //           fontWeight: "500",
    //           lineHeight: "normal",
    //         }}
    //       >
    //         {tourInfo?.tournamentName}
    //       </Typography>
    //       <Box
    //         sx={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           marginTop: "30px",
    //         }}
    //       >
    //         {countdown && (
    //           <Typography
    //             sx={{
    //               ...styleTypography,
    //               fontSize: width < 576 ? "13px" : "16px",
    //               color: "#5747EA",
    //               fontWeight: "700 !important",
    //             }}
    //           >
    //             {width < 576
    //               ? `${days}d:${hours}h:${minutes}m`
    //               : `${days}d:${hours}h:${minutes}m:${seconds}s`}
    //           </Typography>
    //         )}

    //         <Box sx={{ display: "flex", alignItems: "center" }}>
    //           <Box
    //             sx={{ width: "14px", height: "14px", marginRight: "5px" }}
    //             component={"img"}
    //             src={imageHome.iconMember}
    //           ></Box>
    //           <Typography
    //             sx={{
    //               ...styleTypography,
    //               fontSize: width < 576 ? "12px" : "16px",
    //             }}
    //           >
    //             {tourInfo?.tournamentQuantity !== 0 ? (
    //               tourInfo?.tournamentQuantity
    //             ) : (
    //               <InfinityIcon
    //                 sx={{
    //                   width: 15,
    //                   height: 15,
    //                 }}
    //               />
    //             )}
    //           </Typography>
    //         </Box>
    //       </Box>
    //     </Box>
    //     <Box
    //       sx={{
    //         display: "flex",
    //         padding: "22px 8px 10px 10px",
    //         justifyContent: "space-between",
    //         alignItems: "center",
    //       }}
    //     >
    //       <Box
    //         sx={{
    //           width: width < 576 ? `${parseFloat(width / 9.75)}px` : "49px",
    //           height: width < 576 ? `${parseFloat(width / 9.75)}px` : "49px",
    //           borderRadius: "4px",
    //         }}
    //         component={"img"}
    //         src={
    //           tourInfo &&
    //           tourInfo?.tourSkins &&
    //           tourInfo?.tourSkins?.length > 0 &&
    //           tourInfo?.tourSkins[0]?.skinGame &&
    //           tourInfo?.tourSkins[0]?.skinGame?.gameAvatar
    //             ? process.env.REACT_APP_SOCKET_SERVER +
    //               "/" +
    //               tourInfo?.tourSkins[0]?.skinGame?.gameAvatar
    //             : imageHome.brandImage
    //         }
    //       ></Box>
    //       <Box>
    //         <Typography
    //           sx={{
    //             ...styleTypography,
    //             fontSize: width < 576 ? "12px" : "14px",
    //             fontStyle: "normal",
    //             fontWeight: "500",
    //             lineHeight: "120%",
    //             overflow: "hidden",
    //             textOverflow: "ellipsis",
    //             maxHeight: "1rem",
    //             whiteSpace: "nowrap",
    //             maxWidth: "90px"
    //           }}
    //         >
    //           {tourInfo &&
    //           tourInfo?.tourSkins &&
    //           tourInfo?.tourSkins?.length > 0 &&
    //           tourInfo?.tourSkins[0]?.skinGame &&
    //           tourInfo?.tourSkins[0]?.skinGame?.gameName
    //             ? tourInfo?.tourSkins[0]?.skinGame?.gameName
    //             : "game Name"}
    //         </Typography>
    //         <button
    //           onClick={() => navigate("/tournamentDetail/" + tourInfo?.id)}
    //           style={{
    //             border: "none",
    //             outline: "none",
    //             width: width < 576 ? `${parseFloat(width / 4.33)}px` : "104px",
    //             borderRadius: "5px",
    //             background: "linear-gradient(270deg, #4AA1EC 0%, #5840E9 100%)",
    //             color: "#ffff",
    //             fontSize: "12px",
    //           }}
    //         >
    //           {tourInfo && tourInfo?.tournamentStatus === 0
    //             ? "See More"
    //             : tourInfo?.tournamentStatus === 1
    //             ? "Play Now"
    //             : ""}
    //         </button>
    //       </Box>
    //     </Box>
    //   </Box>
    // </Box>
  );
}
