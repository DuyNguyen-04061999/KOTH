import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
// import InspirationTTF from "../../../../assets/font/CynthoNextMedium.otf";
import moment from "moment";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import { CalculateDistance } from "../../../../components/CountDownTimer/utils/CalculateDistance";
import { imageHome } from "../../../../utils/images";
import "./index.scss";

export default function ItemComponent({ countdown, tourInfo, isLoading }) {
  const { width } = useWindowDimensions();
  const [hours, setHour] = useState(null);
  const [minutes, setMinute] = useState(null);
  const [days, setDay] = useState(null);
  let countEndDate = new Date(moment(tourInfo?.tournamentEndAt)).getTime();
  let countStartDate = new Date(moment(tourInfo?.tournamentStartAt)).getTime();
  let timeNow = new Date().getTime();
  useEffect(() => {
    if (tourInfo?.tournamentStatus === 0) {
      setHour(CalculateDistance(countStartDate, timeNow).hours);
      setMinute(CalculateDistance(countStartDate, timeNow).minutes);
      setDay(CalculateDistance(countStartDate, timeNow).days);
    } else if (tourInfo?.tournamentStatus === 1) {
      setHour(CalculateDistance(countEndDate, timeNow).hours);
      setMinute(CalculateDistance(countEndDate, timeNow).minutes);
      setDay(CalculateDistance(countEndDate, timeNow).days);
    } else if (tourInfo?.tournamentStatus === 2) {
      setHour(null);
      setMinute(null);
      setDay(null);
    }
  }, [tourInfo, countEndDate, countStartDate, timeNow]);

  const styleTypography = {
    textAlign: "start",
    fontSize: width < 576 ? "14px" : "16px",
    fontWeight: "700 !important",
    marginLeft: "0px !important",
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const navigate = useNavigate();
  return (
    <Box
      className="ms-2 me-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() =>
        !isLoading && navigate("/promotion-detail/" + tourInfo?.id)
      }
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: width < 576 ? "155px" : "184px",
        cursor: isLoading ? "auto" : "pointer",
        fontFamily: "Cyntho Next",
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
          <>
            <LazyLoadImage
              style={{
                maxHeight: width < 576 ? "156px" : "184px",
                minHeight: width < 576 ? "156px" : "184px",
                width: "100%",
                objectFit: "cover",
                position: "relative",
                overflow: "hidden",
              }}
              effect="blur"
              wrapperProps={{
                style: {
                  transitionDelay: "0.5s",
                },
              }}
              src={
                tourInfo?.tournamentAvatar
                  ? process.env.REACT_APP_SOCKET_SERVER +
                    "/" +
                    tourInfo?.tournamentAvatar
                  : imageHome.brandImage
              }
            ></LazyLoadImage>
            <Box
              sx={{
                width: "100%",
                maxHeight: width < 576 ? "156px" : "184px",
                minHeight: width < 576 ? "156px" : "184px",
                position: "absolute",
                top: 0,
                backgroundColor: "rgba(0,0,0,0.6)",
                display: tourInfo?.tournamentStatus === 2 ? "block" : "none",
                borderStartEndRadius:"7px",
                borderStartStartRadius:"7px"
              }}
            />
          </>
        )}
        <Box
          sx={{
            // marginTop: "8px",
            padding: "7px 12px",
            display: "flex",
            justifyContent: countdown ? "space-between" : "flex-end",
            flexDirection: "column",
            backgroundColor: "white",
            minHeight: width < 576 ? "89px" : "108px",
          }}
        >
          <span style={{ fontSize: "10px" }}>
            Sponsor:{tourInfo?.tournamentBrand?.brandName}
          </span>
          <Box
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
              <>
                <Box
                  sx={{
                    display:
                      tourInfo?.tournamentVip === 1 ? "inline-block" : "none",
                    padding: "2px 6px",
                    backgroundColor: "#FB3",
                    marginRight: "4px",
                    borderRadius: "8px",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "12px",
                  }}
                >
                  VIP
                </Box>
                <span style={{ fontFamily: "Cyntho Next" }}>
                  {tourInfo?.tournamentName}
                </span>
              </>
            )}
          </Box>
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
              marginTop: width < 576 ? "2px" : "4px",
            }}
          >
            <Box>
              <Box
                sx={{
                  fontSize: width > 576 ? "14px" : "10px",
                  fontWeight: 500,
                  lineHeight: "130%",
                }}
              >
                {tourInfo?.tournamentStatus === 0
                  ? "Starting in: "
                  : tourInfo?.tournamentStatus === 1
                  ? "End in: "
                  : tourInfo?.tournamentStatus === 2
                  ? "Winner: "
                  : ""}
              </Box>
              {isLoading ? (
                <Skeleton
                  variant="text"
                  sx={{ marginTop: "-4px" }}
                  width={90}
                />
              ) : (
                countdown && (
                  <Typography
                    sx={{
                      ...styleTypography,
                      fontSize: width < 576 ? "12px" : "16px",
                      color: "#5747EA",
                      fontWeight: "700",
                      minWidth: "100px",
                      fontFamily: "Cyntho Next",
                    }}
                  >
                    {tourInfo?.tournamentStatus !== 2
                      ? days !== null &&
                        hours !== null &&
                        minutes !== null &&
                        `${days}d:${hours}h:${minutes}m`
                      : tourInfo?.tScores &&
                        tourInfo?.tScores[0]?.tUser &&
                        tourInfo?.tScores[0]?.tUser?.userNickName}
                  </Typography>
                )
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                marginBottom: "2px",
              }}
            >
              <LazyLoadImage
                style={{
                  width: width > 576 ? "20px" : "16px",
                  height: width > 576 ? "20px" : "16px",
                  marginRight: width > 576 ? "8px" : "4px",
                }}
                wrapperProps={{
                  style: {
                    transitionDelay: "0.5s",
                  },
                }}
                src={imageHome.iconMember}
                effect="blur"
              ></LazyLoadImage>
              <Typography
                sx={{
                  ...styleTypography,
                  fontSize: width < 576 ? "12px" : "14px",
                  fontFamily: "Cyntho Next",
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
              variant="rectangular"
              width={40}
              height={40}
              animation="wave"
            />
          ) : (
            <LazyLoadImage
              style={{
                width: width < 576 ? `40px` : "49px",
                height: width < 576 ? `40px` : "49px",
                borderRadius: "4px",
                objectFit: "cover",
              }}
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
              effect="blur"
              wrapperProps={{
                style: {
                  transitionDelay: "0.5s",
                },
              }}
            ></LazyLoadImage>
          )}
          <Box
            sx={{
              marginLeft: "5px",
            }}
          >
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
                fontFamily: "Cyntho Next",
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
              onClick={() => navigate("/promotion-detail/" + tourInfo?.id)}
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
                : "See More"}
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
    //           onClick={() => navigate("/promotion-detail/" + tourInfo?.id)}
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
