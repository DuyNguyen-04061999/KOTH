import { Box, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";

export default function SliderTime({
  list,
  selectedItem,
  updateSelectedIndex,
}) {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 6.5,
    slidesToScroll: 6,
    arrows: false,
    focusOnSelect: true,
  };
  return (
    <Slider {...settings}>
      {list?.map((item, index) => {
        return (
          <Box
            key={index}
            onClick={() => {
              updateSelectedIndex(index);
            }}
            sx={{
              borderBottom: `1px solid ${
                index === selectedItem ? "#50A0FC" : "#39353E"
              }`,
              padding: "8px 0px",
              marginTop: "16px",
              display: "flex",
              justifyContent: "center",
              transition: "0.3s",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                color: index === selectedItem ? "#50A0FC" : "#ffff",
                fontWeight: "lighter !important",
                marginLeft: "0px !important",
              }}
            >
              {item}
            </Typography>
          </Box>
        );
      })}
    </Slider>
  );
}
