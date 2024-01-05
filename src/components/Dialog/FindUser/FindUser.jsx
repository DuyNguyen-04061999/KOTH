import { Box, ClickAwayListener, TextField } from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _socket from "../../../redux-saga-middleware/config/socket";
import { showToastNotification } from "../../../redux-saga-middleware/reducers/alertReducer";
import {
  findPeople,
  findPeopleSuccess,
} from "../../../redux-saga-middleware/reducers/appReducer";
import { images } from "../../../utils/images";
import ConfirmSendRequest from "./ConfirmSendRequest";
import {
  callListSendingRequest,
  cancelRequestingFriend,
} from "../../../redux-saga-middleware/reducers/addFriendReducer";
import LoadingPopup from "./LoadingPopup";

export default function FindUser(props) {
  const { onCancel } = props;
  const [searchValue, setSearchValue] = useState("");
  const [socket, setSocket] = useState("");
  const [userSelected, setUserSelected] = useState("");
  const [username, setUserName] = useState("");
  const [openConfirm, setOpenCofirm] = useState(false);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);

  const dispatch = useDispatch();
  const { listFindPeople } = useSelector((state) => state.appReducer);
  const { friendList } = useSelector((state) => state.chatReducer);
  const { listSendingRequest, cancelRequestReady } = useSelector(
    (state) => state.addFriendReducer
  );
  const handleConfirm = () => {
    if (searchValue) {
      dispatch(findPeople(searchValue));
    }
  };
  useEffect(() => {
    dispatch(callListSendingRequest());
  }, [dispatch]);
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
  }, [socket, dispatch, handleCancel]);
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
                  key={i_p}
                  className="d-flex mt-3 p-2"
                  sx={{
                    borderRadius: "5px",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      component={"img"}
                      sx={{
                        width: 32,
                        height: 32,
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
                        fontSize: "14px",
                      }}
                    >
                      {people?.userNickName?.length > 11
                        ? people?.userNickName?.slice(0, 11) + " ..."
                        : people?.userNickName}
                    </Box>
                  </Box>
                  <button
                    onClick={() => {
                      if (
                        !friendList
                          ?.map((item) => {
                            return item.id;
                          })
                          .includes(people?.id) &&
                        !listSendingRequest
                          ?.map((item) => {
                            return item.id;
                          })
                          .includes(people?.id)
                      ) {
                        setUserName(people?.userName);
                        setOpenCofirm(true);
                      } else if (
                        listSendingRequest
                          ?.map((item) => {
                            return item.id;
                          })
                          .includes(people?.id)
                      ) {
                        dispatch(cancelRequestingFriend(people?.userName));
                      }
                    }}
                    style={{
                      backgroundColor: "#271C39",
                      color: "#7C81F2",
                      borderRadius: "4px",
                      padding: "6px",
                      border: "none",
                      outline: "none",
                      fontSize: "12px",
                    }}
                  >
                    {friendList &&
                    friendList
                      ?.map((item) => {
                        return item.id;
                      })
                      .includes(people?.id)
                      ? "View profile"
                      : listSendingRequest &&
                        listSendingRequest
                          ?.map((item) => {
                            return item.id;
                          })
                          .includes(people?.id)
                      ? "Cancel request"
                      : "Add friend"}
                  </button>
                </Box>
              ))}
            </Box>
          ) : searchValue ? (
            <Box className="text-white text-center">Not Data Yet!</Box>
          ) : (
            <></>
          )}
          {listFindPeople && listFindPeople?.length === 0 && (
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
            </Box>
          )}
        </Box>{" "}
        <ConfirmSendRequest
          username={username}
          open={openConfirm}
          onClose={() => {
            setOpenCofirm(false);
          }}
        />
        {cancelRequestReady && <LoadingPopup />}
      </Box>
    </ClickAwayListener>
  );
}
