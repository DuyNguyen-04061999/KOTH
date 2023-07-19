import { Box, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { images } from "../../../../utils/images";
import { useDispatch, useSelector } from "react-redux";
import { closeInvitefriendPopup } from "../../../../redux-saga-middleware/reducers/gameReducer";
import _socket from "../../../../redux-saga-middleware/config/socket";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import { getFontSizeDependOnWidth } from "../../../../utils/config";
import { showAlert } from "../../../../redux-saga-middleware/reducers/alertReducer";

export default function PopupInviteFriend({ roomIdSelect }) {
  const { inviteFriendDialog, detailGame } = useSelector(
    (state) => state.gameReducer
  );
  const { friendList } = useSelector((state) => state.chatReducer);
  const [userIds, setUserIds] = useState([]);
  const [socket, setSocket] = useState(null);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const numberInRoom=2;//Maximum number in rooms
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
        if([...userIds, id].length<=numberInRoom-1)
        {
          setUserIds([...userIds, id]);
        }
        else{
          dispatch(showAlert("error","The numbers of member in room must be smaller than 2"))
        }
      } 
      else if(userIds?.includes(id)) 
      {
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
      fullScreen={width < 576 && true}
      onClose={() => dispatch(closeInvitefriendPopup())}
      sx={{ zIndex: width < 576 ? "100000" : "none" }}
    >
      <Box
        sx={{
          width: width < 576 ? "100%" : "400px",
          height: width < 576 ? "100%" : "none",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#3c2c64",
          position: "relative",
        }}
      >
        {width > 576 ? (
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
        ) : (
          <Box
            sx={{
              width: "100%",
              padding: "15px 20px",
              height: "auto",
              backgroundColor: "#513c82",
              color: "white",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{ width: "20px", height: "20px", cursor: "pointer" }}
              src={images.BackButtonLobby}
              onClick={() => dispatch(closeInvitefriendPopup())}
              component={"img"}
            ></Box>
            <Typography>Invite friends</Typography>
          </Box>
        )}

        <Box
          sx={{
            padding: "20px",
            backgroundColor: "#3c2c64",
            display: "flex",
            alignItems: "flex-start",
            flexWrap: "wrap",
            maxHeight: width < 576 ? "82%" : "600px",
            overflowY: "auto",
          }}
        >
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
                  sx={{
                    width: width < 576 ? parseFloat(width / 11) : "50px",
                    height: width < 576 ? parseFloat(width / 11) : "50px",
                    borderRadius: "50%",
                  }}
                  component={"img"}
                  src={
                    e?.userAccount && e?.userAccount?.accountAvatar
                      ? process.env.REACT_APP_SOCKET_SERVER +
                        "/" +
                        e?.userAccount?.accountAvatar
                      : images.undefinedAvatar
                  }
                ></Box>
                <Box
                  sx={{
                    fontSize: getFontSizeDependOnWidth(width),
                    textAlign: "start",
                    width: "50%",
                    paddingLeft: "4px",
                  }}
                >
                  {e?.userName && e?.userName?.length > 12
                    ? e?.userName.slice(0, 11) + "..."
                    : e?.userName}
                </Box>
                <Box
                  onClick={() => handleOnClickCheck(e?.id)}
                  sx={{
                    width: width < 576 ? parseFloat(width / 20) : "25px",
                    height: width < 576 ? parseFloat(width / 20) : "25px",
                    cursor: "pointer",
                  }}
                  component={"img"}
                  src={
                    userIds &&
                    userIds?.includes(e?.id) === true &&
                    userIds.length > 0
                      ? images.CheckedMobile
                      : images.UnCheckMobile
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
            backgroundColor: "#3c2c64",
            position: width < 576 ? "fixed" : "none",
            bottom: "0px",
          }}
        >
          <button
            onClick={() => {
              socket?.emit("inviteGameInRoom", {
                type: "friend",
                gameId: detailGame?.id,
                roomId: roomIdSelect,
                userIds: userIds,
              });
              dispatch(closeInvitefriendPopup());
            }}
            style={{
              backgroundImage: "linear-gradient(#8c39f0,#7449ee)",
              color: "white",
              fontWeight: "bolder",
              padding: "10px 40px",
              cursor: "pointer",
              outline: "none",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Invite
          </button>
        </Box>
      </Box>
    </Dialog>
  );
}
