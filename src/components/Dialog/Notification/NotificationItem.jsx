import { Box } from "@mui/material";
import moment from "moment";
import React from "react";

import AddFriendComponent from "./AddFriendComponent";
import NewMessage from "./NewMessage";
import PromotionNotification from "./PromotionNotification";

export default function NotificationItem(props) {
  const {
    content,
    id,
    // otherId,
    promotionId,
    read,
    status,
    type,
    // userId,
    otherAvatar,
    createdAt,
  } = props;
  switch (type) {
    case 1: {
      if (content) {
        return (
          <AddFriendComponent
            content={content}
            id={id}
            status={status}
            otherAvatar={otherAvatar}
            createdAt={createdAt}
          />
        );
      } else return <></>;
    }
    // case 2: {
    //   if (content) {
    //     return (
    //       <NewMessage
    //         content={content}
    //         id={id}
    //         status={status}
    //         otherAvatar={otherAvatar}
    //         createdAt={createdAt}
    //         read={read}
    //       />
    //     );
    //   } else return <></>;
    // }
    case 3: {
      if (content) {
        return (
          <PromotionNotification
            content={content}
            promotionId={promotionId}
            createdAt={createdAt}
          />
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
