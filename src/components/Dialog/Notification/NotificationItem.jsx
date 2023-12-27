import { Box } from "@mui/material";
import moment from "moment";
import React from "react";
import { images } from "../../../utils/images";

export default function NotificationItem(props) {
  const {
    content,
    // id,
    // otherId,
    // promotionId,
    // read,
    // status,
    type,
    // userId,
    otherAvatar,
    createdAt,
  } = props;

  switch (type) {
    case 1: {
      if (content) {
        return (
          <Box
            component={"div"}
            className="text-white d-flex p-2"
            sx={{
              background: "#2E233D",
              borderBottom: "solid 1px #443565",
            }}
          >
            {otherAvatar ? (
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  backgroundColor: "#fff",
                  borderRadius: 50,
                }}
                className="rounded-circle"
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
                  borderRadius: 50,
                }}
                className="rounded-circle"
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
              <Box
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
            </Box>
          </Box>
        );
      } else return <></>;
    }
    default: {
      if (content) {
        return (
          <Box
            component={"div"}
            className="text-white d-flex p-2"
            sx={{
              background: "#2E233D",
              borderBottom: "solid 1px #443565",
            }}
          >
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
            </Box>
          </Box>
        );
      } else return <></>;
    }
  }
}
