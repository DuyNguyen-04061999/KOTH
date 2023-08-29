import { Box } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import { useState } from "react";
import useWindowDimensions from "../../utils/useWindowDimensions";
import { useNavigate } from "react-router-dom";

export default function SlickSlider(props) {
  const [selectedIndex, setIndex] = useState(0);
  const { width } = useWindowDimensions();
  const { images, appendDot, htmlCode, isHtmlCode } = props;
  const settings = {
    dots: true,
    arrows: false,
    autoplay: true,
    fade: true,
    autoplaySpeed: 2000,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (prev, next) => {
      setIndex(next);
    },
    appendDots: (dots) => (
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
    ),
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
      {!isHtmlCode
        ? [...images].map((item, index) => {
            return (
              <Box
                sx={{
                  height: width < 576 ? "208px" : "363px",
                }}
              >
                <Box
                  onClick={() => {
                    navigate("/tournamentDetail/1");
                  }}
                  sx={{
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                    borderRadius: "8px",
                    objectFit: "cover"
                  }}
                  key={index}
                  component={"img"}
                  src={item}
                ></Box>
              </Box>
            );
          })
        : htmlCode}
    </Slider>
  );
}
