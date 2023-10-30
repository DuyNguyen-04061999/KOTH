import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  browserName,
} from "react-device-detect";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";
import _socket from "../../../redux-saga-middleware/config/socket";
import { toggleMetaMaskDialog } from "../../../redux-saga-middleware/reducers/walletReducer";
import imagesMetamask from "../../../utils/imagesMetamask";
import useWindowDimensions from "../../../utils/useWindowDimensions.js";

export default function MetaMaskDialog() {
  const { isMetamaskDialog, depositData } = useSelector(
    (state) => state.walletReducer
  );
  const { userId } = useSelector((state) => state.authReducer);
  const [count, setCount] = useState(60);

  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const [menuK, setMenuK] = useState(0);
  const menus = ["Desktop", "Mobile"];

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(_socket);
  }, []);

  useEffect(() => {
    if (isMetamaskDialog) {
      setCount(60);
    }
  }, [isMetamaskDialog]);

  useEffect(() => {
    socket?.on("closeMetaMaskQr", async () => {
      dispatch(toggleMetaMaskDialog());
    });

    return () => {
      socket?.off("closeMetaMaskQr");
    };
  }, [socket, dispatch]);

  useEffect(() => {
    if (menuK && menuK === 1) {
      const intervalId = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount > 0) {
            return prevCount - 1;
          } else {
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [menuK]);

  const list = [
    {
      icon: imagesMetamask?.heart,
      content:
        "Trusted by over 30 million users to buy, store, send and swap crypto securely",
    },
    {
      icon: imagesMetamask?.wallet,
      content:
        "The leading crypto wallet & gateway to blockchain apps built on Ethereum Mainnet, Polygon, Optimism and many other networks",
    },
    {
      icon: imagesMetamask?.lock,
      content:
        "Puts you in control of your digital interactions by making power of cryptography more accessible",
    },
  ];

  const handleInstall = () => {
    if (browserName?.includes("Edge")) {
      window.open(
        "https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm?hl=en-US",
        "_blank"
      );
    } else if (browserName?.includes("Chrome")) {
      window.open(
        "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
        "_blank"
      );
    } else if (browserName?.includes("Firefox")) {
      window.open(
        "https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/",
        "_blank"
      );
    } else if (browserName?.includes("Brave")) {
      window.open(
        "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
        "_blank"
      );
    } else if (browserName?.includes("Opera")) {
      window.open(
        "https://addons.opera.com/en-gb/extensions/details/metamask-10/",
        "_blank"
      );
    }
  };

  return ReactDOM.createPortal(
    <Dialog
      open={isMetamaskDialog}
      PaperProps={{
        style: {
          width: width < 576 ? "100%" : "50%",
        },
      }}
      fullScreen={width && width < 576}
      onClose={() => dispatch(toggleMetaMaskDialog())}
    >
      <Box
        component={"div"}
        sx={{
          background: "#37285c",
          width: "100%",
          height: width < 576 ? "100%" : "auto",
        }}
        className="position-relative"
      >
        <Box component={"div"} className="d-flex justify-content-center mt-5">
          <Box
            component={"img"}
            src={imagesMetamask?.logo}
            width={40}
            height={35}
            alt="..."
          />
          <Box component={"h2"} className="text-white ms-1">
            METAMASK
          </Box>
        </Box>
        <Box
          component={"div"}
          className="position-absolute"
          sx={{ top: 10, right: 10 }}
        >
          <CloseIcon
            onClick={() => dispatch(toggleMetaMaskDialog())}
            sx={{ color: "#8a77bc" }}
          />
        </Box>
        <Box
          component={"div"}
          className="p-3 ps-5 pe-5 d-flex justify-content-center"
        >
          {menus &&
            menus?.map((mn, i_mn) => (
              <Box
                key={i_mn}
                component={"div"}
                onClick={() => {
                  setMenuK(i_mn);
                }}
                className="p-1 ps-2 pe-2"
                sx={{
                  background: i_mn !== menuK ? "#2b1b44" : "#68399e",
                  width: "40%",
                  color: "#fff",
                  textAlign: "center",
                  borderRadius: i_mn === menuK ? "5px" : "0px",
                }}
              >
                {mn}
              </Box>
            ))}
        </Box>
        {menuK === 0 ? (
          <Box>
            <Box component={"div"} className="p-2 ps-4 pe-4">
              {list &&
                list?.map((item, i_item) => (
                  <Box
                    key={i_item}
                    component={"div"}
                    className="rounded mb-2 d-flex align-items-center"
                    sx={{
                      border: "0px solid #857cab",
                      borderWidth: "0.1px",
                    }}
                  >
                    <Box className="p-2 ps-3 pe-3" component={"div"}>
                      <Box
                        component={"img"}
                        src={item?.icon}
                        alt="..."
                        width={25}
                        height={25}
                      />
                    </Box>
                    <Box
                      component={"div"}
                      className="p-2 pt-3 pb-3"
                      sx={{
                        color: "#afa5d9",
                        fontSize: "14px",
                      }}
                    >
                      {item?.content}
                    </Box>
                  </Box>
                ))}
            </Box>
            <Box
              component={"div"}
              className="mt-3 mb-5 d-flex justify-content-center"
            >
              <Box
                component={"div"}
                className="d-flex rounded p-2 justify-content-center align-items-center"
                sx={{
                  width: "80%",
                  background: "linear-gradient(180deg, #843ff0, #7748ed)",
                }}
              >
                <Box
                  component={"img"}
                  src={imagesMetamask?.arrowD}
                  alt="..."
                  width={15}
                  height={15}
                />
                <Box
                  component={"div"}
                  className="text-white ms-2 cursor-pointer"
                  onClick={handleInstall}
                >
                  Install MetaMask Extension
                </Box>
              </Box>
            </Box>
          </Box>
        ) : count >= 1 ? (
          <Box component={"div"}>
            <Box className="text-center text-white" component={"div"}>
              Qr code will be lost after{" "}
              <span className="text-info"> {count}s</span>
            </Box>
            {width < 576 && (
              <Box
                component={"div"}
                className="d-flex justify-content-center"
                sx={{
                  color: "#857cab",
                }}
              >
                If on mobile click{" "}
                <a
                  className="ms-2"
                  href={`https://metamask.app.link/dapp/${process.env.REACT_APP_URL_DOMAIN}/api/payments/deposit/check-qr/${depositData?.transaction_id}?token=${userId}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  {" "}
                  here
                </a>
              </Box>
            )}
            {count >= 1 && (
              <Box
                hidden={count < 1}
                component={"div"}
                className={
                  count >= 1 ? "d-flex justify-content-center" : "d-none"
                }
              >
                <QRCode
                  size={1000}
                  style={{
                    height: "auto",
                    maxWidth: "50%",
                    width: "100%",
                    marginTop: "10px",
                  }}
                  value={`https://metamask.app.link/dapp/${process.env.REACT_APP_URL_DOMAIN}/api/payments/deposit/check-qr/${depositData?.transaction_id}?token=${userId}`}
                  viewBox={`0 0 256 256`}
                />
              </Box>
            )}

            <Box component={"div"} className="mt-3 mb-5 pt-1">
              <Box className="mt-2" component={"div"}>
                <Typography
                  className=""
                  sx={{ color: "#857cab", fontSize: "12px" }}
                >
                  Scan to connect and sign with
                </Typography>
                <Typography
                  className="mt-2"
                  sx={{ color: "#fff", fontSize: "14px" }}
                >
                  MetaMask Mobile App
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box className="text-white text-center mb-4">Qr Code Expired !</Box>
        )}
      </Box>
    </Dialog>, document.body
  );
}
