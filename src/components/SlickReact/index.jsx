import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss";
import { Box } from "@mui/material";
import ListPackage from "../../pages/PackagePage/component/ListPackage";

export default function SlickReact(props) {
  const { itemSub, appendDot } = props;
  const [selectedIndex, setIndex] = useState(0);

  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick} style={{ display: "none" }}>
        <i className="fas fa-chevron-right"></i>
      </div>
    );
  };
  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick} style={{ display: "none" }}>
        <i className="fas fa-chevron-left"></i>
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    autoplay: false,
    interval: 1000,
    autoplaySpeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipe: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    beforeChange: (prev, next) => {
      setIndex(next);
    },
    customPaging: (i) => (
      <div
        style={{
          width: i === selectedIndex ? "20px" : "10px",
          height: "4px",
          background: i === selectedIndex ? "#ffff" : "#989898",
          borderRadius: "5px",
          transition: "0.4s",
          marginTop: "15px",
        }}
      ></div>
    ),
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
            bottom: "-10px",
            position: "absolute",
            padding: "5px",
            height: "20px" ,
            // backgroundColor:  "rgba(0, 0, 0, 0.24)" ,
            backdropFilter: "blur(2px)",
            marginBottom: "0px",
            width: "100%",
          }}
        >
          {dots}
        </Box>
      );
    },
  };
  return (
    <>
      <Slider {...settings}>
        {itemSub?.map((i, index) => {
          return (
            <Box
              key={index}
              sx={{
                display:"flex !important",
                justifyContent:"center",
                alignItems:"center"
              }}
            >
              <ListPackage
                packageName={i?.packageName}
                packageAvatar={i?.packageAvatar}
                packagePrice={i?.packagePrice}
                packageFreeTicketTournament={i?.packageFreeTicketTournament}
                packageReduceWatchAds={i?.packageReduceWatchAds}
                id={i?.id}
                avatarChristmas={i?.packageAvatarChristmas}
                des={i?.packageDescription}
                packageCategory={i?.packageCategory}
              />
            </Box>
          );
        })}
      </Slider>
    </>
  );
}
