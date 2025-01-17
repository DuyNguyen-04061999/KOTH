import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Dialog, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import BannerLoading from "../../../../components/LoadingComponent/BannerLoading";
import { images } from "../../../../utils/images";
import ImageGamePre from "../ImgGamePre";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
export default function GamePreview() {
  const settings = {
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const slider = useRef();
  const { detailTournament } = useSelector((state) => state.playgameReducer);
  const { isGetDetailPromotion, isGetDetailAuthPromotion } = useSelector(
    (state) => state.promotionReducer
  );
  const { width } = useWindowDimensions();
  const { device } = useSelector((state) => state.deviceReducer);
  const [open, setOpen] = useState(false);
  const [newArray, setNewArray] = useState([]);
  const [imageString, setImageString] = useState(-1);
  const [sortedArray, setSortedArray] = useState([]);
  const videored = useRef();

  const handlevideo = (event) => {
    videored.current && videored.current.play();
  };

  const getMobileOS = () => {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) {
      return "Android";
    } else if (
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    ) {
      return "iOS";
    }
    return "Window";
  };
  const os = getMobileOS();
  useEffect(() => {
    setNewArray([]);
    for (
      let i = 0;
      i < detailTournament?.skin?.skinGame?.GamePreviews?.length;
      i++
    ) {
      if (
        detailTournament?.skin?.skinGame?.GamePreviews[i].previewType ===
        "video"
      ) {
        setNewArray((prev) => [
          detailTournament?.skin?.skinGame?.GamePreviews[i],
          ...prev,
        ]);
      } else {
        setNewArray((prev) => [
          ...prev,
          detailTournament?.skin?.skinGame?.GamePreviews[i],
        ]);
      }
    }
  }, [detailTournament]);
  useEffect(() => {
    setSortedArray([newArray]);
    for (let i = 0; i < newArray?.length; i++) {
      if (newArray[i]?.id === imageString) {
        setSortedArray((prev) => [newArray[i], ...prev]);
      } else {
        setSortedArray((prev) => [...prev, newArray[i]]);
      }
    }
  }, [imageString, newArray]);

  return (
    newArray?.length > 0 && (
      <Box
        sx={{
          paddingBottom: device === "Desktop" ? "20px" : "0px",
          backgroundColor: width < 576 ? "none" : "#1D1329",
          borderRadius: "12px",
          padding: width < 576 ? "10px 0px" : "16px 25px",
        }}
        className="mt-3"
      >
        <Typography
          sx={{
            color: "#fff",
            fontWeight: "500 !important",
            fontSize: device === "Desktop" ? "18px" : "14px",
            marginLeft: "0px",
            textAlign: "start",
          }}
        >
          Game Preview
        </Typography>
        {isGetDetailAuthPromotion || isGetDetailPromotion ? (
          <BannerLoading width={"100%"} height={"200px"} />
        ) : (
          <ScrollingCarousel>
            {newArray?.map((item, index) => {
              return item?.previewType === "image" ? (
                <Box
                  key={index}
                  sx={{
                    boxSizing: "border-box",
                    padding: "8px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      height: device === "Desktop" ? "250px" : "200px",
                      width: "auto",
                    }}
                    onClick={() => {
                      setOpen(true);
                      setImageString(item.id);
                    }}
                    component={"img"}
                    src={
                      item?.previewLink
                        ? process.env.REACT_APP_SOCKET_SERVER +
                          "/" +
                          item?.previewLink
                        : images.GamePreview1
                    }
                  ></Box>
                </Box>
              ) : (
                <Box
                  key={index}
                  sx={{
                    boxSizing: "border-box",
                    padding: "8px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  {" "}
                  <video
                    ref={videored}
                    autoPlay={false}
                    playsInline={true}
                    controls
                    style={{
                      width: "auto",
                      height: device === "Desktop" ? "250px" : "200px",
                    }}
                    key={item?.previewLink}
                  >
                    <source
                      src={
                        item?.previewLink
                          ? process.env.REACT_APP_SOCKET_SERVER +
                            "/" +
                            item?.previewLink
                          : images.GamePreview1
                      }
                      type="video/mp4"
                    />
                  </video>
                  {os === "iOS" ? (
                    <>
                      <ImageGamePre
                        item={item?.previewLink}
                        handlePlayvideo={handlevideo}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </Box>
              );
            })}
          </ScrollingCarousel>
        )}
        <Dialog
          PaperProps={{
            style: {
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          }}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          sx={{ zIndex: "10000", backgroundColor: "none !important" }}
        >
          <Box
            sx={{
              position: "relative",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {" "}
            <Slider ref={slider} {...settings}>
              {sortedArray
                ?.filter((n) => {
                  return n.previewType === "image";
                })
                ?.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        boxSizing: "border-box",
                        cursor: "pointer",
                        display: "flex !important",
                        justifyContent: "center  !important",
                        padding: "10px",
                      }}
                      onClick={() => {}}
                    >
                      <Box
                        component={"img"}
                        sx={{ width: "100%", height: "auto" }}
                        src={
                          item?.previewLink
                            ? process.env.REACT_APP_SOCKET_SERVER +
                              "/" +
                              item?.previewLink
                            : images.GamePreview1
                        }
                      ></Box>
                    </Box>
                  );
                })}
            </Slider>
            <ChevronLeftIcon
              onClick={() => {
                slider.current.slickPrev();
              }}
              sx={{
                position: "absolute",
                left: "-10px",
                top: "45%",
                color: "#ffff",
                fontSize: "40px",
                cursor: "pointer",
              }}
            />
            <ChevronRightIcon
              onClick={() => {
                slider.current.slickNext();
              }}
              sx={{
                position: "absolute",
                right: "-10px",
                top: "45%",
                color: "#ffff",
                fontSize: "40px",
                cursor: "pointer",
              }}
            />
          </Box>
        </Dialog>
      </Box>
    )
  );
}
