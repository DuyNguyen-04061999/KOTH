import { Box } from "@mui/material";
import "./index.scss";
import styled from "styled-components";
import { Search } from "@mui/icons-material";
import { images } from "../../../utils/images";
import ChatGlobal from "../ChatGlobal";
import { useEffect, useState } from "react";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { updateContacterUsername } from "../../../redux-saga-middleware/reducers/chatReducer";

const Test = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 100% !important;
  height: 100%;
  background: #170f1e !important;
  padding: 5px !important;
  color: #fff !important;
  font-weight: bold !important;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #3f3970;
  }
`;

export default function ChatFriendList() {
  const [openMess, setOpenMess] = useState(false);
  const { width, height } = useWindowDimensions();
  const [searchFeild, setSearchFeild] = useState("");
  const { friendList } = useSelector((state) => state.chatReducer);
  const { token } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const handleChangeSearchChat = (e) => {
    setSearchFeild(e.target.value);
  };

  const [listFriend, setListFriend] = useState([]);

  useEffect(() => {
    setListFriend(friendList);
  }, [friendList]);

  useEffect(() => {
    const list = friendList.map((item) => {
      if (item?.userName.includes(searchFeild)) {
        return item;
      }
      return false;
    });

    setListFriend(list);
  }, [searchFeild, friendList]);

  const handleSubmitSearchChat = (e) => {
    e.preventDefault();
  };
  useEffect(() => {}, [token]);

  const renderListFriend1 = () => {
    return (
      <>
        {friendList && friendList?.length > 0 ? (
          friendList.map((e, index) => {
            return (
              <Box
                key={index}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                className=" pe-2"
                onClick={() => {
                  if (width < 576) {
                    setOpenMess(true);
                  } else {
                  }
                }}
              >
                <Box>
                  <img
                    src={
                      e.userAccount.accountAvatar &&
                      e?.userAccount?.accountAvatar
                        ? process.env.REACT_APP_SOCKET_SERVER +
                          "/" +
                          e?.userAccount?.accountAvatar
                        : images.undefinedAvatar
                    }
                    alt="..."
                    width={45}
                    height={45}
                    style={{ borderRadius: "50%", backgroundColor: "#1a151e" }}
                    className="m-2"
                  />
                </Box>
                <Box>
                  <Box>
                    <h6
                      style={{
                        color: "#535f92",
                        marginBottom: "0px !important",
                        fontSize: "12px",
                        fontWeight: "bolder",
                      }}
                    >
                      {e.userName}
                    </h6>
                  </Box>
                </Box>
              </Box>
            );
          })
        ) : (
          <span className="ps-3" style={{ color: "#535f92" }}></span>
        )}
      </>
    );
  };
  const renderListFriend = listFriend?.map((e, index) => {
    return (
      <Box key={index}>
        {e?.id && (
          <Box
            display={"flex"}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
            sx={{
              marginBottom: "10px",
            }}
            onClick={() => {
              dispatch(updateContacterUsername(e?.userName, e?.id));
              if (width < 576) {
                setOpenMess(true);
              } else {
                setOpenMess(true);
              }
            }}
          >
            <Box display={"flex"} alignItems={"center"}>
              <img
                src={
                  e?.userAccount && e?.userAccount?.accountAvatar
                    ? process.env.REACT_APP_SOCKET_SERVER +
                      "/" +
                      e?.userAccount?.accountAvatar
                    : images.undefinedAvatar
                }
                alt="..."
                width={45}
                height={45}
                style={{ borderRadius: "50%" }}
                className="ms-2 me-2"
              />
              <Box display={"flex"} flexDirection={"column"}>
                <h5 style={{ color: "#535f92", fontWeight: "bolder" }}>
                  {e?.userName}
                </h5>
                <span style={{ color: "#9b9acf", fontWeight: "bold" }}>
                  {e?.receiveMessages?.map((e_m) => e_m?.messageContent)}
                </span>
              </Box>
            </Box>
            <Box>
              <span
                className="ms-2"
                style={{ color: "#535f92", fontWeight: "500" }}
              >
                {moment(e?.createdAt).format("HH:mm")}
              </span>
            </Box>
          </Box>
        )}
      </Box>
    );
  });

  const checkHeightResponsive = () => {
    if (width < 576) {
      return height - 119;
    } else if (width > 1200) {
      return height - 130;
    } else if (width > 576 && width < 1199) {
      return height - 300;
    }
    return height;
  };

  return (
    <Box
      position="relative"
      sx={{
        height: checkHeightResponsive(),
        backgroundColor: "#2e233d",
      }}
    >
      <Box sx={{ padding: "10px" }}>
        <Box
          component={"form"}
          position={"relative"}
          onSubmit={handleSubmitSearchChat}
          className="ps-3 pe-3"
        >
          <Test
            type="text"
            value={searchFeild}
            id="sendmessages"
            style={{
              border: "0px solid #3f3970",
              borderRadius: "4px",
            }}
            onChange={handleChangeSearchChat}
            placeholder="Search"
          />
          <Search
            sx={{
              position: "absolute",
              top: "4px",
              right: "20px",
              color: "#8280f0",
            }}
          />
        </Box>
      </Box>
      <Box className="ps-3 pe-3">
        <div
          className="slider"
          style={{
            paddingLeft: width > 576 ? 0 : 0,
          }}
        >
          <div className="scrolling-carousel-example1-container">
            <ScrollingCarousel>{renderListFriend1()}</ScrollingCarousel>
          </div>
        </div>
      </Box>
      <Box
        className="chat-content p-3"
        sx={{
          overflow: "auto !important",
          scrollbarWidth: "thin",
          backgroundColor: "#2e233d",
          "&::-webkit-scrollbar": {
            width: "0rem",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
        id="style-1"
      >
        {renderListFriend}
      </Box>
      {openMess && (
        <ChatGlobal
          handleShow={() => {
            setOpenMess(false);
          }}
        />
      )}
    </Box>
  );
}
