import { Box } from "@mui/material";
import "./index.scss";
import styled from "styled-components";
// import { Search } from "@mui/icons-material";
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
  background: #261a35 !important;
  padding: 10px 20px !important;
  color: #fff !important;
  font-weight: lighter !important;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: white;
  }
`;

export default function ChatFriendList() {
  const [openMess, setOpenMess] = useState(false);
  const { width, height } = useWindowDimensions();
  const [searchFeild, setSearchFeild] = useState("");
  const { friendList, chatWorld } = useSelector((state) => state.chatReducer);
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
    const list = friendList?.filter(
      (i) =>
        i?.userName.includes(searchFeild) ||
        i?.userName.includes(searchFeild?.toLowerCase())
    );
    setListFriend(list);
  }, [searchFeild, friendList]);

  const handleSubmitSearchChat = (e) => {
    e.preventDefault();
  };
  useEffect(() => {}, [token]);
  const renderListFriend1 = () => {
    return (
      <>
        {listFriend && listFriend?.length > 0 ? (
          listFriend.map((e, index) => {
            return (
              <Box
                key={index}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                className=" pe-2"
                onClick={() => {
                  dispatch(updateContacterUsername(e?.userName, e?.id));
                  if (width < 576) {
                    setOpenMess(true);
                  } else {
                    setOpenMess(true);
                  }
                }}
              >
                <Box>
                  <img
                    src={
                      e?.userAccount?.accountAvatar &&
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
                        color: "white",
                        marginBottom: "0px !important",
                        fontSize: "12px",
                        fontWeight: "500 !important",
                        letterSpacing:"1px"
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

  useEffect(() => {
    if (chatWorld) {
    }
  }, [chatWorld, listFriend]);

  const [listFriendSort, setListFriendSort] = useState([]);

  useEffect(() => {
    const list = listFriend?.sort(function (x, y) {
      if (
        x?.receiveMessages &&
        x?.receiveMessages?.length > 0 &&
        x?.receiveMessages[0] &&
        y?.receiveMessages &&
        y?.receiveMessages?.length > 0 &&
        y?.receiveMessages[0]
      ) {
        return (
          new Date(y?.receiveMessages[0]?.createdAt).getTime() -
          new Date(x?.receiveMessages[0]?.createdAt).getTime()
        );
      } else if (
        x?._gg_koth_user_friends?.createdAt &&
        y?._gg_koth_user_friends?.createdAt
      ) {
        return (
          new Date(y?._gg_koth_user_friends?.createdAt).getTime() -
          new Date(x?._gg_koth_user_friends?.createdAt).getTime()
        );
      } else return x || y;
    });

    setListFriendSort(list);
  }, [listFriend]);

  const renderListFriend = listFriendSort?.map((e, index) => {
    return (
      <Box key={index}>
        {e?.id && (
          <Box
            display={"flex"}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
            sx={{
              marginBottom: "20px",
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
                <h5
                  style={{
                    color: "#7C81F2",
                    fontSize: "15px",
                    fontWeight: "500 !important",
                    letterSpacing:"1px"
                  }}
                >
                  {e?.userName}
                </h5>
                <span
                  style={{
                    color: "white",
                    fontWeight: "500 !important",
                    letterSpacing:"1px"
                  }}
                >
                  {e?.receiveMessages?.map((e_m, i_e_m) => (
                    <span key={i_e_m}>{e_m?.messageContent?.slice(0, 15)}</span>
                  ))}
                </span>
              </Box>
            </Box>
            <Box>
              <p
                className="ms-2"
                style={{
                  color: "white",
                  fontWeight: "500",
                  fontSize: "11px",
                }}
              >
                {e?.receiveMessages?.length > 0 ? (
                  e?.receiveMessages?.map((e_m, i_e_m) => (
                    <span key={i_e_m}>
                      {moment(e_m?.updatedAt).format("HH:mm")}
                    </span>
                  ))
                ) : (
                  <span>
                    {moment(e?._gg_koth_user_friends?.createdAt).format(
                      "HH:mm"
                    )}
                  </span>
                )}
              </p>
            </Box>
          </Box>
        )}
      </Box>
    );
  });

  const checkHeightResponsive = () => {
    if (width < 576) {
      return height - 50;
    } else if (width > 1200) {
      return height - 107;
    } else if (width > 576 && width < 1199) {
      return height - 105;
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
      <Box>
        <Box
          component={"form"}
          position={"relative"}
          onSubmit={handleSubmitSearchChat}
          className="p-3"
        >
          <Test
            type="text"
            value={searchFeild}
            id="sendmessages"
            style={{
              border: "0px solid #3f3970",
              borderRadius: "4px",
              fontWeight: "lighter !important",
              fontSize: "14px"
            }}
            onChange={handleChangeSearchChat}
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 18 18"
            onClick={handleSubmitSearchChat}
            style={{
              position: "absolute",
              top: "26px",
              right: "31px",
            }}
          >
            <g>
              <g
                fillRule="evenodd"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                clipRule="evenodd"
              >
                <path d="M8.396 1.262a7.134 7.134 0 110 14.268 7.134 7.134 0 010-14.268z"></path>
                <path d="M15.582 14.406a1.176 1.176 0 110 2.352 1.176 1.176 0 010-2.352z"></path>
              </g>
            </g>
          </svg>
          {/* <Search
            onClick={handleSubmitSearchChat}
            sx={{
              position: "absolute",
              top: "20px",
              right: "20px",
              color: "#8280f0",
            }}
          /> */}
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
          openMess={openMess}
        />
      )}
    </Box>
  );
}
