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
    const { className, onClick, style } = props;
    return (
      <div
        className={className}
        onClick={onClick}
        style={{ ...style, position: "absolute", top: -20, right: 0,
        background:"transparent"
      }}
      >
     
      </div>
    );
  };
  const PrevArrow = (props) => {
    const { className, onClick, style } = props;
    return (
      <div
        className={className}
        onClick={onClick}
        style={{ position: "absolute", top: -20, left: "93%" }}
      >
  
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
            height: "20px",
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
      {/* <Box sx={{
        display:"flex",
        justifyContent:"flex-end",
        alignItems:"center",
        marginBottom:"20px"
      }}>
        <Box className="next" sx={{marginRight:"10px",width:"24px", cursor:"pointer"}} onClick={(next) => {
           setIndex(next);
        }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="15"
            viewBox="0 0 9 15"
            fill="none"
          >
            <path
              d="M3.31459 7.54983L8.55196 2.31224C8.69617 2.16837 8.7755 1.97601 8.7755 1.77091C8.7755 1.56569 8.69617 1.37344 8.55196 1.22935L8.09303 0.770648C7.94905 0.626323 7.75657 0.546876 7.55147 0.546876C7.34636 0.546876 7.15412 0.626323 7.01002 0.770648L0.774101 7.00645C0.629434 7.15101 0.550215 7.34416 0.550784 7.54949C0.550215 7.75574 0.62932 7.94866 0.774101 8.09333L7.00421 14.3231C7.14831 14.4674 7.34056 14.5469 7.54578 14.5469C7.75088 14.5469 7.94313 14.4674 8.08734 14.3231L8.54615 13.8644C8.8447 13.5659 8.8447 13.0798 8.54615 12.7814L3.31459 7.54983Z"
              fill="#BE48ED"
            />
          </svg>
        </Box>
        <Box className="prev" sx={{marginLeft:"10px", width:"24px", cursor:"pointer"}} onClick={(prev) => {
           setIndex(prev);
        }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="15"
            viewBox="0 0 9 15"
            fill="none"
          >
            <path
              d="M6.2401 7.54983L1.00273 2.31224C0.858521 2.16837 0.779187 1.97601 0.779187 1.77091C0.779187 1.56569 0.858521 1.37344 1.00273 1.22935L1.46166 0.770648C1.60564 0.626323 1.79811 0.546876 2.00322 0.546876C2.20833 0.546876 2.40057 0.626323 2.54467 0.770648L8.78059 7.00645C8.92525 7.15101 9.00447 7.34416 9.0039 7.54949C9.00447 7.75574 8.92537 7.94866 8.78059 8.09333L2.55047 14.3231C2.40638 14.4674 2.21413 14.5469 2.00891 14.5469C1.80381 14.5469 1.61156 14.4674 1.46735 14.3231L1.00854 13.8644C0.709985 13.5659 0.709985 13.0798 1.00854 12.7814L6.2401 7.54983Z"
              fill="#BE48ED"
            />
          </svg>
        </Box>
      </Box> */}
      <Slider {...settings}>
        {itemSub?.map((i, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex !important",
                justifyContent: "center",
                alignItems: "center",
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
