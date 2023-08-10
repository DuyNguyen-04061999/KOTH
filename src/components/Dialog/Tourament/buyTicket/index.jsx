import {
  Box,
  CssBaseline,
  Dialog,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React from "react";
import { images } from "../../../../utils/images";
import { useDispatch, useSelector } from "react-redux";
import { toggleBuyTicket } from "../../../../redux-saga-middleware/reducers/tournamentReducer";
import { useEffect } from "react";
import { useState } from "react";
import _socket from "../../../../redux-saga-middleware/config/socket";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import InspirationTTF from "../../../../assets/font/CynthoNextRegular.otf";
import InspirationTTF1 from "../../../../assets/font/CynthoNextBold.otf";

const theme = createTheme({
  typography: { fontFamily: "Cyntho Next, Cyntho Next Bold" },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@font-face": {
          fontFamily: "Cyntho Next",
          src: `url(${InspirationTTF}) format("truetype")`,
        },
        "@font-face": {
          fontFamily: "Cyntho Next Bold",
          src: `url(${InspirationTTF1}) format("truetype")`,
        },
      },
    },
  },
});
export default function BuyTicket(props) {
  const { isBuyTicket } = useSelector((state) => state.tournamentReducer);
  const { listPackage } = useSelector((state) => state.appReducer);
  const { type } = useSelector((state) => state.alertReducer);
  const [ticketBuy, setTicketBuy] = useState([]);
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const handleClose = () => {
    dispatch(toggleBuyTicket(false));
  };

  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
    const tP = listPackage.filter((i) => i.packageName === "Ticket Play");
    setTicketBuy(tP && tP?.length > 0 ? tP[0] : null);
  }, [listPackage]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dialog
        sx={{ zIndex: "1321" }}
        open={isBuyTicket}
        onClose={handleClose}
        fullScreen={width < 576 ? true : false}
      >
        <Box
          sx={{
            backgroundColor: "#211D28",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#42285B",
              height: "44px",
              width: "100%",
              boxSizing: "border-box",
              padding: "0px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: width > 576 ? "space-between" : "none",
            }}
          >
            {width < 576 && (
              <Box
                sx={{ width: "14px" }}
                component={"img"}
                src={images.BackButtonLobby}
              ></Box>
            )}
            <Typography sx={{ color: "#ffff", textAlign: "start" }}>
              Buy Ticket
            </Typography>
            {width > 576 && (
              <Box
                onClick={handleClose}
                sx={{ width: "14px", cursor: "pointer" }}
                component={"img"}
                src={images.closeButton}
              ></Box>
            )}
          </Box>
          <Box
            sx={{
              padding: width < 576 ? "80px 40px 150px" : "40px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "auto",
                background:
                  "linear-gradient(180deg, #A03AF1 21.35%, #7648ED 100%)",
                borderRadius: "16px",
                boxSizing: "border-box",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{ width: "100%", height: "auto", borderRadius: "16px" }}
                component={"img"}
                src={images.bannerbuyticket}
              ></Box>
              <Box
                sx={{
                  width: "100%",
                  height: "auto",
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                  marginTop: "20px",
                }}
              >
                <Box
                  component={"img"}
                  src={images.Rectangle}
                  sx={{ width: "100%", height: "auto", position: "absolute" }}
                ></Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "300px",
                    backgroundImage: `url(${images.backgroundPrize})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "92% 300px",
                    boxSizing: "border-box",
                    padding: "30px 28px",
                  }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{
                        color: "#8042EF",
                        fontSize: "16px",
                        fontFamily: "Cyntho Next Bold",
                      }}
                    >
                      Double Dragon
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "19px",
                        fontFamily: "Cyntho Next Bold",
                      }}
                    >
                      0.99$
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: "20px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box sx={{ width: "60%" }}>
                        {" "}
                        <Typography
                          sx={{
                            color: "#9CA3AF",
                            fontSize: "12px",
                            textAlign: "start",
                          }}
                        >
                          Date
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            color: "#111827",
                            fontFamily: "Cyntho Next Bold",
                            textAlign: "start",
                            marginTop: "5px",
                          }}
                        >
                          29-01-2023
                        </Typography>
                      </Box>
                      <Box sx={{ width: "40%" }}>
                        {" "}
                        <Typography
                          sx={{
                            color: "#9CA3AF",
                            fontSize: "12px",
                            textAlign: "start",
                          }}
                        >
                          Time
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            color: "#111827",
                            fontFamily: "Cyntho Next Bold",
                            textAlign: "start",
                            marginTop: "5px",
                          }}
                        >
                          10:00 PM{" "}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "15px",
                      }}
                    >
                      <Box sx={{ width: "60%" }}>
                        {" "}
                        <Typography
                          sx={{
                            color: "#9CA3AF",
                            fontSize: "12px",
                            textAlign: "start",
                          }}
                        >
                          1 ticket
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            color: "#111827",
                            fontFamily: "Cyntho Next Bold",
                            textAlign: "start",
                            marginTop: "5px",
                          }}
                        >
                          1 gameplay{" "}
                        </Typography>
                      </Box>
                      <Box sx={{ width: "40%" }}>
                        {" "}
                        <Typography
                          sx={{
                            color: "#9CA3AF",
                            fontSize: "12px",
                            textAlign: "start",
                          }}
                        >
                          Next purchase{" "}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            color: "#111827",
                            fontFamily: "Cyntho Next Bold",
                            textAlign: "start",
                            marginTop: "5px",
                          }}
                        >
                          2.99 ${" "}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    component={"img"}
                    src={images.QRCodeTicket}
                    sx={{
                      width: "81.15%",
                      position: "absolute",
                      bottom: "12px",
                      left: "10%",
                    }}
                  ></Box>
                </Box>
              </Box>
            </Box>
            <button
              style={{
                border: "none",
                outline: "none",
                background: "linear-gradient(180deg, #7848ED 0%, #7648ED 100%)",
                padding: "15px",
                width: "100%",
                borderRadius: "5px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "40px",
              }}
            >
              <img
                alt="..."
                src={images.ticketIcon}
                style={{ width: "24px", height: "24px" }}
              />
              <Typography sx={{ color: "#fff", textAlign: "start" }}>
                Buy Ticket
              </Typography>
            </button>
          </Box>
        </Box>
      </Dialog>
    </ThemeProvider>
  );
}
{
  /* <Dialog
  open={isBuyTicket}
  onClose={handleClose}
  sx={{
    "& .css-hz1bth-MuiDialog-container": {
      width: "100%",
    },
    "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
      width: "100%",
      borderRadius: 0,
      maxWidth: "500px",
    },
  }}
>
  <Box
    sx={{
      width: "100%",
      borderRadius: 0,
      backgroundColor: "#2e233d",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: "10px",
        paddingTop: "10px",
        backgroundColor: "#37285C",
        color: "white",
        paddingLeft: "15px",
        paddingRight: "15px",
      }}
    >
      <Typography variant="h5">Buy Ticket1</Typography>
      <Box>
        <CloseOutlined onClick={handleClose} className="cursor-pointer" />
      </Box>
    </Box>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img src={popup.ticket} alt="..." width={250} />
      <Box className="p-5 text-white">
        <p> Each ticket equals one gameplay</p>
        <p> Initial purchase at $0.99.</p>
        <p> Subsequent purchases at $2.99</p>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "50px",
        }}
      >
        <button
          onClick={() => {
            socket.emit("buyPackage", {
              packageId: ticketBuy.id,
              tournamentId: id,
            });
            if (type === "errors") {
              dispatch(toggleBuyTicket(true));
            } else {
              dispatch(toggleBuyTicket(false));
            }
          }}
          style={{
            padding: "5px 15px",
            border: "none",
            borderRadius: "5px",
            background:
              "linear-gradient(0deg, rgba(138,57,240,1) 0%, rgba(116,73,237,1) 100%)",
            color: "white",
          }}
        >
          {ticketBuy?.packagePrice}
          <img
            src={images280423_l.gold}
            alt="..."
            width={13}
            height={13}
            className="ms-1"
          />
        </button>
      </Box>
    </Box>
  </Box>
</Dialog>; */
}
