import { Badge } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toggleLoginDialog } from "../../../redux-saga-middleware/reducers/authReducer";
import { showBadgeChat } from "../../../redux-saga-middleware/reducers/chatReducer";
import { toggleWalletDialog } from "../../../redux-saga-middleware/reducers/walletReducer";
import { getFontSizeDependOnWidth } from "../../../utils/config";
import { getAppType } from "../../../utils/helper";
import { popup } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import MenuBrowser from "../../MenuMobile/Browser";
import MenuChat from "../../MenuMobile/Chat";
import MenuSearch from "../../MenuMobile/Search";
import "./index.scss";

export default function NavMobile() {
  const { token } = useSelector((state) => state.authReducer);
  const { chatWorld, badgechat } = useSelector((state) => state.chatReducer);

  // const { device } = useSelector((state) => state.deviceReducer);
  const { startGameCheck } = useSelector((state) => state.appReducer);
  const { isProfileDialog } = useSelector((state) => state.profileReducer);
  const [openMess, setOpenMess] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const navigate = useNavigate();
  const [hideNavMobile, setHideNavMobile] = useState("block");
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isProfileDialog === true) {
      setHideNavMobile("none");
    } else if (isProfileDialog === false) {
      setHideNavMobile("block");
    }
  }, [isProfileDialog]);

  // useEffect(() => {
  //   dispatch(setBadgeChat(false));
  // }, [chatWorld]);

  const { pathname } = useLocation();

  return (
    <>
      {!startGameCheck && width < 576 ? (
        <div className="mobile" style={{ display: `${hideNavMobile}` }}>
          {getAppType() === "promote" ? (
            <div className="content_nav">
              {openMess === true ? (
                ""
              ) : (
                <div className="nav-mobile">
                  <div
                    className="items"
                    style={{
                      backgroundColor: "unset",
                    }}
                    onClick={() => {
                      navigate("/home");
                      // setOpenMenu(true);
                      setOpenSearch(false);
                    }}
                  >
                    <div>
                      {pathname &&
                      (pathname === "/home" ||
                        pathname === "/new-home" ||
                        pathname === "/") ? (
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.0402 6.82165L14.2802 2.79165C12.7102 1.69165 10.3002 1.75165 8.79023 2.92165L3.78023 6.83165C2.78023 7.61165 1.99023 9.21165 1.99023 10.4716V17.3716C1.99023 19.9216 4.06023 22.0016 6.61023 22.0016H17.3902C19.9402 22.0016 22.0102 19.9316 22.0102 17.3816V10.6016C22.0102 9.25165 21.1402 7.59165 20.0402 6.82165ZM12.7502 18.0016C12.7502 18.4116 12.4102 18.7516 12.0002 18.7516C11.5902 18.7516 11.2502 18.4116 11.2502 18.0016V15.0016C11.2502 14.5916 11.5902 14.2516 12.0002 14.2516C12.4102 14.2516 12.7502 14.5916 12.7502 15.0016V18.0016Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 17.9902V14.9902M9.02 2.84016L3.63 7.04016C2.73 7.74016 2 9.23016 2 10.3602V17.7702C2 20.0902 3.89 21.9902 6.21 21.9902H17.79C20.11 21.9902 22 20.0902 22 17.7802V10.5002C22 9.29016 21.19 7.74016 20.2 7.05016L14.02 2.72016C12.62 1.74016 10.37 1.79016 9.02 2.84016Z"
                            stroke="white"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}

                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 400,
                          color: "white",
                          marginTop: "4px",
                        }}
                      >
                        Home
                      </p>
                    </div>
                  </div>
                  <div
                    className="items"
                    style={{
                      backgroundColor: "unset",
                    }}
                  >
                    <div
                      onClick={() => {
                        navigate("/packages");
                      }}
                    >
                      {pathname && pathname === "/packages" ? (
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.2085 7.82141L12.5085 12.2814C12.1985 12.4614 11.8085 12.4614 11.4885 12.2814L3.78847 7.82141C3.23847 7.50141 3.09847 6.75141 3.51847 6.28141C3.80847 5.95141 4.13847 5.68141 4.48847 5.49141L9.90847 2.49141C11.0685 1.84141 12.9485 1.84141 14.1085 2.49141L19.5285 5.49141C19.8785 5.68141 20.2085 5.96141 20.4985 6.28141C20.8985 6.75141 20.7585 7.50141 20.2085 7.82141ZM11.4305 14.1394V20.9594C11.4305 21.7194 10.6605 22.2194 9.98047 21.8894C7.92047 20.8794 4.45047 18.9894 4.45047 18.9894C3.23047 18.2994 2.23047 16.5594 2.23047 15.1294V9.96941C2.23047 9.17941 3.06047 8.67941 3.74047 9.06941L10.9305 13.2394C11.2305 13.4294 11.4305 13.7694 11.4305 14.1394ZM12.5705 14.1394V20.9594C12.5705 21.7194 13.3405 22.2194 14.0205 21.8894C16.0805 20.8794 19.5505 18.9894 19.5505 18.9894C20.7705 18.2994 21.7705 16.5594 21.7705 15.1294V9.96941C21.7705 9.17941 20.9405 8.67941 20.2605 9.06941L13.0705 13.2394C12.7705 13.4294 12.5705 13.7694 12.5705 14.1394Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.16992 7.44043L11.9999 12.5504L20.7699 7.47043M11.9999 21.6104V12.5404"
                            stroke="white"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9.92965 2.48L4.58965 5.45C3.37965 6.12 2.38965 7.8 2.38965 9.18V14.83C2.38965 16.21 3.37965 17.89 4.58965 18.56L9.92965 21.53C11.0696 22.16 12.9396 22.16 14.0796 21.53L19.4196 18.56C20.6296 17.89 21.6196 16.21 21.6196 14.83V9.18C21.6196 7.8 20.6296 6.12 19.4196 5.45L14.0796 2.48C12.9296 1.84 11.0696 1.84 9.92965 2.48Z"
                            stroke="white"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.9998 13.2396V9.57961L7.50977 4.09961"
                            stroke="white"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 400,
                          color: "white",
                          marginTop: "4px",
                        }}
                      >
                        Subscription
                      </p>
                    </div>
                  </div>
                  <div
                    className="items"
                    style={{
                      backgroundColor: "unset",
                    }}
                    onClick={() => {
                      if (!token) {
                        dispatch(toggleLoginDialog());
                      } else {
                        dispatch(toggleWalletDialog());
                      }
                    }}
                  >
                    <div className="btn-wallet">
                      <div className="st-cut">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13 9H7M22 10.97V13.03C22 13.58 21.56 14.03 21 14.05H19.04C17.96 14.05 16.97 13.26 16.88 12.18C16.82 11.55 17.06 10.96 17.48 10.55C17.85 10.17 18.36 9.95 18.92 9.95H21C21.56 9.97 22 10.42 22 10.97Z"
                            stroke="white"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17.48 10.55C17.06 10.96 16.82 11.55 16.88 12.18C16.97 13.26 17.96 14.05 19.04 14.05H21V15.5C21 18.5 19 20.5 16 20.5H7C4 20.5 2 18.5 2 15.5V8.5C2 5.78 3.64 3.88 6.19 3.56C6.45 3.52 6.72 3.5 7 3.5H16C16.26 3.5 16.51 3.51 16.75 3.55C19.33 3.85 21 5.76 21 8.5V9.95H18.92C18.36 9.95 17.85 10.17 17.48 10.55Z"
                            stroke="white"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: 400,
                        color: "white",
                        marginTop: "4px",
                      }}
                    >
                      Credit
                    </p>
                  </div>
                  <div
                    className="items"
                    style={{
                      backgroundColor: "unset",
                    }}
                  >
                    <div
                      onClick={() => {
                        setOpenMess(true);
                        setOpenSearch(false);
                        setOpenMenu(false);
                        dispatch(showBadgeChat(true));
                      }}
                    >
                      <Badge
                        badgeContent={""}
                        color="error"
                        // variant="dot"
                        invisible
                      >
                        <div>
                          <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M11.7484 1C14.6214 1 17.3214 2.117 19.3494 4.146C23.5414 8.338 23.5414 15.158 19.3494 19.35C17.2944 21.406 14.5274 22.494 11.7244 22.494C10.1964 22.494 8.65844 22.171 7.21944 21.505C6.79544 21.335 6.39844 21.175 6.11344 21.175C5.78544 21.177 5.34444 21.329 4.91844 21.476C4.04444 21.776 2.95644 22.15 2.15144 21.348C1.34944 20.545 1.71944 19.46 2.01744 18.587C2.16444 18.157 2.31544 17.713 2.31544 17.377C2.31544 17.101 2.18244 16.749 1.97844 16.242C0.105437 12.197 0.971437 7.322 4.14844 4.147C6.17644 2.118 8.87544 1 11.7484 1ZM11.7494 2.5C9.27644 2.5 6.95344 3.462 5.20844 5.208C2.47444 7.94 1.73044 12.135 3.35544 15.648C3.58944 16.227 3.81544 16.791 3.81544 17.377C3.81544 17.962 3.61444 18.551 3.43744 19.071C3.29144 19.499 3.07044 20.145 3.21244 20.287C3.35144 20.431 4.00144 20.204 4.43044 20.057C4.94544 19.881 5.52944 19.679 6.10844 19.675C6.68844 19.675 7.23544 19.895 7.81444 20.128C11.3614 21.768 15.5564 21.022 18.2894 18.29C21.8954 14.682 21.8954 8.813 18.2894 5.207C16.5434 3.461 14.2214 2.5 11.7494 2.5ZM15.6963 11.1627C16.2483 11.1627 16.6963 11.6097 16.6963 12.1627C16.6963 12.7157 16.2483 13.1627 15.6963 13.1627C15.1443 13.1627 14.6923 12.7157 14.6923 12.1627C14.6923 11.6097 15.1353 11.1627 15.6873 11.1627H15.6963ZM11.6875 11.1627C12.2395 11.1627 12.6875 11.6097 12.6875 12.1627C12.6875 12.7157 12.2395 13.1627 11.6875 13.1627C11.1355 13.1627 10.6835 12.7157 10.6835 12.1627C10.6835 11.6097 11.1255 11.1627 11.6785 11.1627H11.6875ZM7.67834 11.1627C8.23034 11.1627 8.67834 11.6097 8.67834 12.1627C8.67834 12.7157 8.23034 13.1627 7.67834 13.1627C7.12634 13.1627 6.67434 12.7157 6.67434 12.1627C6.67434 11.6097 7.11734 11.1627 7.66934 11.1627H7.67834Z"
                              fill="white"
                            />
                          </svg>
                          <p
                            style={{
                              fontSize: "12px",
                              fontWeight: 400,
                              color: "white",
                              marginTop: "4px",
                            }}
                          >
                            Chat
                          </p>
                        </div>
                        <div
                          className={badgechat === false ? "bage-content" : ""}
                        ></div>
                      </Badge>
                    </div>
                  </div>
                  <div
                    className="items"
                    style={{
                      backgroundColor: "unset",
                    }}
                    onClick={() => {
                      setOpenMenu(true);
                    }}
                  >
                    <div>
                      {openMenu === false ? (
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 7H21M3 12H21M3 17H21"
                            stroke="white"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <g>
                            <path
                              fill="#fff"
                              d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81v8.37C2 19.83 4.17 22 7.81 22h8.37c3.64 0 5.81-2.17 5.81-5.81V7.81C22 4.17 19.83 2 16.19 2zM17 17.25H7c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h10c.41 0 .75.34.75.75s-.34.75-.75.75zm0-4.5H7c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h10c.41 0 .75.34.75.75s-.34.75-.75.75zm0-4.5H7c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h10c.41 0 .75.34.75.75s-.34.75-.75.75z"
                            ></path>
                          </g>
                        </svg>
                      )}
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 400,
                          color: "white",
                          marginTop: "4px",
                        }}
                      >
                        Menu
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <MenuChat
                open={openMess}
                handleShow={() => {
                  setOpenMess(false);
                }}
                handleColor={() => {}}
              />
              <MenuBrowser
                open={openMenu}
                handleShowMenu={() => {
                  setOpenMenu(false);
                }}
                handleColor={() => {}}
              />
              <MenuSearch
                open={openSearch}
                handleShowSearch={() => {
                  navigate("/home");
                  setOpenSearch(false);
                }}
                handleColor={() => {}}
              />
            </div>
          ) : (
            <div className="content_nav">
              {openMess === true ? (
                ""
              ) : (
                <div className="nav-mobile">
                  <div
                    className="items"
                    style={{
                      backgroundColor: "unset",
                    }}
                    onClick={() => {
                      setOpenMenu(true);
                      setOpenSearch(false);
                    }}
                  >
                    <div>
                      <img
                        src={
                          pathname &&
                          (pathname === "/home" || pathname === "/new-home")
                            ? popup.HomeActiveIcon
                            : popup.brow
                        }
                        alt="..."
                      />
                      <p style={{ fontSize: getFontSizeDependOnWidth(width) }}>
                        Home
                      </p>
                    </div>
                  </div>
                  <div
                    className="items"
                    style={{
                      backgroundColor: "unset",
                    }}
                  >
                    <div
                      onClick={() => {
                        navigate("/tournaments");
                      }}
                    >
                      <img
                        src={
                          pathname && pathname === "/tournaments"
                            ? popup.FavoriteActiveIcon
                            : popup.mygame
                        }
                        alt="..."
                      />
                      <p style={{ fontSize: getFontSizeDependOnWidth(width) }}>
                        Tournament
                      </p>
                    </div>
                  </div>
                  <div
                    className="items"
                    style={{
                      backgroundColor: "unset",
                    }}
                    onClick={() => {
                      if (!token) {
                        dispatch(toggleLoginDialog());
                      } else {
                        dispatch(toggleWalletDialog());
                      }
                    }}
                  >
                    <div className="btn-wallet">
                      <div className="st-cut">
                        <img src={popup.wallet} alt="..." />
                      </div>
                    </div>
                    <p style={{ fontSize: getFontSizeDependOnWidth(width) }}>
                      Credit
                    </p>
                  </div>
                  <div
                    className="items"
                    style={{
                      backgroundColor: "unset",
                    }}
                    onClick={() => {
                      setOpenMess(true);
                      setOpenSearch(false);
                      setOpenMenu(false);
                    }}
                  >
                    <div>
                      <Badge
                        badgeContent={`${chatWorld.length}`}
                        color="error"
                        sx={{
                          ".css-106c1u2-MuiBadge-badge": {
                            fontSize: "10px",
                          },
                        }}
                      >
                        <div>
                          <img src={popup.chat} alt="..." />
                          <p
                            style={{
                              fontSize: getFontSizeDependOnWidth(width),
                            }}
                          >
                            Chat
                          </p>
                        </div>
                      </Badge>
                    </div>
                  </div>
                  <div
                    className="items"
                    style={{
                      backgroundColor: "unset",
                    }}
                    onClick={() => {
                      setOpenMenu(true);
                    }}
                  >
                    <div>
                      <img
                        src={openSearch ? popup.SearchActiveIcon : popup.search}
                        alt="..."
                      />
                      <p style={{ fontSize: getFontSizeDependOnWidth(width) }}>
                        Menu
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <MenuChat
                open={openMess}
                handleShow={() => {
                  setOpenMess(false);
                }}
                handleColor={() => {}}
              />
              <MenuBrowser
                open={openMenu}
                handleShowMenu={() => {
                  setOpenMenu(false);
                }}
                handleColor={() => {}}
              />
              <MenuSearch
                open={openSearch}
                handleShowSearch={() => {
                  navigate("/home");
                  setOpenSearch(false);
                }}
                handleColor={() => {}}
              />
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}
