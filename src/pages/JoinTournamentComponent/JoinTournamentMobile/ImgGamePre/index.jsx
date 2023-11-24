import { Box } from "@mui/material";
import { images } from "../../../../utils/images";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function ImageGamePre( props ) {
  const { item , handlePlayvideo} = props;
  const { device } = useSelector((state) => state.deviceReducer);
  const [absoluteImg,setAbsoluteImg] = useState(false)


  return (
    <>
      <Box
        sx={{
          height: device === "Desktop" ? "250px" : "200px",
          width: "auto",
          position:"absolute",
          display: absoluteImg === true ? "none" : "block"
        }}
        onClick={() => {
            handlePlayvideo()
            setAbsoluteImg(true)
        }}
        component={"img"}
        src={
           images.GamePreview1
        }
      ></Box>
    </>
  );
}
