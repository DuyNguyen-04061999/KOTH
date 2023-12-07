import { Box } from "@mui/material";
import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { toggleLoginDialog } from "../../redux-saga-middleware/reducers/authReducer";
import { images } from "../../utils/images";
import useWindowDimensions from "../../utils/useWindowDimensions";

export default function SlickSlider(props) {
  const [selectedIndex, setIndex] = useState(0);
  const { device } = useSelector((state) => state.deviceReducer);
  const { orientation } = useSelector((state) => state.gameReducer);
  const { width } = useWindowDimensions();
  const { images: img, appendDot, htmlCode, isHtmlCode, tours, type, typeR } = props;
  const dispatch = useDispatch()
  const token = localStorage.getItem("token");

  const settings = {
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (prev, next) => {
      setIndex(next);
    },
    appendDots: (dots) => {
      if (dots?.length >= 10) {
        dots = dots?.slice(0, 5);
      }
      return (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bottom: appendDot ? "0px" : "-20px",
            position: "absolute",
            padding: "5px",
            height: width > 576 ? "20px" : "15px",
            backgroundColor: appendDot ? "rgba(0, 0, 0, 0.24)" : "none",
            backdropFilter: appendDot ? "blur(2px)" : "none",
            marginBottom: "0px",
            width: "100%",
          }}
        >
          {dots}
        </Box>
      );
    },
    customPaging: (i) => (
      <div
        style={{
          width: i === selectedIndex ? "20px" : "10px",
          height: "4px",
          background: i === selectedIndex ? "#ffff" : "#989898",
          borderRadius: "5px",
          transition: "0.4s",
          marginTop: width > 576 ? "10px" : "8px",
        }}
      ></div>
    ),
  };

  const navigate = useNavigate();

  function getImage(item) {
    const name = item?.tournamentBrand?.brandName || "";

    if (name?.includes("Play 4 Promo")) {
      if (width < 576) return images?.bn5;
      else return images?.bn3;
    } else if (name?.includes("Dr Pepper")) {
      if (width < 576) return images?.bn4;
      else return images?.bn1;
    } else if (name?.includes("Taylor Swift")) {
      if (width < 576) return images?.bn6;
      else return images?.bn2;
    }
    return images?.pepperBanner;
  }


  return img?.length > 0 ? (
    <Slider {...settings}>
      {img?.map((item, index) => {
        return (
          <Box
            key={index}
            sx={{
              height: width < 576 ? "208px" : "100%",
            }}
            onClick={() => {
              if(typeR === "banner") {
                if(index === 0) {
                  navigate("/packages")
                }
                else if( token === "" || token === null || token === undefined ) {
                  dispatch(toggleLoginDialog())
                }
              }
            }}
          >
            <LazyLoadImage
              style={{
                width: "100%",
                height: "100%",
                cursor: "pointer",
                borderRadius: "8px",
                objectFit: "contain",
              }}
              effect="blur"
              wrapperProps={{
                style: {
                  transitionDelay: "0.5s",
                },
              }}
              src={
                type && type === "tour"
                  ? process.env.REACT_APP_SOCKET_SERVER + "/" + item
                  : item
              }
            ></LazyLoadImage>
          </Box>
        );
      })}
    </Slider>
  ) : (
    <Slider {...settings}>
      {!isHtmlCode && tours && tours?.length >= 1
        ? tours
            ?.filter((item) => item)
            ?.map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    height: width < 576 ? "182.4px" : "auto",
                  }}
                >
                  <LazyLoadImage
                    onClick={() => {
                      navigate(`/promotion-detail/${item?.id}`);
                    }}
                    style={{
                      width: "100%",
                      height: width > 576 ? "100%" : "182.4px",
                      cursor: "pointer",
                      borderRadius: "8px",
                      objectFit: "contain",
                    }}
                    src={
                      (device === "Mobile" ||
                        (device === "Tablet" && orientation === "portrait")) &&
                      item?.tournamentBackgroundMobile
                        ? process.env.REACT_APP_SOCKET_SERVER +
                          "/" +
                          item?.tournamentBackgroundMobile
                        : item?.tournamentBackground
                        ? process.env.REACT_APP_SOCKET_SERVER +
                          "/" +
                          item?.tournamentBackground
                        : getImage(item)
                    }
                    effect="blur"
                    wrapperProps={{
                      style: {
                        transitionDelay: "0.5s",
                      },
                    }}
                  ></LazyLoadImage>
                </Box>
              );
            })
        : htmlCode}
    </Slider>
  );
}
