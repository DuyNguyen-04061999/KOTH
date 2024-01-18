import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { images } from "../../utils/images";
import useWindowDimensions from "../../utils/useWindowDimensions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCommentPromotion } from "../../redux-saga-middleware/reducers/commentReducer";
import moment from "moment";

export default function CommentItem(props) {
  const { type, content, createdAt, userNickName, userAvatar } = props;
  const { postingComment } = useSelector((state) => state.commentReducer);
  const { width } = useWindowDimensions();
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const isWhitespaceString = (str) => !str.replace(/\s/g, "").length;
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
        src={
          userAvatar
            ? process.env.REACT_APP_SOCKET_SERVER + "/" + userAvatar
            : images.undefinedAvatar
        }
      ></Box>
      <Box sx={{ marginLeft: "10px" }}>
        <Box
          sx={{
            fontSize: width < 576 ? "12px" : "14px",
            color: "#7C81F2",
            textAlign: "start",
          }}
        >
          {userNickName}
          <span
            style={{ fontSize: "11px", color: "#9384B7", marginLeft: "10px" }}
          >
            {moment(createdAt).format("MM/DD HH:mm")}
          </span>
        </Box>
        <Box
          sx={{
            fontSize: width < 576 ? "12px" : "14px",
            textAlign: "start",
            color: "#fff",
            wordBreak: "break-all",
          }}
        >
          {content}
        </Box>
      </Box>
    </Box>
  ) : type === "personal" ? (
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
        src={
          userAvatar
            ? process.env.REACT_APP_SOCKET_SERVER + "/" + userAvatar
            : images.undefinedAvatar
        }
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
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
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
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Box
            sx={{
              color: "#979797",
              display: "flex",
              alignItems: "flex-end",
              width:"100%"
            }}
          >
            <Typography sx={{ fontSize: width < 576 ? "10px" : "12px" }}>
              {" "}
              {comment.trim().length}/256
            </Typography>
          </Box>
          <Box sx={{
            display:"flex"
          }}>
            {" "}
            <button
              onClick={() => {
                setComment("");
              }}
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
              onClick={() => {
                if (
                  comment !== "" &&
                  postingComment === "" &&
                  !isWhitespaceString(comment) &&
                  comment.trim().length <= 256
                ) {
                  dispatch(
                    addCommentPromotion({
                      promoId: id,
                      comment: comment.trim(),
                    })
                  );
                  setComment("");
                }
              }}
              style={{
                width: width < 576 ? "90px" : "140px",
                height: width < 576 ? "30px" : "35px",
                fontSize: width < 576 ? "10px" : "13px",
                borderRadius: "4px",
                backgroundColor:
                  comment === "" ||
                  postingComment !== "" ||
                  isWhitespaceString(comment) ||
                  comment.trim().length > 256
                    ? "#979797"
                    : "#7848ED",
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
        src={
          userAvatar
            ? process.env.REACT_APP_SOCKET_SERVER + "/" + userAvatar
            : images.undefinedAvatar
        }
      ></Box>
      <Box sx={{ marginLeft: "10px" }}>
        <Box
          sx={{
            fontSize: width < 576 ? "12px" : "14px",
            color: "#7C81F2",
            textAlign: "start",
          }}
        >
          {userNickName}
          <span
            style={{ fontSize: "11px", color: "#9384B7", marginLeft: "10px" }}
          >
            Posting...
          </span>
        </Box>
        <Box
          sx={{
            fontSize: width < 576 ? "12px" : "14px",
            textAlign: "start",
            color: "#fff",
          }}
        >
          {content}
        </Box>
      </Box>
    </Box>
  );
}
