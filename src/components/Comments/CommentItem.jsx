import { Box, Typography } from "@mui/material";
import React from "react";
import { images } from "../../utils/images";
import useWindowDimensions from "../../utils/useWindowDimensions";

export default function CommentItem({ type }) {
  const { width } = useWindowDimensions();
  return type === "other" ? (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        marginTop: width < 576 ? "20px" : "30px",
        padding: "0px 10px 0px 0px",
      }}
    >
      <Box
        sx={{ width: "32px", height: "32px", borderRadius: "50%" }}
        component={"img"}
        src={images.Aa}
      ></Box>
      <Box sx={{ marginLeft: "10px" }}>
        <Box
          sx={{
            fontSize: width < 576 ? "12px" : "14px",
            color: "#7C81F2",
            textAlign: "start",
          }}
        >
          Pikachu{" "}
          <span style={{ fontSize: "11px", color: "#9384B7" }}>11:20 am</span>
        </Box>
        <Box
          sx={{
            fontSize: width < 576 ? "12px" : "14px",
            textAlign: "start",
            color: "#fff",
          }}
        >
          But let's not forget the hidden gems, the indie darlings, the games
          that never got the recognition they deserved! That little platformer
          with the hand-drawn art and the killer soundtrack? Pure indie magic!
          Or that narrative-driven RPG where you play as a sentient teapot?
          Instant classic, in my book.
        </Box>
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        marginTop: width < 576 ? "20px" : "30px",
        padding: "0px 10px 0px 0px",
      }}
    >
      <Box
        sx={{ width: "32px", height: "32px", borderRadius: "50%" }}
        component={"img"}
        src={images.Aa}
      ></Box>
      <Box
        sx={{
          marginLeft: "10px",
          backgroundColor: "#271C39",
          boxSizing: "border-box",
          padding: "18px 22px",
          width: "100%",
          borderRadius: "8px",
        }}
      >
        <textarea
          placeholder="Write your comment ..."
          style={{
            width: "100%",
            resize: "none",
            height: width < 576 ? "50px" : "100px",
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            fontSize: width < 576 ? "12px" : "14px",
            fontFamily: "Cyntho Next",
            color: "#fff",
          }}
        ></textarea>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          <button
            style={{
              width: width < 576 ? "90px" : "140px",
              height: width < 576 ? "30px" : "35px",
              fontSize: width < 576 ? "10px" : "13px",
              borderRadius: "4px",
              marginRight: "15px",
              backgroundColor: "#271C39",
              color: "#7848ED",
              border: "1px solid #7848ED",
              fontFamily: "Cyntho Next",
              outline: "none",
            }}
          >
            Cancel
          </button>
          <button
            style={{
              width: width < 576 ? "90px" : "140px",
              height: width < 576 ? "30px" : "35px",
              fontSize: width < 576 ? "10px" : "13px",
              borderRadius: "4px",
              backgroundColor: "#7848ED",
              color: "#fff",
              outline: "none",
              border: "none",
              fontFamily: "Cyntho Next",
            }}
          >
            Send
          </button>
        </Box>
      </Box>
    </Box>
  );
}
