import { Skeleton } from "@mui/material";
import React from "react";

const BannerLoading = (props) => {
  const {
    width="100%",
    height= "fit-content",
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
