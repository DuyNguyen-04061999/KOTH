import { Box } from "@mui/material";
import React, { useState } from "react";
import useWindowDimensions from "../../utils/useWindowDimensions";
import CommentItem from "./CommentItem";

export default function FullCommnet() {
  const { width } = useWindowDimensions();
  const [showMore, setShowMore] = useState(false);
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6];
  return (
    <Box>
      <Box
        sx={
          showMore
            ? {
                marginTop: "10px",
                height: "400px",
                overflow: "auto",
                "&::-webkit-scrollbar": { width: "3px" },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-track": { background: "transparent" },
              }
            : { marginTop: "10px" }
        }
      >
        {showMore
          ? array.map((item, index) => {
              return <CommentItem type="other" key={index} />;
            })
          : array.slice(0, 2).map((item, index) => {
              return <CommentItem type="other" key={index} />;
            })}
      </Box>
      <Box sx={{ marginTop: "10px" }}>
        <span
          onClick={() => {
            setShowMore((prev) => {
              return !prev;
            });
          }}
          style={{
            color: "#7861B9",
            fontSize: width < 576 ? "12px" : "14px",
            cursor: "pointer",
          }}
        >
          {!showMore ? "Show all comments" : "Show less comments"}
        </span>
      </Box>
    </Box>
  );
}
