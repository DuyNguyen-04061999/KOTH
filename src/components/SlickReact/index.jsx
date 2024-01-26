import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Grid } from "@mui/material";
import { imagesV2 } from "../../utils/images";
import "./index.scss";

export default function SlickReact() {
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
    dots: false,
    infinite: true,
    autoplay: true,
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
  };
  return (
    <>
      <Slider {...settings}>
        <div>
          <Grid container columnSpacing={2} className="box-content">
            <Grid item xs={6} className="box-banner">
              <img
                src={imagesV2.bn2}
                alt="..."
                className="img-zoom"
                style={{ width: "100%", height: "100%" }}
                onClick={() => {}}
              />
            </Grid>
            <Grid item xs={6} className="box-banner">
              <img
                src={imagesV2.bn3}
                alt="..."
                className="img-zoom"
                style={{ width: "100%", height: "100%" }}
                onClick={() => {}}
              />
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container columnSpacing={2}>
            <Grid item xs={6}>
              <img
                src={imagesV2.bn2}
                alt="..."
                className="img-zoom"
                style={{ width: "100%", height: "100%" }}
                onClick={() => {}}
              />
            </Grid>
            <Grid item xs={6}>
              <img
                src={imagesV2.bn3}
                alt="..."
                className="img-zoom"
                style={{ width: "100%", height: "100%" }}
                onClick={() => {}}
              />
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container columnSpacing={2}>
            <Grid item xs={6}>
              <img
                src={imagesV2.bn2}
                alt="..."
                className="img-zoom"
                style={{ width: "100%", height: "100%" }}
                onClick={() => {}}
              />
            </Grid>
            <Grid item xs={6}>
              <img
                src={imagesV2.bn3}
                alt="..."
                className="img-zoom"
                style={{ width: "100%", height: "100%" }}
                onClick={() => {}}
              />
            </Grid>
          </Grid>
        </div>
      </Slider>
    </>
  );
}
