import { Box, Typography } from "@mui/material";
import React from "react";
import { images } from "../../../utils/images";
import moment from "moment";

export default function NewMessage(props) {
  const { content, otherAvatar, createdAt, read } = props;
  return (
    <Box
      component={"div"}
      className="text-white d-flex"
      sx={{
        background: "#2E233D",
        padding: "16px 0px",
        borderBottom: "solid 1px #443565",
        position:"relative"
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
          fontSize: 13,
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {" "}
          {content || "Superman sent you a message"}
          {!read && (
            <Box
              sx={{
                width: "13px",
                height: "13px",
                backgroundColor: "#FF9F38",
                borderRadius: "50%",
              }}
            ></Box>
          )}
        </Box>
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
        <Typography
          sx={{
            fontSize: 14,
            color: "#FF9F38",
            textAlign: "end",
            cursor: "pointer",
          }}
        >
          Read message
        </Typography>
      </Box>
      {read === 0 ? (
        <Box sx={{
          width:10,
          height:10,
          borderRadius:"50%",
          backgroundColor:"#FF9F38",
          position:"absolute",
          top:20,
          right:15
        }}></Box>
      ) : ("")}
    </Box>
  );
}
