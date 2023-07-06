import { Badge } from "@mui/material";
import { useEffect, useState } from "react";
import { popup } from "../../../utils/images";
import "./index.scss";
import MenuChat from "../../MenuMobile/Chat";
import MenuBrowser from "../../MenuMobile/Browser";
import MenuSearch from "../../MenuMobile/Search";
import { useNavigate } from "react-router-dom";
import { toggleWalletDialog } from "../../../redux-saga-middleware/reducers/walletReducer";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoginDialog } from "../../../redux-saga-middleware/reducers/authReducer";
import { getFontSizeDependOnWidth } from "../../../utils/config";
import useWindowDimensions from "../../../utils/useWindowDimensions";

export default function NavMobile() {
  const { token, isLoginDialog } = useSelector((state) => state.authReducer);
  const [openMess, setOpenMess] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const navigate = useNavigate();
  const [hideNavMobile] = useState("block");
  const {width} = useWindowDimensions()
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  return (
    <>
      {isLoginDialog === false ? (
        <div className="mobile" style={{ display: `${hideNavMobile}` }}>
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
                    <img src={popup.brow} alt="..." />
                    <p style={{fontSize:getFontSizeDependOnWidth(width)}}>Home</p>
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
                      navigate("/game-type/favorite");
                    }}
                  >
                    <img src={popup.mygame} alt="..." />
                    <p style={{fontSize:getFontSizeDependOnWidth(width)}}>Favorite</p>
                  </div>
                </div>
                <div
                  className="items1"
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
                  <p style={{fontSize:getFontSizeDependOnWidth(width)}}>Wallet</p>
                </div>
                <div
                  className="items"
                  style={{
                    backgroundColor: "unset",
                  }}
                  onClick={() => {
                    setOpenSearch(true);
                  }}
                >
                  <div>
                    <img src={popup.search} alt="..." />
                    <p style={{fontSize:getFontSizeDependOnWidth(width)}}>Search</p>
                  </div>
                </div>
                <div
                  className="items"
                  style={{
                    backgroundColor: "unset",
                  }}
                  onClick={() => {
                    setOpenMess(true);
                  }}
                >
                  <div>
                    <Badge
                      badgeContent={99}
                      sx={{
                        ".css-106c1u2-MuiBadge-badge": {
                          fontSize: "10px",
                        },
                      }}
                    >
                      <div>
                        <img src={popup.chat} alt="..." />
                        <p style={{fontSize:getFontSizeDependOnWidth(width)}}>Chat</p>
                      </div>
                    </Badge>
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
                setOpenSearch(false);
              }}
              handleColor={() => {}}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
