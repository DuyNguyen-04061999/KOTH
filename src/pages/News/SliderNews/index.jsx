import { Box } from "@mui/material";
import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import useWindowDimensions from "../../../utils/useWindowDimensions";
import { images } from "../../../utils/images";

export default function SliderNews(props) {
  const [selectedIndex, setIndex] = useState(0);
  const { width } = useWindowDimensions();
  const {
    images: img,
    appendDot,
    htmlCode,
    isHtmlCode,
    tours,
    type,
    typeR,
  } = props;
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const settings = {
    dots: true,
    arrows: false,
    // autoplay: true,
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

  return (
    <Slider {...settings}>
      {img?.map((item, index) => {
        return (
          <Box key={index}>
            {width > 576 ? (
              <Box
                key={index}
                sx={{
                  height: 0,
                  paddingBottom: "400px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    maxWidth: "100%",
                    height: "auto",
                  }}
                  component={"img"}
                  alt="..."
                  // src={`https://storage.googleapis.com/play4promo_bucket/public/promotions/undefined_avatar_1712848051864.png`}
                  src={
                    item?.thumbnail
                      ? process.env.REACT_APP_SOCKET_SERVER + "/" +
                        item?.thumbnail
                      : images.christbg
                  }
                ></Box>
              </Box>
            ) : (
              <Box
                key={index}
                sx={{
                  height: 0,
                  paddingBottom: "200px",
                  position: "relative",
                  overflow: "hidden",
                }}
                // href="mailto:support@play4promo.com"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    maxWidth: "100%",
                    height: "auto",
                  }}
                  component={"img"}
                  alt="..."
                  // src={images.BannerHomePageDesktop}
                  src={
                    item?.thumbnail
                      ? process.env.REACT_APP_SOCKET_SERVER + "/" +
                        item?.thumbnail
                      : images.christbg
                  }
                ></Box>
              </Box>
            )}
          </Box>
        );
      })}
    </Slider>
  );
}
