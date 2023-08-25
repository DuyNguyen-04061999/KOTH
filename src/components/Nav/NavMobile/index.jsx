import { Badge } from "@mui/material";
import { useEffect, useState } from "react";
import { popup } from "../../../utils/images";
import "./index.scss";
import MenuChat from "../../MenuMobile/Chat";
import MenuBrowser from "../../MenuMobile/Browser";
import MenuSearch from "../../MenuMobile/Search";
import { useLocation, useNavigate } from "react-router-dom";
import { toggleWalletDialog } from "../../../redux-saga-middleware/reducers/walletReducer";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoginDialog } from "../../../redux-saga-middleware/reducers/authReducer";
import { getFontSizeDependOnWidth } from "../../../utils/config";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { getAppType } from "../../../utils/helper";

export default function NavMobile() {
  const { token, isLoginDialog } = useSelector((state) => state.authReducer);
  const { chatWorld } = useSelector((state) => state.chatReducer);
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
  const { pathname } = useLocation();

  return (
    <>
      {isLoginDialog === false && width <= 576 ? (
        <div className="mobile" style={{ display: `${hideNavMobile}` }}>
          {getAppType() === "promote" ? (
            <div className="content">
              {openMess === true ? (
                ""
              ) : (
                <div className="abc">
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
                        navigate("/package");
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <g
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        >
                          <path d="M3.17 7.44L12 12.55l8.77-5.08M12 21.61v-9.07"></path>
                          <path d="M9.93 2.48L4.59 5.45c-1.21.67-2.2 2.35-2.2 3.73v5.65c0 1.38.99 3.06 2.2 3.73l5.34 2.97c1.14.63 3.01.63 4.15 0l5.34-2.97c1.21-.67 2.2-2.35 2.2-3.73V9.18c0-1.38-.99-3.06-2.2-3.73l-5.34-2.97c-1.15-.64-3.01-.64-4.15 0z"></path>
                          <path d="M17 13.24V9.58L7.51 4.1"></path>
                        </g>
                      </svg>
                      <p style={{ fontSize: getFontSizeDependOnWidth(width) }}>
                        Package
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
                      {openMenu === false ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <g>
                            <path
                              stroke="#fff"
                              strokeLinecap="round"
                              strokeWidth="1.5"
                              d="M3 7h18M3 12h18M3 17h18"
                            ></path>
                          </g>
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
          ) : (
            <div className="content">
              {openMess === true ? (
                ""
              ) : (
                <div className="abc">
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
