import React from "react";
import AddFriendComponent from "./AddFriendComponent";
import PromotionNotification from "./PromotionNotification";
import SubPackExpired from "./SubPackExpired";
import WinPromotion from "./WinPromotion";

export default function NotificationItem(props) {
  const {
    content,
    id,
    // otherId,
    promotionId,
    // read,
    status,
    type,
    // userId,
    otherAvatar,
    createdAt,
    title,
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
    case 2:
    case 3:
    case 5:
    case 8: {
      if (content) {
        return (
          <PromotionNotification
            content={content}
            promotionId={promotionId}
            createdAt={createdAt}
            type={type}
            id={id}
            title={title}
          />
        );
      } else return <></>;
    }
    case 4:
    case 6:
    case 7:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13: {
      if (content) {
        return (
          <WinPromotion
            content={content}
            promotionId={promotionId}
            createdAt={createdAt}
            type={type}
            id={id}
            title={title}
          />
        );
      } else return <></>;
    }
    case 14: {
      if (content) {
        return (
          <SubPackExpired
            content={content}
            promotionId={promotionId}
            createdAt={createdAt}
            type={type}
            id={id}
            title={title}
          />
        );
      } else return <></>;
    }
    default: {
      if (content) {
        return (
          <SubPackExpired
            content={content}
            promotionId={promotionId}
            createdAt={createdAt}
            type={type}
            id={id}
            title={title}
          />
        );
      } else return <></>;
    }
  }
}
