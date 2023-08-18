import { Box, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import useWindowDimensions from "../../utils/useWindowDimensions";

export default function SliderTime({
  list,
  selectedItem,
  updateSelectedIndex,
  type,
}) {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: type === "day" ? 7 : 6,
    slidesToScroll: 4,
    arrows: false,
    focusOnSelect: true,
  };
  const { width } = useWindowDimensions();

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
              } !important`,
              marginTop: "16px",
              paddingBottom: "8px",
              display: "flex",
              justifyContent: "center",
              transition: "0.3s",
              cursor: "pointer",
            }}
          >
            <Typography
              sx={{
                fontSize: width < 576 ? "12px" : "16px",
                color: index === selectedItem ? "#50A0FC" : "#ffff",
                fontWeight: "lighter !important",
                marginLeft: "0px !important",
              }}
            >
              {type === "day" ? item.slice(0, 3) : item}
            </Typography>
          </Box>
        );
      })}
    </Slider>
  );
}
