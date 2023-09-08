import React from "react";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { Skeleton } from "@mui/material";

const BannerLoading = (props) => {
  const {
    width,
    height,
    animation = "pulse",
    bgColor = "white",
    variant = "rectangular",
    ...other
  } = props;

  return (
    <Skeleton
      sx={{
        height: height,
        width: width,
        bgcolor: bgColor,
        other
      }}
      variant={variant}
      animation={animation}
    ></Skeleton>
  );
};

export default BannerLoading;
