import { Box, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { images } from "../../../../utils/images";
import { useDispatch, useSelector } from "react-redux";
import { closeInvitefriendPopup } from "../../../../redux-saga-middleware/reducers/gameReducer";
import _socket from "../../../../redux-saga-middleware/config/socket";

export default function PopupInviteFriend({ roomIdSelect }) {
  const { inviteFriendDialog, detailGame } = useSelector(
    (state) => state.gameReducer
  );
  const { friendList } = useSelector((state) => state.chatReducer);
  const [userIds, setUserIds] = useState([]);
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);
  useEffect(() => {
    socket?.on(`inviteGameInRoom${roomIdSelect}Success`, (data) => {
      
    });
  }, [socket, roomIdSelect]);
  const handleOnClickCheck = (id) => {
    if (!userIds?.includes(id)) {
      setUserIds([...userIds, id]);
    } else {
      setUserIds(
        userIds.filter((n) => {
          return n !== id;
        })
      );
    }
  };
  
  return (
    <Dialog
      open={inviteFriendDialog}
      onClose={() => dispatch(closeInvitefriendPopup())}
    >
      <Box
        sx={{
          width: "400px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#3c2c64",
        }}
      >
        <Box
          sx={{
            width: "100%",
            padding: "15px 20px",
            height: "auto",
            backgroundColor: "#513c82",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography>Invite friends</Typography>
          <Box
            sx={{ width: "20px", height: "20px", cursor: "pointer" }}
            src={images.closeButtonInvite}
            onClick={() => dispatch(closeInvitefriendPopup())}
            component={"img"}
          ></Box>
        </Box>
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "#3c2c64",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {/* Loop */}
          {friendList?.map((e, i_) => {
            return (
              <Box
                key={i_}
                sx={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "#7c81f3",
                  padding: "10px 20px",
                }}
              >
                <Box
                  sx={{ width: "50px", height: "50px", borderRadius: "50%" }}
                  component={"img"}
                  src={
                    e?.userAccount && e?.userAccount?.accountAvatar
                      ? process.env.REACT_APP_SOCKET_SERVER +
                        "/" +
                        e?.userAccount?.accountAvatar
                      : images.undefinedAvatar
                  }
                ></Box>
                <Box>{e?.userName}</Box>
                <Box
                  onClick={() => handleOnClickCheck(e?.id)}
                  sx={{ width: "25px", height: "25px", cursor: "pointer" }}
                  component={"img"}
                  src={
                    userIds &&
                    userIds?.includes(e?.id) === true &&
                    userIds.length > 0
                      ? images.Checked
                      : images.UnCheck
                  }
                ></Box>
              </Box>
            );
          })}
        </Box>
        <Box
          sx={{
            width: "100%",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => {
              socket?.emit("inviteGameInRoom", {
                type: "friend",
                gameId: detailGame?.id,
                roomId: roomIdSelect,
                userIds: userIds,
              });
            }}
            sx={{
              backgroundImage: "linear-gradient(#8c39f0,#7449ee)",
              color: "white",
              fontWeight: "bolder",
              padding: "10px 40px",
              cursor: "pointer",
            }}
          >
            Invite
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
