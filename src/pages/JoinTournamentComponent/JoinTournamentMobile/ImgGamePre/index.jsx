import { Box } from "@mui/material";
import { images } from "../../../../utils/images";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function ImageGamePre(props) {
  const { item, handlePlayvideo } = props;
  const { device } = useSelector((state) => state.deviceReducer);
  const [absoluteImg, setAbsoluteImg] = useState(false);

  return (
    <>
      <Box
        sx={{
          height: device === "Desktop" ? "250px" : "200px",
          width: "100%",
          position: "absolute",
          display: absoluteImg === true ? "none" : "block",
          backgroundColor:"#0b0b0b"
        }}
      ></Box>
      <Box
        onClick={() => {
            handlePlayvideo();
            setAbsoluteImg(true);
          }}
      sx={{
         width: "auto",
         position: "absolute",
         display: absoluteImg === true ? "none" : "block",
      }}>
        <svg
      xmlns="http://www.w3.org/2000/svg"
      width="68"
      height="68"
      fill="none"
      viewBox="0 0 98 98"
    >
      <path
        fill="#fff"
        fillOpacity="0.5"
        d="M49 0C21.938 0 0 21.938 0 49s21.938 49 49 49c27.064 0 49-21.938 49-49S76.064 0 49 0zm0 88.2C27.385 88.2 9.8 70.615 9.8 49 9.8 27.385 27.385 9.8 49 9.8c21.615 0 39.2 17.585 39.2 39.2 0 21.615-17.585 39.2-39.2 39.2z"
      ></path>
      <path
        fill="#fff"
        fillOpacity="0.5"
        d="M66.822 45.57L43.059 31.85c-3.267-1.886-5.94-.343-5.94 3.43v27.44c0 3.773 2.672 5.317 5.94 3.43l23.763-13.72c3.267-1.886 3.267-4.975 0-6.86z"
      ></path>
    </svg>
      </Box>
    </>
  );
}
