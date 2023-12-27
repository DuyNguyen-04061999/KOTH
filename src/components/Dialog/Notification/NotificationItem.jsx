import React from "react";

export default function NotificationItem(props) {
  const {
    content,
    id,
    otherId,
    promotionId,
    read,
    status,
    type,
    userId,
    otherAvatar,
  } = props;
  console.log(otherAvatar);
  switch (type) {
    case 1:
      return <>{content}</>;
    default:
      return <></>;
  }
}
