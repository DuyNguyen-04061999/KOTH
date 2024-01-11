import { Box } from "@mui/material";
import React, { useState } from "react";
import useWindowDimensions from "../../utils/useWindowDimensions";
import CommentItem from "./CommentItem";
import { useSelector } from "react-redux";

export default function FullCommnet() {
  const { width } = useWindowDimensions();
  const [showMore, setShowMore] = useState(false);
  const { listCommentPromo, postingComment } = useSelector(
    (state) => state.commentReducer
  );
  const { user, userAvatar } = useSelector((state) => state.userReducer);
  return (
    <Box>
      <Box
        sx={
          showMore
            ? {
                marginTop: "10px",
                maxHeight: "400px",
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
        {postingComment !== "" && (
          <CommentItem
            userNickName={user?.userNickName}
            content={postingComment}
            type="posting"
            userAvatar={userAvatar}
          />
        )}
        {showMore
          ? listCommentPromo?.toReversed()?.map((item, index) => {
              return (
                <CommentItem
                  userNickName={item?.commentUser?.userNickName}
                  createdAt={item?.createdAt}
                  content={item?.content}
                  type="other"
                  key={index}
                  userAvatar={item?.commentUser?.userAccount?.accountAvatar}
                />
              );
            })
          : listCommentPromo
              ?.toReversed()
              ?.slice(0, 2)
              .map((item, index) => {
                return (
                  <CommentItem
                    userNickName={item?.commentUser?.userNickName}
                    createdAt={item?.createdAt}
                    content={item?.content}
                    type="other"
                    key={index}
                    userAvatar={item?.commentUser?.userAccount?.accountAvatar}
                  />
                );
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
