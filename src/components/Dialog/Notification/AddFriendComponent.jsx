import { Box } from "@mui/material";
import React from "react";
import { images } from "../../../utils/images";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  acceptFriendRequest,
  deleteFriendRequest,
} from "../../../redux-saga-middleware/reducers/notificationReducer";

export default function AddFriendComponent(props) {
  const { content, id, status, otherAvatar, createdAt } = props;
  const dispatch = useDispatch();
  return (
    <Box
      component={"div"}
      className="text-white d-flex"
      sx={{
        background: "#2E233D",
        padding: "16px 0px",
        borderBottom: "solid 1px #443565",
      }}
    >
      {otherAvatar ? (
        <Box
          sx={{
            width: 50,
            height: 50,
            backgroundColor: "#fff",
            borderRadius: "50%",
          }}
          component={"img"}
          src={
            otherAvatar
              ? process.env.REACT_APP_SOCKET_SERVER + "/" + otherAvatar
              : images.undefinedAvatar
          }
        ></Box>
      ) : (
        <Box
          sx={{
            width: 50,
            height: 50,
            backgroundColor: "#fff",
            borderRadius: "50%",
          }}
        ></Box>
      )}
      <Box
        className="ms-2"
        sx={{
          fontSize: 14,
        }}
      >
        {content}
        <Box
          component={"div"}
          className="mt-1 mb-1"
          sx={{
            fontSize: 12,
            color: "#9384B7",
          }}
        >
          {moment(createdAt)?.format("M/D/YYYY, hh:mm a")}
        </Box>
        {status === 0 && (
          <Box
            onClick={() => {
              dispatch(deleteFriendRequest(id));
            }}
            component={"div"}
            className="d-flex mt-2 justify-content-between"
          >
            <Box
              component={"div"}
              className="p-2 d-flex justify-content-center rounded me-2 ps-3 pe-3 cursor-pointer"
              sx={{
                width: "45%",
                border: "solid 1px #7848ED",
                color: "#7848ED",
              }}
            >
              Cancel
            </Box>
            <Box
              onClick={() => {
                dispatch(acceptFriendRequest(id));
              }}
              component={"div"}
              className="p-2 d-flex justify-content-center rounded me-2 ps-3 pe-3 cursor-pointer"
              sx={{
                width: "45%",
                border: "solid 1px #7848ED",
                color: "#fff",
                backgroundColor: "#7848ED",
              }}
            >
              Accept
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}