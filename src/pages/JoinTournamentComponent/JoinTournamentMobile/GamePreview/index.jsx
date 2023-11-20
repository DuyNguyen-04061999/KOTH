import { Dialog, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { images } from "../../../../utils/images";
import "./index.scss";

export default function GamePreview() {
  const settings = {
    arrows: false,
    slidesToShow: 1,
  };
  const slider = useRef();
  const { detailTournament } = useSelector((state) => state.playgameReducer);
  const { device } = useSelector((state) => state.deviceReducer);
  const [open, setOpen] = useState(false);
  const [newArray, setNewArray] = useState([]);
  const [imageString, setImageString] = useState("")

  useEffect(() => {
    setNewArray([]);
    for (
      let i = 0;
      i < detailTournament?.skin?.skinGame?.GamePreviews?.length;
      i++
    ) {
      if (
        detailTournament?.skin?.skinGame?.GamePreviews[i].previewType ===
        "video"
      ) {
        setNewArray((prev) => [
          detailTournament?.skin?.skinGame?.GamePreviews[i],
          ...prev,
        ]);
      } else {
        setNewArray((prev) => [
          ...prev,
          detailTournament?.skin?.skinGame?.GamePreviews[i],
        ]);
      }
    }
  }, [detailTournament]);

  useEffect(() => {
    if(imageString) {
      const res1 = newArray?.filter(i => i?.previewLink === imageString)
      const res2 = newArray?.filter(i => i?.previewLink !== imageString)
      if(res1 && res2 && res1?.length > 0 && res2?.length > 0) {
        const res = [res1[0], ...res2]
        setNewArray(res)
      }
    }
  }, [imageString, newArray])

  return (
    newArray?.length > 0 && (
      <Box
        sx={{
          paddingBottom: device === "Desktop" ? "20px" : "0px",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontWeight: "500 !important",
            fontSize: device === "Desktop" ? "18px" : "14px",
            marginLeft: "0px",
            textAlign: "start",
          }}
        >
          Game Preview
        </Typography>
        <ScrollingCarousel>
          {newArray?.map((item, index) => {
            return item?.previewType === "image" ? (
              <Box
                key={index}
                sx={{
                  boxSizing: "border-box",
                  padding: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    height: device === "Desktop" ? "250px" : "200px",
                    width: "auto",
                  }}
                  onClick={() => {
                    setOpen(true);
                    setImageString(item?.previewLink || "")
                  }}
                  component={"img"}
                  src={
                    item?.previewLink
                      ? process.env.REACT_APP_SOCKET_SERVER +
                        "/" +
                        item?.previewLink
                      : images.GamePreview1
                  }
                ></Box>
              </Box>
            ) : (
              <Box
                key={index}
                sx={{
                  boxSizing: "border-box",
                  padding: "8px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                <video
                  autoPlay={false}
                  playsInline={true}
                  controls={true}
                  style={{
                    width: "auto",
                    height: device === "Desktop" ? "250px" : "200px",
                  }}
                  key={item?.previewLink}
                >
                  <source
                      src={
                        item?.previewLink
                          ? process.env.REACT_APP_SOCKET_SERVER +
                            "/" +
                            item?.previewLink
                          : images.GamePreview1
                      }
                      type="video/mp4"
                    />
                </video>
              </Box>
            );
          })}
        </ScrollingCarousel>
        <Dialog
          PaperProps={{
            style: {
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          }}
          open={open}
          onClose={() => {
            setOpen(false);
            setImageString("")
          }}
          sx={{ zIndex: "10000", backgroundColor: "none !important" }}
        >
          <Box sx={{ position: "relative", padding: "20px" }}>
            {" "}
            <Slider ref={slider} {...settings}>
              {newArray
                ?.filter((n) => {
                  return n.previewType === "image";
                })
                ?.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        boxSizing: "border-box",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        padding: "10px",
                      }}
                      onClick={() => {
                        
                      }}
                    >
                      <Box
                        component={"img"}
                        sx={{ width: "100%" }}
                        src={
                          item?.previewLink
                            ? process.env.REACT_APP_SOCKET_SERVER +
                              "/" +
                              item?.previewLink
                            : images.GamePreview1
                        }
                      ></Box>
                    </Box>
                  );
                })}
            </Slider>
            <i
              style={{
                position: "absolute",
                left: "0px",
                top: "45%",
                color: "#ffff",
                fontSize: "30px",
                cursor: "pointer",
              }}
              onClick={() => {
                slider.current.slickPrev();
              }}
              className="fa-solid fa-angle-left"
            ></i>
            <i
              style={{
                position: "absolute",
                right: "0px",
                top: "45%",
                color: "#ffff",
                fontSize: "30px",
                cursor: "pointer",
              }}
              onClick={() => {
                slider.current.slickNext();
              }}
              className="fa-solid fa-angle-right"
            ></i>
          </Box>
        </Dialog>
      </Box>
    )
  );
}
