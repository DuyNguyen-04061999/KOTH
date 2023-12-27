import { Badge, Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateFromRouter } from "../../../redux-saga-middleware/reducers/appReducer";
import { toggleLoginDialog } from "../../../redux-saga-middleware/reducers/authReducer";
import {
  showBadgeChat,
  updateOpenMenu,
  updateOpenMess,
} from "../../../redux-saga-middleware/reducers/chatReducer";
import { openNotificationDialog } from "../../../redux-saga-middleware/reducers/dialogReducer";
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
  const { tokenUser: token } = useSelector((state) => state.userReducer);
  const { chatWorld, badgechat, openMess, openMenu } = useSelector(
    (state) => state.chatReducer
  );
  const { t } = useTranslation("global");

  // const { device } = useSelector((state) => state.deviceReducer);
  const { startGameCheck } = useSelector((state) => state.appReducer);
  const { isProfileDialog } = useSelector((state) => state.profileReducer);
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

  const location = useLocation();

  const { pathname } = useLocation();

  const theme = useTheme();

  const { listNotifiaction } = useSelector(
    (state) => state.notificationReducer
  );
  const checkNotificationRead = () => {
    let check = false;
    for (let index = 0; index < listNotifiaction.length; index++) {
      const element = listNotifiaction[index];
      if (!element?.notificationRead) {
        check = true;
      }
    }
    return check;
  };
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
                        <>
                          {theme?.theme === "christmas" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <g filter="url(#filter0_d_7474_481425)">
                                <g>
                                  <g>
                                    <path
                                      fill="#E74B4A"
                                      d="M21.674 15.005l-6.677-6.677-6.677 6.677v9h13.354v-9z"
                                    ></path>
                                    <path
                                      fill="#C71818"
                                      d="M14.609 12.674a.58.58 0 00.678-.572v-.58a.583.583 0 00.767.55.605.605 0 00.395-.587.348.348 0 01.48-.32c.042.017.08.043.112.076l4.633 4.635v-.871l-6.677-6.677-6.677 6.677v9h13.354v-.872H17.9a8.709 8.709 0 01-8.631-7.558 1.168 1.168 0 01.332-.98l3.933-3.933a.346.346 0 01.592.242v1.162a.606.606 0 00.483.606v.002z"
                                    ></path>
                                    <path
                                      fill="#E74B4A"
                                      d="M18.773 7.164h2.903v5.516l-2.903-2.903V7.164z"
                                    ></path>
                                    <path
                                      fill="#C71818"
                                      d="M18.773 7.164h2.903v.58h-2.903v-.58z"
                                    ></path>
                                    <path
                                      fill="#C71818"
                                      d="M21.676 11.801v.871L18.773 9.77V8.9l2.903 2.902z"
                                    ></path>
                                    <path
                                      fill="#D37F6A"
                                      d="M20.516 21.672h1.16v2.322h-1.16v-2.322z"
                                    ></path>
                                    <path
                                      fill="#C67869"
                                      d="M20.516 21.672h1.16v.58h-1.16v-.58z"
                                    ></path>
                                    <path
                                      fill="#649C59"
                                      d="M23.418 21.673l-1.161-2.322h.87l-2.031-3.484-2.032 3.484h.87l-1.16 2.322h4.644z"
                                    ></path>
                                    <path
                                      fill="#458F33"
                                      d="M20.775 19.122l.133-.267a.26.26 0 00-.232-.375.26.26 0 01-.24-.16.259.259 0 01.017-.23l.97-1.663-.327-.56-2.032 3.484h.87l-1.16 2.322h4.644l-.435-.87h-1.17a1.16 1.16 0 01-1.038-1.681z"
                                    ></path>
                                    <path
                                      fill="#E3E3E3"
                                      d="M22.27 17.873a2.32 2.32 0 01-2.34 0l1.17-2.006 1.17 2.006z"
                                    ></path>
                                    <path
                                      fill="#CBCBCB"
                                      d="M21.425 16.427l-.97 1.664c0 .003-.003.003-.003.006a2.19 2.19 0 01-.522-.224l1.168-2.006.327.56z"
                                    ></path>
                                    <path
                                      fill="#D37F6A"
                                      d="M7.742 20.227h1.161v3.193a.58.58 0 11-1.16 0v-3.193z"
                                    ></path>
                                    <path
                                      fill="#E3E3E3"
                                      d="M8.256 18.803l.07.261.19-.19c.436-.436.68-1.026.68-1.642v-.32a2.312 2.312 0 00-2.298.324l.276.16c.533.307.922.813 1.082 1.407z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M8.062 18.994l.26.07-.069-.262a2.322 2.322 0 00-1.082-1.41l-.275-.158a2.286 2.286 0 00-.871 2.15l.275-.159a2.323 2.323 0 011.761-.231z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M8.511 18.875l-.19.19.26.07a2.32 2.32 0 001.763-.232l.275-.159a2.322 2.322 0 00-1.428-1.83v.32c0 .615-.244 1.206-.68 1.641z"
                                    ></path>
                                    <path
                                      fill="#E3E3E3"
                                      d="M8.131 19.254l.19-.191-.26-.07a2.32 2.32 0 00-1.763.232l-.275.16a2.322 2.322 0 001.428 1.83v-.32c0-.615.245-1.206.68-1.641z"
                                    ></path>
                                    <path
                                      fill="#E3E3E3"
                                      d="M10.643 19.063c-.001-.107-.01-.214-.025-.32l-.275.158a2.322 2.322 0 01-1.762.232l-.26-.07.069.262c.16.595.549 1.102 1.082 1.41l.275.159a2.318 2.318 0 00.896-1.83z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M8.394 19.324l-.07-.262-.19.191a2.322 2.322 0 00-.68 1.642v.32a2.311 2.311 0 002.297-.324l-.275-.16a2.322 2.322 0 01-1.082-1.407z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M14.997 17.61a2.905 2.905 0 012.903 2.902v3.484h-5.806v-3.484a2.903 2.903 0 012.903-2.903z"
                                    ></path>
                                    <path
                                      fill="#DB9014"
                                      d="M17.9 23.13V24h-5.806v-3.094A8.645 8.645 0 0017.9 23.13z"
                                    ></path>
                                    <path
                                      fill="#E3E3E3"
                                      d="M17.87 20.119a.58.58 0 01-1.132-.182v.58a.58.58 0 01-1.16 0v-1.741a.58.58 0 01-1.162 0v1.161a.581.581 0 01-1.161 0v.58a.58.58 0 11-1.161 0 2.903 2.903 0 015.777-.398z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M15.002 15.883a.57.57 0 01-.386.533.593.593 0 01-.755-.34l-.11-.287-.226-.598-.254-.665-.017-.05a.576.576 0 00-.403-.354.518.518 0 00-.178-.017.58.58 0 00-.56.54.556.556 0 00.035.22.562.562 0 01.035.192.57.57 0 01-.386.534.594.594 0 01-.75-.337 1.611 1.611 0 01-.073-.254 1.56 1.56 0 01-.016-.58c.064-.406.275-.774.592-1.034.145-.127.313-.226.494-.293h.002a1.818 1.818 0 011.66.177c.299.199.528.485.657.819l.073.194.226.598.303.809a.574.574 0 01.037.194v-.001z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M19.067 14.673c0 .11-.013.22-.036.326a1.6 1.6 0 01-.073.255.593.593 0 01-.755.336.57.57 0 01-.384-.533.195.195 0 01.006-.058.434.434 0 01.029-.133.55.55 0 00-.025-.448.383.383 0 00-.03-.044v-.003a.575.575 0 00-.295-.235.608.608 0 00-.2-.036h-.018a.662.662 0 00-.134.02.575.575 0 00-.403.354l-.019.054-.254.665-.226.598-.11.287a.593.593 0 01-.754.34.562.562 0 01-.358-.71l.011-.02.305-.806.226-.598.073-.195c.13-.334.358-.62.656-.818a1.818 1.818 0 011.66-.179h.002c.18.067.348.167.494.293a1.673 1.673 0 01.612 1.288z"
                                    ></path>
                                    <path
                                      fill="#E3E3E3"
                                      d="M15 6l-9 9 .34.34a1.161 1.161 0 001.642 0l5.555-5.556a.346.346 0 01.591.244v1.161a.606.606 0 00.481.608.58.58 0 00.68-.572v-.58a.582.582 0 00.768.551.605.605 0 00.394-.588.347.347 0 01.59-.244l4.975 4.975a1.161 1.161 0 001.642 0l.34-.34L15 6z"
                                    ></path>
                                    <path
                                      fill="#fff"
                                      d="M14.998 6l-.435.435L23.126 15l-.34.34a1.16 1.16 0 01-.386.255 1.16 1.16 0 001.257-.255l.34-.34-9-8.999z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M12.97 12.096a.29.29 0 100-.58.29.29 0 000 .58z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M15.29 12.971a.29.29 0 100-.58.29.29 0 000 .58z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M17.032 12.096a.29.29 0 100-.58.29.29 0 000 .58z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M9.486 15.58a.29.29 0 100-.58.29.29 0 000 .58z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M11.517 17.323a.29.29 0 100-.58.29.29 0 000 .58z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M19.064 23.128a.29.29 0 100-.581.29.29 0 000 .58z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M12.97 16.745a.29.29 0 100-.581.29.29 0 000 .58z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M17.322 17.034a.29.29 0 100-.58.29.29 0 000 .58z"
                                    ></path>
                                    <path
                                      fill="#DB9014"
                                      d="M10.353 23.128a.29.29 0 100-.581.29.29 0 000 .58z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M19.93 16.159a.29.29 0 100-.581.29.29 0 000 .58z"
                                    ></path>
                                    <path
                                      fill="#DB9014"
                                      d="M10.93 21.963a.29.29 0 100-.58.29.29 0 000 .58z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M18.486 18.19a.29.29 0 100-.58.29.29 0 000 .58z"
                                    ></path>
                                    <path
                                      fill="#DB9014"
                                      d="M14.657 14.88l-.907.906-.227-.598.908-.907.226.598z"
                                    ></path>
                                    <path
                                      fill="#DB9014"
                                      d="M14.129 13.673l-.856.857-.018-.049a.574.574 0 00-.403-.354l.853-.854c.164.107.308.242.424.4z"
                                    ></path>
                                    <path
                                      fill="#DB9014"
                                      d="M12.673 14.107a.58.58 0 00-.461.253.217.217 0 01-.067-.07l-.58-.871-.018-.032a1.59 1.59 0 01.493-.293h.003l.003.006.58.87a.304.304 0 01.047.137z"
                                    ></path>
                                    <path
                                      fill="#DB9014"
                                      d="M12.18 14.983a.246.246 0 01-.081.012h-1.125a1.559 1.559 0 01-.016-.58h1.14c.025-.002.05.002.073.01a.556.556 0 00-.02.436c.015.04.025.08.029.122z"
                                    ></path>
                                    <path
                                      fill="#DB9014"
                                      d="M16.472 15.191l-.226.598-.003-.003-.907-.907.226-.598.91.91z"
                                    ></path>
                                    <path
                                      fill="#DB9014"
                                      d="M17.145 14.126a.575.575 0 00-.404.354l-.017.05-.857-.857c.116-.158.26-.293.424-.4l.854.853z"
                                    ></path>
                                    <path
                                      fill="#DB9014"
                                      d="M18.453 13.388l-.018.032-.64.955a.606.606 0 00-.496-.271h-.018l.67-1.004a.009.009 0 00.004-.006h.003c.18.067.348.166.493.293l.002.001z"
                                    ></path>
                                    <path
                                      fill="#DB9014"
                                      d="M19.063 14.67c0 .11-.013.219-.037.326H17.82a.437.437 0 01.03-.133.55.55 0 00-.025-.449h1.219c.014.085.02.17.019.255z"
                                    ></path>
                                    <path
                                      fill="#E3E3E3"
                                      d="M18.776 6h2.903a.58.58 0 010 1.161h-2.903a.58.58 0 110-1.161z"
                                    ></path>
                                    <path
                                      fill="#fff"
                                      d="M21.674 6h-.58a.58.58 0 010 1.161h.58a.58.58 0 100-1.161z"
                                    ></path>
                                    <path
                                      fill="#CBCBCB"
                                      d="M19.066 6.58a.58.58 0 01.58-.58h-.87a.58.58 0 100 1.161h.87a.58.58 0 01-.58-.58z"
                                    ></path>
                                  </g>
                                </g>
                              </g>
                              <defs>
                                <filter
                                  id="filter0_d_7474_481425"
                                  width="30"
                                  height="30.008"
                                  x="0"
                                  y="0"
                                  colorInterpolationFilters="sRGB"
                                  filterUnits="userSpaceOnUse"
                                >
                                  <feFlood
                                    floodOpacity="0"
                                    result="BackgroundImageFix"
                                  ></feFlood>
                                  <feColorMatrix
                                    in="SourceAlpha"
                                    result="hardAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                  ></feColorMatrix>
                                  <feOffset></feOffset>
                                  <feGaussianBlur stdDeviation="3"></feGaussianBlur>
                                  <feComposite
                                    in2="hardAlpha"
                                    operator="out"
                                  ></feComposite>
                                  <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.733333 0 0 0 0 0.2 0 0 0 0.6 0"></feColorMatrix>
                                  <feBlend
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_7474_481425"
                                  ></feBlend>
                                  <feBlend
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow_7474_481425"
                                    result="shape"
                                  ></feBlend>
                                </filter>
                              </defs>
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
                                d="M20.0402 6.82165L14.2802 2.79165C12.7102 1.69165 10.3002 1.75165 8.79023 2.92165L3.78023 6.83165C2.78023 7.61165 1.99023 9.21165 1.99023 10.4716V17.3716C1.99023 19.9216 4.06023 22.0016 6.61023 22.0016H17.3902C19.9402 22.0016 22.0102 19.9316 22.0102 17.3816V10.6016C22.0102 9.25165 21.1402 7.59165 20.0402 6.82165ZM12.7502 18.0016C12.7502 18.4116 12.4102 18.7516 12.0002 18.7516C11.5902 18.7516 11.2502 18.4116 11.2502 18.0016V15.0016C11.2502 14.5916 11.5902 14.2516 12.0002 14.2516C12.4102 14.2516 12.7502 14.5916 12.7502 15.0016V18.0016Z"
                                fill="white"
                              />
                            </svg>
                          )}
                        </>
                      ) : (
                        <>
                          {theme?.theme === "christmas" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <g filter="url(#filter0_d_7474_481425)">
                                <g>
                                  <g>
                                    <path
                                      fill="#E74B4A"
                                      d="M21.674 15.005l-6.677-6.677-6.677 6.677v9h13.354v-9z"
                                    ></path>
                                    <path
                                      fill="#C71818"
                                      d="M14.609 12.674a.58.58 0 00.678-.572v-.58a.583.583 0 00.767.55.605.605 0 00.395-.587.348.348 0 01.48-.32c.042.017.08.043.112.076l4.633 4.635v-.871l-6.677-6.677-6.677 6.677v9h13.354v-.872H17.9a8.709 8.709 0 01-8.631-7.558 1.168 1.168 0 01.332-.98l3.933-3.933a.346.346 0 01.592.242v1.162a.606.606 0 00.483.606v.002z"
                                    ></path>
                                    <path
                                      fill="#E74B4A"
                                      d="M18.773 7.164h2.903v5.516l-2.903-2.903V7.164z"
                                    ></path>
                                    <path
                                      fill="#C71818"
                                      d="M18.773 7.164h2.903v.58h-2.903v-.58z"
                                    ></path>
                                    <path
                                      fill="#C71818"
                                      d="M21.676 11.801v.871L18.773 9.77V8.9l2.903 2.902z"
                                    ></path>
                                    <path
                                      fill="#D37F6A"
                                      d="M20.516 21.672h1.16v2.322h-1.16v-2.322z"
                                    ></path>
                                    <path
                                      fill="#C67869"
                                      d="M20.516 21.672h1.16v.58h-1.16v-.58z"
                                    ></path>
                                    <path
                                      fill="#649C59"
                                      d="M23.418 21.673l-1.161-2.322h.87l-2.031-3.484-2.032 3.484h.87l-1.16 2.322h4.644z"
                                    ></path>
                                    <path
                                      fill="#458F33"
                                      d="M20.775 19.122l.133-.267a.26.26 0 00-.232-.375.26.26 0 01-.24-.16.259.259 0 01.017-.23l.97-1.663-.327-.56-2.032 3.484h.87l-1.16 2.322h4.644l-.435-.87h-1.17a1.16 1.16 0 01-1.038-1.681z"
                                    ></path>
                                    <path
                                      fill="#E3E3E3"
                                      d="M22.27 17.873a2.32 2.32 0 01-2.34 0l1.17-2.006 1.17 2.006z"
                                    ></path>
                                    <path
                                      fill="#CBCBCB"
                                      d="M21.425 16.427l-.97 1.664c0 .003-.003.003-.003.006a2.19 2.19 0 01-.522-.224l1.168-2.006.327.56z"
                                    ></path>
                                    <path
                                      fill="#D37F6A"
                                      d="M7.742 20.227h1.161v3.193a.58.58 0 11-1.16 0v-3.193z"
                                    ></path>
                                    <path
                                      fill="#E3E3E3"
                                      d="M8.256 18.803l.07.261.19-.19c.436-.436.68-1.026.68-1.642v-.32a2.312 2.312 0 00-2.298.324l.276.16c.533.307.922.813 1.082 1.407z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M8.062 18.994l.26.07-.069-.262a2.322 2.322 0 00-1.082-1.41l-.275-.158a2.286 2.286 0 00-.871 2.15l.275-.159a2.323 2.323 0 011.761-.231z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M8.511 18.875l-.19.19.26.07a2.32 2.32 0 001.763-.232l.275-.159a2.322 2.322 0 00-1.428-1.83v.32c0 .615-.244 1.206-.68 1.641z"
                                    ></path>
                                    <path
                                      fill="#E3E3E3"
                                      d="M8.131 19.254l.19-.191-.26-.07a2.32 2.32 0 00-1.763.232l-.275.16a2.322 2.322 0 001.428 1.83v-.32c0-.615.245-1.206.68-1.641z"
                                    ></path>
                                    <path
                                      fill="#E3E3E3"
                                      d="M10.643 19.063c-.001-.107-.01-.214-.025-.32l-.275.158a2.322 2.322 0 01-1.762.232l-.26-.07.069.262c.16.595.549 1.102 1.082 1.41l.275.159a2.318 2.318 0 00.896-1.83z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M8.394 19.324l-.07-.262-.19.191a2.322 2.322 0 00-.68 1.642v.32a2.311 2.311 0 002.297-.324l-.275-.16a2.322 2.322 0 01-1.082-1.407z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M14.997 17.61a2.905 2.905 0 012.903 2.902v3.484h-5.806v-3.484a2.903 2.903 0 012.903-2.903z"
                                    ></path>
                                    <path
                                      fill="#DB9014"
                                      d="M17.9 23.13V24h-5.806v-3.094A8.645 8.645 0 0017.9 23.13z"
                                    ></path>
                                    <path
                                      fill="#E3E3E3"
                                      d="M17.87 20.119a.58.58 0 01-1.132-.182v.58a.58.58 0 01-1.16 0v-1.741a.58.58 0 01-1.162 0v1.161a.581.581 0 01-1.161 0v.58a.58.58 0 11-1.161 0 2.903 2.903 0 015.777-.398z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M15.002 15.883a.57.57 0 01-.386.533.593.593 0 01-.755-.34l-.11-.287-.226-.598-.254-.665-.017-.05a.576.576 0 00-.403-.354.518.518 0 00-.178-.017.58.58 0 00-.56.54.556.556 0 00.035.22.562.562 0 01.035.192.57.57 0 01-.386.534.594.594 0 01-.75-.337 1.611 1.611 0 01-.073-.254 1.56 1.56 0 01-.016-.58c.064-.406.275-.774.592-1.034.145-.127.313-.226.494-.293h.002a1.818 1.818 0 011.66.177c.299.199.528.485.657.819l.073.194.226.598.303.809a.574.574 0 01.037.194v-.001z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M19.067 14.673c0 .11-.013.22-.036.326a1.6 1.6 0 01-.073.255.593.593 0 01-.755.336.57.57 0 01-.384-.533.195.195 0 01.006-.058.434.434 0 01.029-.133.55.55 0 00-.025-.448.383.383 0 00-.03-.044v-.003a.575.575 0 00-.295-.235.608.608 0 00-.2-.036h-.018a.662.662 0 00-.134.02.575.575 0 00-.403.354l-.019.054-.254.665-.226.598-.11.287a.593.593 0 01-.754.34.562.562 0 01-.358-.71l.011-.02.305-.806.226-.598.073-.195c.13-.334.358-.62.656-.818a1.818 1.818 0 011.66-.179h.002c.18.067.348.167.494.293a1.673 1.673 0 01.612 1.288z"
                                    ></path>
                                    <path
                                      fill="#E3E3E3"
                                      d="M15 6l-9 9 .34.34a1.161 1.161 0 001.642 0l5.555-5.556a.346.346 0 01.591.244v1.161a.606.606 0 00.481.608.58.58 0 00.68-.572v-.58a.582.582 0 00.768.551.605.605 0 00.394-.588.347.347 0 01.59-.244l4.975 4.975a1.161 1.161 0 001.642 0l.34-.34L15 6z"
                                    ></path>
                                    <path
                                      fill="#fff"
                                      d="M14.998 6l-.435.435L23.126 15l-.34.34a1.16 1.16 0 01-.386.255 1.16 1.16 0 001.257-.255l.34-.34-9-8.999z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M12.97 12.096a.29.29 0 100-.58.29.29 0 000 .58z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M15.29 12.971a.29.29 0 100-.58.29.29 0 000 .58z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M17.032 12.096a.29.29 0 100-.58.29.29 0 000 .58z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M9.486 15.58a.29.29 0 100-.58.29.29 0 000 .58z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M11.517 17.323a.29.29 0 100-.58.29.29 0 000 .58z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M19.064 23.128a.29.29 0 100-.581.29.29 0 000 .58z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M12.97 16.745a.29.29 0 100-.581.29.29 0 000 .58z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M17.322 17.034a.29.29 0 100-.58.29.29 0 000 .58z"
                                    ></path>
                                    <path
                                      fill="#DB9014"
                                      d="M10.353 23.128a.29.29 0 100-.581.29.29 0 000 .58z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M19.93 16.159a.29.29 0 100-.581.29.29 0 000 .58z"
                                    ></path>
                                    <path
                                      fill="#DB9014"
                                      d="M10.93 21.963a.29.29 0 100-.58.29.29 0 000 .58z"
                                    ></path>
                                    <path
                                      fill="#EDB13E"
                                      d="M18.486 18.19a.29.29 0 100-.58.29.29 0 000 .58z"
                                    ></path>
                                    <path
                                      fill="#DB9014"
                                      d="M14.657 14.88l-.907.906-.227-.598.908-.907.226.598z"
                                    ></path>
                                    <path
                                      fill="#DB9014"
                                      d="M14.129 13.673l-.856.857-.018-.049a.574.574 0 00-.403-.354l.853-.854c.164.107.308.242.424.4z"
                                    ></path>
                                    <path
                                      fill="#DB9014"
                                      d="M12.673 14.107a.58.58 0 00-.461.253.217.217 0 01-.067-.07l-.58-.871-.018-.032a1.59 1.59 0 01.493-.293h.003l.003.006.58.87a.304.304 0 01.047.137z"
                                    ></path>
                                    <path
                                      fill="#DB9014"
                                      d="M12.18 14.983a.246.246 0 01-.081.012h-1.125a1.559 1.559 0 01-.016-.58h1.14c.025-.002.05.002.073.01a.556.556 0 00-.02.436c.015.04.025.08.029.122z"
                                    ></path>
                                    <path
                                      fill="#DB9014"
                                      d="M16.472 15.191l-.226.598-.003-.003-.907-.907.226-.598.91.91z"
                                    ></path>
                                    <path
                                      fill="#DB9014"
                                      d="M17.145 14.126a.575.575 0 00-.404.354l-.017.05-.857-.857c.116-.158.26-.293.424-.4l.854.853z"
                                    ></path>
                                    <path
                                      fill="#DB9014"
                                      d="M18.453 13.388l-.018.032-.64.955a.606.606 0 00-.496-.271h-.018l.67-1.004a.009.009 0 00.004-.006h.003c.18.067.348.166.493.293l.002.001z"
                                    ></path>
                                    <path
                                      fill="#DB9014"
                                      d="M19.063 14.67c0 .11-.013.219-.037.326H17.82a.437.437 0 01.03-.133.55.55 0 00-.025-.449h1.219c.014.085.02.17.019.255z"
                                    ></path>
                                    <path
                                      fill="#E3E3E3"
                                      d="M18.776 6h2.903a.58.58 0 010 1.161h-2.903a.58.58 0 110-1.161z"
                                    ></path>
                                    <path
                                      fill="#fff"
                                      d="M21.674 6h-.58a.58.58 0 010 1.161h.58a.58.58 0 100-1.161z"
                                    ></path>
                                    <path
                                      fill="#CBCBCB"
                                      d="M19.066 6.58a.58.58 0 01.58-.58h-.87a.58.58 0 100 1.161h.87a.58.58 0 01-.58-.58z"
                                    ></path>
                                  </g>
                                </g>
                              </g>
                              <defs>
                                <filter
                                  id="filter0_d_7474_481425"
                                  width="30"
                                  height="30.008"
                                  x="0"
                                  y="0"
                                  colorInterpolationFilters="sRGB"
                                  filterUnits="userSpaceOnUse"
                                >
                                  <feFlood
                                    floodOpacity="0"
                                    result="BackgroundImageFix"
                                  ></feFlood>
                                  <feColorMatrix
                                    in="SourceAlpha"
                                    result="hardAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                  ></feColorMatrix>
                                  <feOffset></feOffset>
                                  <feGaussianBlur stdDeviation="3"></feGaussianBlur>
                                  <feComposite
                                    in2="hardAlpha"
                                    operator="out"
                                  ></feComposite>
                                  <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.733333 0 0 0 0 0.2 0 0 0 0.6 0"></feColorMatrix>
                                  <feBlend
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_7474_481425"
                                  ></feBlend>
                                  <feBlend
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow_7474_481425"
                                    result="shape"
                                  ></feBlend>
                                </filter>
                              </defs>
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
                        </>
                      )}

                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 400,
                          color: "white",
                          marginTop: "4px",
                        }}
                      >
                        {t("Home")}
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
                        dispatch(updateFromRouter(location.pathname));
                      }}
                    >
                      {pathname && pathname === "/packages" ? (
                        <>
                          {theme?.theme === "christmas" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <g filter="url(#filter0_d_7474_481490)">
                                <g>
                                  <g>
                                    <g>
                                      <path
                                        fill="#C22026"
                                        d="M23.436 20.05L15 23.995v-9.503l8.436-3.384v8.94z"
                                      ></path>
                                      <path
                                        fill="#EB2335"
                                        d="M6.563 20.05l8.436 3.946v-9.503l-8.437-3.384v8.94z"
                                      ></path>
                                      <path
                                        fill="#007145"
                                        d="M24 12.321l-9 3.947v-3.462l9-3.665v3.18z"
                                      ></path>
                                      <path
                                        fill="#008A55"
                                        d="M6 12.321l9 3.947v-3.462L6 9.14v3.18z"
                                      ></path>
                                      <path
                                        fill="#00C477"
                                        d="M6 9.14L15 6l9 3.14-9 3.665-9-3.666z"
                                      ></path>
                                      <path
                                        fill="#FFAA39"
                                        d="M20.208 13.984v7.581l-1.411.66v-7.622l1.41-.619z"
                                      ></path>
                                      <path
                                        fill="#FFC943"
                                        d="M20.208 10.688v3.299l-1.411.618v-3.343l1.41-.575z"
                                      ></path>
                                      <path
                                        fill="#FAF180"
                                        d="M20.204 10.683l-1.411.574-8.621-3.575 1.216-.424 8.816 3.425z"
                                      ></path>
                                      <path
                                        fill="#FFC943"
                                        d="M9.797 13.984v7.581l1.41.66v-7.622l-1.41-.619z"
                                      ></path>
                                      <path
                                        fill="#FFC943"
                                        d="M9.797 10.688v3.299l1.41.618v-3.343l-1.41-.575z"
                                      ></path>
                                      <path
                                        fill="#FAF180"
                                        d="M9.797 10.683l1.41.574 8.622-3.575-1.216-.424-8.816 3.425z"
                                      ></path>
                                      <path
                                        fill="#000"
                                        d="M23.434 12.57v.768l-8.436 3.89-8.435-3.89v-.768l8.435 3.7 8.436-3.7z"
                                        opacity="0.3"
                                      ></path>
                                    </g>
                                    <g>
                                      <path
                                        fill="#000"
                                        d="M18.116 8.336c-1.23 0-2.112.57-2.597.992a.925.925 0 00-1.044 0c-.485-.422-1.368-.992-2.597-.992-2.186 0-2.096.811-2.096 1.175 0 .271.341 1.02 1.81 1.02.916 0 1.943-.155 2.787-.503.133.15.36.248.618.248s.485-.099.618-.248c.844.348 1.872.503 2.787.503 1.469 0 1.81-.75 1.81-1.02 0-.364.09-1.175-2.096-1.175z"
                                        opacity="0.3"
                                      ></path>
                                      <path
                                        fill="#EB2335"
                                        d="M15.086 9.229s1.08-2.143 3.029-2.143c2.186 0 2.096 1.212 2.096 1.755 0 .405-.341 1.523-1.81 1.523-1.117 0-2.4-.341-3.315-1.135z"
                                      ></path>
                                      <path
                                        fill="#C22026"
                                        d="M19.328 8.957c.507.195.568.895.095 1.165-.257.147-.59.244-1.023.244-.807 0-1.7-.178-2.478-.576.512-.517 1.25-1.017 2.191-1.017.525 0 .92.07 1.215.184z"
                                      ></path>
                                      <path
                                        fill="#7D121C"
                                        d="M18.4 10.142a5.4 5.4 0 01-2.08-.414C16.88 9.245 17.48 9 18.113 9c.424 0 .775.047 1.055.14.379.128.42.655.06.83a1.85 1.85 0 01-.827.172z"
                                      ></path>
                                      <path
                                        fill="#EB2335"
                                        d="M14.907 9.229s-1.08-2.143-3.029-2.143c-2.186 0-2.096 1.212-2.096 1.755 0 .405.341 1.523 1.81 1.523 1.117 0 2.4-.341 3.315-1.135z"
                                      ></path>
                                      <path
                                        fill="#C22026"
                                        d="M10.668 8.958c-.508.195-.568.895-.096 1.165.257.147.591.244 1.023.244.809 0 1.7-.178 2.478-.576-.511-.517-1.25-1.018-2.191-1.018-.525 0-.919.07-1.214.185z"
                                      ></path>
                                      <path
                                        fill="#7D121C"
                                        d="M11.592 10.142a5.4 5.4 0 002.08-.414C13.113 9.245 12.512 9 11.88 9c-.423 0-.775.047-1.054.14-.379.128-.422.655-.061.83.21.104.481.172.828.172z"
                                      ></path>
                                      <path
                                        fill="#FAF180"
                                        d="M14.995 10.242c.536 0 .97-.486.97-1.086 0-.6-.434-1.086-.97-1.086-.537 0-.972.486-.972 1.086 0 .6.435 1.086.972 1.086z"
                                      ></path>
                                      <path
                                        fill="#FFC943"
                                        d="M15.966 9.159c0 .597-.435 1.086-.971 1.086-.537 0-.972-.487-.972-1.086 0-.043.003-.085.007-.128.056.54.467.959.965.959.497 0 .908-.419.964-.959.005.043.007.085.007.128z"
                                      ></path>
                                    </g>
                                  </g>
                                </g>
                              </g>
                              <defs>
                                <filter
                                  id="filter0_d_7474_481490"
                                  width="30"
                                  height="30"
                                  x="0"
                                  y="0"
                                  colorInterpolationFilters="sRGB"
                                  filterUnits="userSpaceOnUse"
                                >
                                  <feFlood
                                    floodOpacity="0"
                                    result="BackgroundImageFix"
                                  ></feFlood>
                                  <feColorMatrix
                                    in="SourceAlpha"
                                    result="hardAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                  ></feColorMatrix>
                                  <feOffset></feOffset>
                                  <feGaussianBlur stdDeviation="3"></feGaussianBlur>
                                  <feComposite
                                    in2="hardAlpha"
                                    operator="out"
                                  ></feComposite>
                                  <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.733333 0 0 0 0 0.2 0 0 0 0.6 0"></feColorMatrix>
                                  <feBlend
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_7474_481490"
                                  ></feBlend>
                                  <feBlend
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow_7474_481490"
                                    result="shape"
                                  ></feBlend>
                                </filter>
                              </defs>
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
                                d="M20.2085 7.82141L12.5085 12.2814C12.1985 12.4614 11.8085 12.4614 11.4885 12.2814L3.78847 7.82141C3.23847 7.50141 3.09847 6.75141 3.51847 6.28141C3.80847 5.95141 4.13847 5.68141 4.48847 5.49141L9.90847 2.49141C11.0685 1.84141 12.9485 1.84141 14.1085 2.49141L19.5285 5.49141C19.8785 5.68141 20.2085 5.96141 20.4985 6.28141C20.8985 6.75141 20.7585 7.50141 20.2085 7.82141ZM11.4305 14.1394V20.9594C11.4305 21.7194 10.6605 22.2194 9.98047 21.8894C7.92047 20.8794 4.45047 18.9894 4.45047 18.9894C3.23047 18.2994 2.23047 16.5594 2.23047 15.1294V9.96941C2.23047 9.17941 3.06047 8.67941 3.74047 9.06941L10.9305 13.2394C11.2305 13.4294 11.4305 13.7694 11.4305 14.1394ZM12.5705 14.1394V20.9594C12.5705 21.7194 13.3405 22.2194 14.0205 21.8894C16.0805 20.8794 19.5505 18.9894 19.5505 18.9894C20.7705 18.2994 21.7705 16.5594 21.7705 15.1294V9.96941C21.7705 9.17941 20.9405 8.67941 20.2605 9.06941L13.0705 13.2394C12.7705 13.4294 12.5705 13.7694 12.5705 14.1394Z"
                                fill="white"
                              />
                            </svg>
                          )}
                        </>
                      ) : (
                        <>
                          {theme?.theme === "christmas" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <g filter="url(#filter0_d_7474_481490)">
                                <g>
                                  <g>
                                    <g>
                                      <path
                                        fill="#C22026"
                                        d="M23.436 20.05L15 23.995v-9.503l8.436-3.384v8.94z"
                                      ></path>
                                      <path
                                        fill="#EB2335"
                                        d="M6.563 20.05l8.436 3.946v-9.503l-8.437-3.384v8.94z"
                                      ></path>
                                      <path
                                        fill="#007145"
                                        d="M24 12.321l-9 3.947v-3.462l9-3.665v3.18z"
                                      ></path>
                                      <path
                                        fill="#008A55"
                                        d="M6 12.321l9 3.947v-3.462L6 9.14v3.18z"
                                      ></path>
                                      <path
                                        fill="#00C477"
                                        d="M6 9.14L15 6l9 3.14-9 3.665-9-3.666z"
                                      ></path>
                                      <path
                                        fill="#FFAA39"
                                        d="M20.208 13.984v7.581l-1.411.66v-7.622l1.41-.619z"
                                      ></path>
                                      <path
                                        fill="#FFC943"
                                        d="M20.208 10.688v3.299l-1.411.618v-3.343l1.41-.575z"
                                      ></path>
                                      <path
                                        fill="#FAF180"
                                        d="M20.204 10.683l-1.411.574-8.621-3.575 1.216-.424 8.816 3.425z"
                                      ></path>
                                      <path
                                        fill="#FFC943"
                                        d="M9.797 13.984v7.581l1.41.66v-7.622l-1.41-.619z"
                                      ></path>
                                      <path
                                        fill="#FFC943"
                                        d="M9.797 10.688v3.299l1.41.618v-3.343l-1.41-.575z"
                                      ></path>
                                      <path
                                        fill="#FAF180"
                                        d="M9.797 10.683l1.41.574 8.622-3.575-1.216-.424-8.816 3.425z"
                                      ></path>
                                      <path
                                        fill="#000"
                                        d="M23.434 12.57v.768l-8.436 3.89-8.435-3.89v-.768l8.435 3.7 8.436-3.7z"
                                        opacity="0.3"
                                      ></path>
                                    </g>
                                    <g>
                                      <path
                                        fill="#000"
                                        d="M18.116 8.336c-1.23 0-2.112.57-2.597.992a.925.925 0 00-1.044 0c-.485-.422-1.368-.992-2.597-.992-2.186 0-2.096.811-2.096 1.175 0 .271.341 1.02 1.81 1.02.916 0 1.943-.155 2.787-.503.133.15.36.248.618.248s.485-.099.618-.248c.844.348 1.872.503 2.787.503 1.469 0 1.81-.75 1.81-1.02 0-.364.09-1.175-2.096-1.175z"
                                        opacity="0.3"
                                      ></path>
                                      <path
                                        fill="#EB2335"
                                        d="M15.086 9.229s1.08-2.143 3.029-2.143c2.186 0 2.096 1.212 2.096 1.755 0 .405-.341 1.523-1.81 1.523-1.117 0-2.4-.341-3.315-1.135z"
                                      ></path>
                                      <path
                                        fill="#C22026"
                                        d="M19.328 8.957c.507.195.568.895.095 1.165-.257.147-.59.244-1.023.244-.807 0-1.7-.178-2.478-.576.512-.517 1.25-1.017 2.191-1.017.525 0 .92.07 1.215.184z"
                                      ></path>
                                      <path
                                        fill="#7D121C"
                                        d="M18.4 10.142a5.4 5.4 0 01-2.08-.414C16.88 9.245 17.48 9 18.113 9c.424 0 .775.047 1.055.14.379.128.42.655.06.83a1.85 1.85 0 01-.827.172z"
                                      ></path>
                                      <path
                                        fill="#EB2335"
                                        d="M14.907 9.229s-1.08-2.143-3.029-2.143c-2.186 0-2.096 1.212-2.096 1.755 0 .405.341 1.523 1.81 1.523 1.117 0 2.4-.341 3.315-1.135z"
                                      ></path>
                                      <path
                                        fill="#C22026"
                                        d="M10.668 8.958c-.508.195-.568.895-.096 1.165.257.147.591.244 1.023.244.809 0 1.7-.178 2.478-.576-.511-.517-1.25-1.018-2.191-1.018-.525 0-.919.07-1.214.185z"
                                      ></path>
                                      <path
                                        fill="#7D121C"
                                        d="M11.592 10.142a5.4 5.4 0 002.08-.414C13.113 9.245 12.512 9 11.88 9c-.423 0-.775.047-1.054.14-.379.128-.422.655-.061.83.21.104.481.172.828.172z"
                                      ></path>
                                      <path
                                        fill="#FAF180"
                                        d="M14.995 10.242c.536 0 .97-.486.97-1.086 0-.6-.434-1.086-.97-1.086-.537 0-.972.486-.972 1.086 0 .6.435 1.086.972 1.086z"
                                      ></path>
                                      <path
                                        fill="#FFC943"
                                        d="M15.966 9.159c0 .597-.435 1.086-.971 1.086-.537 0-.972-.487-.972-1.086 0-.043.003-.085.007-.128.056.54.467.959.965.959.497 0 .908-.419.964-.959.005.043.007.085.007.128z"
                                      ></path>
                                    </g>
                                  </g>
                                </g>
                              </g>
                              <defs>
                                <filter
                                  id="filter0_d_7474_481490"
                                  width="30"
                                  height="30"
                                  x="0"
                                  y="0"
                                  colorInterpolationFilters="sRGB"
                                  filterUnits="userSpaceOnUse"
                                >
                                  <feFlood
                                    floodOpacity="0"
                                    result="BackgroundImageFix"
                                  ></feFlood>
                                  <feColorMatrix
                                    in="SourceAlpha"
                                    result="hardAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                  ></feColorMatrix>
                                  <feOffset></feOffset>
                                  <feGaussianBlur stdDeviation="3"></feGaussianBlur>
                                  <feComposite
                                    in2="hardAlpha"
                                    operator="out"
                                  ></feComposite>
                                  <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.733333 0 0 0 0 0.2 0 0 0 0.6 0"></feColorMatrix>
                                  <feBlend
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_7474_481490"
                                  ></feBlend>
                                  <feBlend
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow_7474_481490"
                                    result="shape"
                                  ></feBlend>
                                </filter>
                              </defs>
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
                        </>
                      )}
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 400,
                          color: "white",
                          marginTop: "4px",
                        }}
                      >
                        {t("Packages")}
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
                        dispatch(updateOpenMess(true));
                        setOpenSearch(false);
                        dispatch(updateOpenMenu(false));
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
                            {t("Chat")}
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
                  >
                    <div
                      onClick={() => {
                        dispatch(updateOpenMess(false));
                        setOpenSearch(false);
                        dispatch(updateOpenMenu(false));
                        dispatch(openNotificationDialog());
                      }}
                    >
                      <Badge
                        badgeContent={""}
                        color="error"
                        invisible
                        className="cursor-pointer"
                      >
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="24"
                            fill="none"
                            viewBox="0 0 22 24"
                          >
                            <path
                              fill="#fff"
                              d="M11.203 19.153H5.15c-2.513 0-3.952-2.487-2.677-4.64a8.448 8.448 0 001.178-4.362c.007-1.278-.034-2.567.119-3.827C4.153 3.172 7.01.513 10.139.069c4.186-.6 8.677 2.794 8.66 7.739 0 1.406.017 2.825.212 4.214.118.835.524 1.658.93 2.422.577 1.082.695 2.138.082 3.204-.612 1.065-1.59 1.516-2.819 1.51-2-.016-4.002-.005-6-.005zm-.01-1.831c1.998 0 3.999-.026 5.997.01 1.222.022 1.729-1.11 1.137-1.995a7.476 7.476 0 01-1.26-3.62c-.094-1.287-.034-2.584-.12-3.873-.05-.743-.154-1.513-.403-2.208-.92-2.542-3.48-4.053-6.182-3.733-2.437.295-4.505 2.36-4.796 4.933-.138 1.211-.08 2.448-.09 3.673-.011 1.699-.403 3.311-1.319 4.732-.706 1.09-.044 2.146 1.24 2.1 1.93-.07 3.863-.019 5.795-.019zM11.222 24c-1.648-.072-2.966-.754-3.89-2.146-.38-.572-.302-1.1.183-1.412.485-.313.962-.177 1.363.404 1.21 1.742 3.46 1.738 4.682-.01.395-.565.888-.7 1.37-.376.48.324.538.842.156 1.413-.918 1.374-2.223 2.048-3.864 2.127z"
                            ></path>
                          </svg>
                          <p
                            style={{
                              fontSize: "12px",
                              fontWeight: 400,
                              color: "white",
                              marginTop: "4px",
                            }}
                          >
                            Notifications
                          </p>
                        </div>
                        {checkNotificationRead() && (
                          <Box
                            className="position-absolute rounded-circle"
                            sx={{
                              right: 20,
                              top: -2,
                              width: 12,
                              height: 12,
                              backgroundColor: "#f05153",
                            }}
                          ></Box>
                        )}
                      </Badge>
                    </div>
                  </div>
                  <div
                    className="items"
                    style={{
                      backgroundColor: "unset",
                    }}
                    onClick={() => {
                      dispatch(updateOpenMenu(true));
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
                        {t("Menu")}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <MenuChat
                open={openMess}
                handleShow={() => {
                  dispatch(updateOpenMess(false));
                }}
                handleColor={() => {}}
              />
              {/* kdjaskldjlas */}
              <MenuBrowser
                open={openMenu}
                handleShowMenu={() => {
                  dispatch(updateOpenMenu(false));
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
                      dispatch(updateOpenMenu(true));
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
                      dispatch(updateOpenMess(true));
                      setOpenSearch(false);
                      dispatch(updateOpenMenu(false));
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
                      dispatch(updateOpenMenu(true));
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
                  dispatch(updateOpenMess(false));
                }}
                handleColor={() => {}}
              />
              <MenuBrowser
                open={openMenu}
                handleShowMenu={() => {
                  dispatch(updateOpenMenu(false));
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
