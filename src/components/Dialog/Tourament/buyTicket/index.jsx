import {
  Box,
  CssBaseline,
  Dialog,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _socket from "../../../../redux-saga-middleware/config/socket";
import { toggleBuyTicket } from "../../../../redux-saga-middleware/reducers/tournamentReducer";
import { toggleCheckWallet } from "../../../../redux-saga-middleware/reducers/walletReducer";
import { sliceString } from "../../../../utils/helper";
import { images } from "../../../../utils/images";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import { CalculateDistance } from "../../../CountDownTimer/utils/CalculateDistance";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // "@font-face": {
        //   fontFamily: "Cyntho Next",
        //   src: `url(${InspirationTTF}) format("truetype")`,
        // },
      },
    },
  },
});
//-----------

//----------
export default function BuyTicket(props) {
  const { isBuyTicket } = useSelector((state) => state.tournamentReducer);
  const { listPackage } = useSelector((state) => state.appReducer);
  console.log(listPackage);
  const [ticketBuy, setTicketBuy] = useState([]);
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const { dataTime, nameTour } = props;
  //-------------
  const [hours, setHour] = useState(null);
  const [minutes, setMinute] = useState(null);
  const [days, setDay] = useState(null);

  useEffect(() => {
    let countdownDate = new Date(moment(lastMomentOfToday)).getTime();
    let timeNow = new Date().getTime();
    setHour(CalculateDistance(countdownDate, timeNow).hours);
    setMinute(CalculateDistance(countdownDate, timeNow).minutes);
    setDay(CalculateDistance(countdownDate, timeNow).days);
  }, []);

  const getLastMomentOfToday = () => {
    const today = new Date();
    const lastMomentOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0, -1);
    return lastMomentOfToday;
  };

  const lastMomentOfToday = getLastMomentOfToday();
  //-------------
  const handleClose = () => {
    dispatch(toggleBuyTicket(false));
  };
  useEffect(() => {
    if (socket && ticketBuy) {
    }
  }, [socket, ticketBuy]);

  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
    const tP = listPackage.filter((i) => i.packageName === "Ticket Play");
    setTicketBuy(tP && tP?.length > 0 ? tP[0] : null);
  }, [listPackage, setSocket, setTicketBuy]);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dialog
        sx={{ zIndex: "1321",  }}
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
            maxWidth:"410px !important"
          }}
        >
          <Box
            sx={{
              height: "44px",
              width: "100%",
              boxSizing: "border-box",
              padding: "5px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: width > 576 ? "flex-end" : "none",
            }}
          >
            {width < 576 && (
              <Box
                onClick={() => {
                  dispatch(toggleBuyTicket(false));
                }}
                sx={{ width: "14px" }}
                component={"img"}
                src={images.BackButtonLobby}
              ></Box>
            )}

            {width > 576 && (
              <Box
                onClick={handleClose}
                sx={{ width: "14px", cursor: "pointer" }}
                component={"img"}
                src={images.closeButton}
              ></Box>
            )}
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Typography
              sx={{
                color: "#ffff",
                textAlign: "start",
                fontWeight: "lighter !important",
                fontSize: "20px",
                marginLeft: "0px !important",
              }}
            >
              Buy Extra
            </Typography>
          </Box>
          <Box
            sx={{
              padding: width < 576 ? "3vh 40px 0px 40px" : "40px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              backgroundColor: "#211D28",
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
                position: "relative",
              }}
            >
              <Box
                sx={{
                  width: width < 576 ? "100%" : "290px",
                  height: "178px",
                  borderRadius: "16px",
                  backgroundImage: `url(${images.bannerbuyticket})`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "Center",
                }}
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  color={"white"}
                >
                  <Typography
                    sx={{ fontSize: "30px", marginLeft: "0px !important" }}
                  >
                    1 EXTRA
                  </Typography>
                  <Typography
                    sx={{ fontSize: "30px", marginLeft: "0px !important" }}
                  >
                    $ 0.99
                  </Typography>
                </Box>
              </Box>

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
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Expired in
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#7848ED",
                      }}
                    >
                    
                    {hours} hours {minutes} minutes
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

                            textAlign: "start",
                            marginTop: "5px",
                          }}
                        >
                          {moment(dataTime || new Date())?.format("MM/DD/YYYY")}
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

                            textAlign: "start",
                            marginTop: "5px",
                          }}
                        >
                          {moment(dataTime || new Date())?.format("HH:mm")} PM
                        </Typography>
                      </Box>
                    </Box>
                    <Box display={"flex"} flexDirection={"column"} className="mt-3">
                      <Typography sx={{ fontSize: "14px", wordWrap:"break-word", textAlign:"center" }}>
                        1 extra entry for all available promotions on the
                        website,
                      </Typography>
                      <Typography sx={{ fontSize: "14px", color: "#7848ED", textAlign:"center" }}>
                        excluding VIP Promotions.
                      </Typography>
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
              onClick={() => {
                dispatch(toggleCheckWallet({ type: "buyTicket" }));
                // if (!bought) {
                //   socket?.emit("buyPackage", {
                //     price: 0.5,
                //     tournamentId: tournamentId,
                //     packageId: ticketBuy?.id,
                //   });
                // } else {
                //   socket?.emit("buyPackage", {
                //     price: 0.5,
                //     tournamentId: tournamentId,
                //     packageId: ticketBuy?.id,
                //   });
                // }
                handleClose();
              }}
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
                Buy Extra
              </Typography>
            </button>
          </Box>
        </Box>
      </Dialog>
    </ThemeProvider>
  );
}
