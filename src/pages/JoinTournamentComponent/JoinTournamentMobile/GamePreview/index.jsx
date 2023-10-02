import { Dialog, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React, { useState } from "react";
import { images } from "../../../../utils/images";
import { useSelector } from "react-redux";
import "./index.scss";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import Slider from "react-slick";
export default function GamePreview() {
  const { device } = useSelector((state) => state.deviceReducer);
  const [open, setOpen] = useState(false);
  const { width } = useWindowDimensions();
  const settings = {
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };
  return (
    <Box
      sx={{
        padding:
          device === "Desktop" ? "0px 0px 20px 0px" : "28px 28px 0px 28px",
      }}
    >
      <Typography
        sx={{
          color: "#fff",
          fontWeight: "600 !important",
          fontSize: device === "Desktop" ? "18px" : "14px",
          marginLeft: "0px",
        }}
      >
        Game Preview
      </Typography>
      <ScrollingCarousel>
        {[1, 2, 3, 4, 5].map((item) => {
          return (
            <Box
              sx={{
                boxSizing: "border-box",
                padding: "8px",
                cursor: "pointer",
              }}
            >
              <Box
                onClick={() => {
                  setOpen(true);
                  console.log("hello");
                }}
                component={"img"}
                src={images.GamePreview1}
              ></Box>
            </Box>
          );
        })}
      </ScrollingCarousel>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        sx={{ zIndex: "10000" }}
      >
        {" "}
        {/* <Box
          sx={{
            width: device === "Desktop" ? `${width / 5}px` : `${width / 1.5}px`,
          }}
          component={"img"}
          src={images.GamePreview1}
        ></Box> */}
        <Slider {...settings}>
          {[1, 2, 3, 4, 5, 6, 7]?.map((item) => {
            return <Box component={"img"} src={images.GamePreview1}></Box>;
          })}
        </Slider>
      </Dialog>
    </Box>
  );
}
