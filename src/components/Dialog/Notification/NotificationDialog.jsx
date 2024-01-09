import { Box, Dialog, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeNotificationDialog } from "../../../redux-saga-middleware/reducers/dialogReducer";
import { getListNotification } from "../../../redux-saga-middleware/reducers/notificationReducer";
import { images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import NotificationItem from "./NotificationItem";

export default function NotificationDialog() {
  const { tokenUser } = useSelector((state) => state.userReducer);
  const { device } = useSelector((state) => state.deviceReducer);
  const { isNotificationDialog } = useSelector((state) => state.dialogReducer);
  const { listNotifiaction } = useSelector(
    (state) => state.notificationReducer
  );

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeNotificationDialog());
  };

  useEffect(() => {
    if (tokenUser) {
      dispatch(getListNotification());
    }
  }, [dispatch, tokenUser]);
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
                width: "320px",
                padding: 0,
                margin: 0,
                marginLeft: "auto !important",
                marginTop: device === "Tablet" ? "45px" : "55px",
                borderRadius: 0,
                height: height,
                background: "#2E233D",
                overflow: "auto",
              }
            : {
                background: "#2E233D",
                overflow: "auto",
              },
      }}
      hideBackdrop={true}
      disableScrollLock
    >
      <Box
        component={"div"}
        className="p-2 text-white"
        sx={{
          backgroundColor: "#42285B",
          display: "flex",
          alignItems: "center",
        }}
      >
        {width < 576 && (
          <Box
            onClick={handleClose}
            sx={{ width: "20px", height: "20px" }}
            component={"img"}
            src={images.BackButtonLobby}
          ></Box>
        )}
        <Typography> Notifications</Typography>
      </Box>
      <Box className="p-2 ps-3 pe-3">
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
                createdAt={noti?.createdAt}
                title={noti?.notificationTitle}
              />
            );
          })
        ) : (
          <Box className="p-2 text-white">User not found!</Box>
        )}
      </Box>
    </Dialog>
  );
}
