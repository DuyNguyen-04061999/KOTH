import { Box } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import { useState } from "react";
import useWindowDimensions from "../../utils/useWindowDimensions";
import { useNavigate } from "react-router-dom";
import { images } from "../../utils/images";

export default function SlickSlider(props) {
  const [selectedIndex, setIndex] = useState(0);
  const { width } = useWindowDimensions();
  const { images: im, appendDot, htmlCode, isHtmlCode, tours } = props;
  
  const settings = {
    dots: true,
    arrows: false,
    autoplay: true,
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

  function getImage(item) {
    const name = item?.tournamentBrand?.brandName || ""
    
    if(name?.includes("Samsung")) {
      if(width < 576) return images?.bn5 
      else return images?.bn3
    } else if (name?.includes("Dr Pepper")) {
      if(width < 576) return images?.bn4
      else return images?.bn1
    } else if (name?.includes("Taylor Swift")) {
      if(width < 576) return images?.bn6
      else return images?.bn2
    }
    return images?.pepperBanner
  }
console.log(tours);

  return (
    <Slider {...settings}>
      {!isHtmlCode
        ? [...tours]?.filter(item => item)?.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  height: width < 576 ? "208px" : "363px",
                }}
                
              >
                <Box
                  onClick={() => {
                    console.log("item", item);
                    navigate(`/tournamentDetail/${item?.id}`);
                  }}
                  sx={{
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                    borderRadius: "8px",
                    objectFit: "cover"
                  }}
                  component={"img"}
                  src={getImage(item)}
                ></Box>
              </Box>
            );
          })
        : htmlCode}
    </Slider>
  );
}
