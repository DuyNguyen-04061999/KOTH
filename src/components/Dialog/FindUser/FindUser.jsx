import { Box, ClickAwayListener, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _socket from "../../../redux-saga-middleware/config/socket";
import { showToastNotification } from "../../../redux-saga-middleware/reducers/alertReducer";
import {
  findPeople,
  findPeopleSuccess,
} from "../../../redux-saga-middleware/reducers/appReducer";
import { images } from "../../../utils/images";

export default function FindUser(props) {
  const { onCancel } = props;
  const [searchValue, setSearchValue] = useState("");
  const [socket, setSocket] = useState("");
  const [userSelected, setUserSelected] = useState("");
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);
  const dispatch = useDispatch();
  const { listFindPeople } = useSelector((state) => state.appReducer);

  const handleConfirm = () => {
    if (searchValue) {
      dispatch(findPeople(searchValue));
    }
  };

  const handleCancel = () => {
    onCancel();
    setUserSelected("");
    setSearchValue("");
    dispatch(findPeopleSuccess([]));
  };

  const handleChangeSearch = (e) => {
    dispatch(findPeopleSuccess([]));

    setSearchValue(e.target.value);
  };

  const handleAddFriend = () => {
    if (userSelected) {
      socket.emit("addFriend", {
        username: userSelected,
      });
    }
  };

  useEffect(() => {
    if (socket) {
      socket?.on("addFriendRequestSuccess", (data) => {
        handleCancel();
        dispatch(
          showToastNotification({
            type: "success",
            message: "Send request successfully!",
          })
        );
      });
    }
    return () => {};
  }, [socket, dispatch]);

  return (
    <ClickAwayListener onClickAway={handleCancel}>
      <Box
        component={"div"}
        className="position-absolute p-3"
        sx={{
          zIndex: 1,
          width: "100%",
        }}
      >
        <Box
          sx={{
            background: "#181223",
          }}
          className="p-2 rounded"
        >
          <Box className="text-center text-white">Search People</Box>
          <Box className="mt-2 mb-2">
            <TextField
              placeholder="Enter nickname or ID"
              value={searchValue}
              onChange={handleChangeSearch}
              sx={{
                width: "100%",
                background: "#271C39",
                color: "#fff",
                input: {
                  color: "#fff",
                  "&::placeholder": {
                    color: "#979797",
                    fontWeight: "600",
                  },
                },
              }}
            />
          </Box>
          {listFindPeople && listFindPeople?.length > 0 ? (
            <Box
              sx={{
                maxHeight: "200px",
                overflow: "auto",
              }}
              className="cursor-pointer"
            >
              {listFindPeople?.map((people, i_p) => (
                <Box
                  onClick={() => {
                    setUserSelected(people?.userName);
                  }}
                  key={i_p}
                  className="d-flex mt-3 p-2"
                  sx={{
                    background:
                      userSelected === people?.userName ? "#7648ED" : "#181223",
                  }}
                >
                  <Box
                    component={"img"}
                    sx={{
                      width: 35,
                      height: 35,
                    }}
                    className="rounded-circle"
                    src={
                      people?.userAccount?.accountAvatar
                        ? process.env.REACT_APP_SOCKET_SERVER +
                          "/" +
                          people?.userAccount?.accountAvatar
                        : images.undefinedAvatar
                    }
                  ></Box>
                  <Box
                    className="text-white ms-2"
                    sx={{
                      fontSize: "20px",
                    }}
                  >
                    {people?.userNickName}
                  </Box>
                </Box>
              ))}
            </Box>
          ) : searchValue ? (
            <Box className="text-white text-center">Not Data Yet!</Box>
          ) : (
            <></>
          )}
          <Box className="d-flex justify-content-between mt-4">
            <Box
              onClick={handleCancel}
              sx={{
                width: "45%",
                border: "solid 1px #7848ED",
                color: "#7848ED",
              }}
              className="p-2 rounded text-center cursor-pointer"
            >
              Cancel
            </Box>
            {listFindPeople && listFindPeople?.length > 0 ? (
              <Box
                onClick={handleAddFriend}
                sx={{
                  width: "45%",
                  color: "#fff",
                  background: userSelected ? "#7848ED" : "#979797",
                }}
                className="p-2 rounded text-center cursor-pointer"
              >
                {"Add Friend"}
              </Box>
            ) : (
              <Box
                onClick={handleConfirm}
                sx={{
                  width: "45%",
                  color: "#fff",
                  background: searchValue ? "#7848ED" : "#979797",
                }}
                className="p-2 rounded text-center cursor-pointer"
              >
                {"Confirm"}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </ClickAwayListener>
  );
}
