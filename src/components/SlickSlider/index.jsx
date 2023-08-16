import { Box } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import { useState } from "react";

export default function SlickSlider(props) {
  const [selectedIndex, setIndex] = useState(0);
  const { images, appendDot } = props;
  const settings = {
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1000,
    adaptiveHeight: true,
    beforeChange: (prev, next) => {
      setIndex(next);
    },
    dotsClass: "dotClass",
    appendDots: (dots) => (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bottom: appendDot ? "0px" : "-15px",
          position: "absolute",
          padding: "5px",
          height: "26px",
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
          width: i === selectedIndex ? "20px" : "9px",
          height: "4px",
          background: i === selectedIndex ? "#ffff" : "#989898",
          borderRadius: "5px",
          marginLeft: "10px",
          transition: "0.4s",
        }}
      ></div>
    ),
  };
  return (
    <Slider {...settings}>
      {[...images].map((item, index) => {
        return (
          <Box
            key={index}
            sx={{ width: "100%", cursor: "pointer" }}
            component={"img"}
            src={item}
          ></Box>
        );
      })}
    </Slider>
  );
}
