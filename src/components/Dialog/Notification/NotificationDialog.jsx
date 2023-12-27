import { Box, Dialog } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeNotificationDialog } from "../../../redux-saga-middleware/reducers/dialogReducer";
import { getListNotification } from "../../../redux-saga-middleware/reducers/notificationReducer";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import NotificationItem from "./NotificationItem";

export default function NotificationDialog() {
  const { isNotificationDialog } = useSelector((state) => state.dialogReducer);
  const { listNotifiaction } = useSelector(
    (state) => state.notificationReducer
  );
  console.log(listNotifiaction);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeNotificationDialog());
  };

  useEffect(() => {
    dispatch(getListNotification());
  }, [dispatch]);

  const { width, height } = useWindowDimensions();

  return (
    <Dialog
      fullScreen={width < 576}
      open={isNotificationDialog}
      onClose={handleClose}
      sx={{
        padding: 0,
      }}
      PaperProps={{
        sx:
          width > 576
            ? {
                width: "300px",
                padding: 0,
                margin: 0,
                marginLeft: "auto !important",
                marginTop: "55px",
                borderRadius: 0,
                height: height,
                background: "#443565",
              }
            : {
                background: "#443565",
              },
      }}
      hideBackdrop={true}
    >
      <Box
        component={"div"}
        className="p-2 text-white"
        sx={{
          backgroundColor: "#42285B",
        }}
      >
        Notifications
      </Box>
      <Box className="p-2">
        {listNotifiaction && listNotifiaction?.length > 0 ? (
          listNotifiaction?.map((noti, index) => {
            return (
              <NotificationItem
                key={index}
                content={noti?.notificationContent}
                type={noti?.notificationType}
                status={noti?.notificationStatus}
                read={noti?.notificationRead}
                userId={noti?.userId}
                otherId={noti?.otherId}
                promotionId={noti?.promotionId}
                id={noti?.id}
                otherAvatar={noti?.nOther?.userAccount?.accountAvatar}
              />
            );
          })
        ) : (
          <Box className="p-2">No Data Yet!</Box>
        )}
      </Box>
    </Dialog>
  );
}
