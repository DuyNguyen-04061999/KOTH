import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, Dialog, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import _socket from "../../../redux-saga-middleware/config/socket";
import {
  closeCheckWallet,
  toggleCheckWallet,
  toggleWalletDialog
} from "../../../redux-saga-middleware/reducers/walletReducer";
import { formatMoney } from "../../../utils/helper";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import AnimButton from "../../AnimButton";
import "./index.scss";

export default function TicketCheckOut() {
  const { isCheckWallet, typeWallet,goldCombo,totalExtra } = useSelector(
    (state) => state.walletReducer
  );
  const { idPackage } = useSelector((state) => state.authReducer);
  const { userGold } = useSelector((state) => state.authReducer);
  const { boughtTour } = useSelector(
    (state) => state.tournamentReducer
  );
  const { listPackage } = useSelector((state) => state.appReducer);
  const { width, height } = useWindowDimensions();
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [sl, setSl] = useState(1);
  const handleChangeValue = (e) => {
    setSl(e.target.value);
  };

  const cancelButton = () => {
    dispatch(closeCheckWallet(false))
  };

  const btnSubscription = (event) => {
      event.currentTarget.disabled = true;
    if (userGold < 19.99) {
      dispatch(toggleCheckWallet());
      dispatch(toggleWalletDialog(19.99));
    } else {
      socket.emit("buyNewPackage", {
        packageId: idPackage,
      });
      dispatch(toggleCheckWallet());
    }
  };

  const btnBuyTicket = (event) => {
      event.currentTarget.disabled = true;
      let price = typeWallet === "combo1" ? 0.99*sl : 3.96*sl
    if (userGold < price) {
      dispatch(toggleCheckWallet());
      dispatch(toggleWalletDialog(price));
    } else if (!boughtTour) {
      socket?.emit("buyNewPackage", {
        packageId: idPackage,
        quantityExtra: sl
      });
      dispatch(toggleCheckWallet());
    } else {
      socket?.emit("buyNewPackage", {
        packageId: idPackage,
        quantityExtra: sl
      });
      dispatch(toggleCheckWallet());
    }
  };

  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, [listPackage, setSocket]);

  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, [socket]);
  useEffect(() => {
    socket?.on("buyNewPackageSuccessfully", (data) => {
      
    });
  }, [socket]);

  return ReactDOM.createPortal(
    <>
      <Dialog
        open={isCheckWallet}
        fullScreen={width < 576}
        sx={{
          "& .css-1hju3x6-MuiPaper-root-MuiDialog-paper": {
            borderRadius: "11px !important",
          },
          zIndex: "1320",
        }}
        maxWidth="2000px !important"
        onClose={() => {
          dispatch(closeCheckWallet(false))
          setSl(1)
        }
        }
      >
        <Box
          sx={{
            backgroundColor: "#271C39",
            width: "100%",
            height: "100%",
            overflow: "auto",
            minHeight: width < 576 ? "100vh" : "unset",
            maxHeight: width < 576 ? "unset" : height - 100,
          }}
        >
          <Box
            component={"div"}
            sx={{
              width: "100%",
              height: "100vh",
              padding: "25px 25px 0px 25px",
              overflowY: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "end",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 20 20"
                className={"cursor-pointer"}
                onClick={() => {
                  dispatch(closeCheckWallet(false));
                  setSl(1)
                }}
              >
                <g fill="#fff">
                  <path d="M20 2.5L2.5 20 0 17.5 17.5 0 20 2.5z"></path>
                  <path d="M17.5 20L0 2.5 2.5 0 20 17.5 17.5 20z"></path>
                </g>
              </svg>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box className="text-white d-flex justify-content-center align-items-center">
                <Typography
                  variant="h6"
                  className="me-2 ms-2 text-white"
                  sx={{
                    fontWeight: "lighter !important",
                  }}
                >
                  Check Out
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                paddingBottom: "20px",
                paddingTop: "20px",
              }}
            >
              <form action="" className="d-flex flex-column">
                <Typography
                  variant="subtitle1"
                  className="text-white pb-2"
                  sx={{
                    fontSize: "13px",
                    fontWeight: "lighter !important",
                    marginLeft: "0px !important",
                  }}
                >
                  My wallet
                </Typography>
                <Box
                  sx={{
                    position: "relative",
                  }}
                >
                  <input
                    type="text"
                    className="w-100 walletPromote"
                    disabled
                    defaultValue={
                      userGold &&
                      Number.parseFloat(userGold) > 0 &&
                      formatMoney(Number.parseFloat(userGold))
                    }
                    style={{
                      borderRadius: "7px",
                      border: "2px solid #5428B2",
                      height: "60px",
                      fontSize: "15px",
                      background: "transparent",
                      paddingLeft: "10px",
                      color: "white",
                    }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="none"
                    viewBox="0 0 30 30"
                    style={{
                      position: "absolute",
                      top: 15,
                      right: 20,
                    }}
                  >
                    <g>
                      <path
                        fill="#FFE14D"
                        d="M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15z"
                      ></path>
                      <path
                        fill="#FB3"
                        d="M30 15c0-8.271-6.729-15-15-15v30c8.271 0 15-6.729 15-15z"
                      ></path>
                      <g>
                        <g>
                          <path
                            fill="#FB3"
                            d="M15 26.426C8.7 26.426 3.574 21.3 3.574 15S8.7 3.574 15 3.574 26.426 8.7 26.426 15 21.3 26.426 15 26.426z"
                          ></path>
                        </g>
                      </g>
                      <path
                        fill="#E68A2E"
                        d="M26.426 15C26.426 8.7 21.3 3.574 15 3.574v22.852c6.3 0 11.426-5.126 11.426-11.426z"
                      ></path>
                      <g>
                        <path
                          fill="#FFE14D"
                          d="M15.879 14.181v-3.474c1.01.248 1.758.898 1.758 1.645a.878.878 0 101.758 0c0-1.698-1.512-3.117-3.516-3.444v-.95a.878.878 0 10-1.758 0v.95c-2.004.327-3.516 1.746-3.516 3.444 0 1.699 1.512 3.118 3.516 3.445v3.475c-1.01-.248-1.758-.898-1.758-1.646a.878.878 0 10-1.758 0c0 1.698 1.512 3.118 3.516 3.444v.96a.878.878 0 101.758 0v-.96c2.004-.326 3.516-1.746 3.516-3.444s-1.512-3.118-3.516-3.445zm-3.516-1.829c0-.747.747-1.397 1.758-1.646V14c-1.01-.248-1.758-.899-1.758-1.647zm3.516 6.92V15.98c1.01.248 1.758.898 1.758 1.646 0 .748-.747 1.398-1.758 1.646z"
                        ></path>
                      </g>
                      <path
                        fill="#FB3"
                        d="M15.879 22.031v-.959c2.004-.326 3.516-1.746 3.516-3.444s-1.512-3.118-3.516-3.445V10.71c1.01.248 1.758.898 1.758 1.646a.878.878 0 101.758 0c0-1.699-1.512-3.119-3.516-3.445v-.95A.878.878 0 0015 7.081V22.91a.878.878 0 00.879-.879zm0-6.05c1.01.249 1.758.9 1.758 1.647s-.747 1.398-1.758 1.646v-3.292z"
                      ></path>
                    </g>
                  </svg>
                </Box>
              </form>
            </Box>
            <hr
              style={{
                color: "white",
                border: "2",
                background: "white",
                borderColor: "white",
                height: "1px",
              }}
            />
            <Box className=" text-white text-center pt-2 pb-1">
              <Typography>Product</Typography>
            </Box>
            <Box
              sx={{
                paddingBottom: "50px",
                paddingTop: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ color: "white" }}>
                  {typeWallet === "subscription" ? (
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"start"}
                    >
                      <Typography
                        className="mb-1"
                        sx={{ marginLeft: "0px !important", color: "#BE48ED " }}
                      >
                        Subscription Pack
                      </Typography>
                      <Typography
                        sx={{
                          marginLeft: "0px !important",
                          textAlign: "start",
                          fontSize: "14px",
                        }}
                      >
                        Total Extra: 4 Free Extra/day
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"start"}
                    >
                      <Typography
                        className="mb-1"
                        sx={{
                          marginLeft: "0px !important",
                          color: "#BE48ED ",
                        }}
                      >
                        Standard Extra Pack
                      </Typography>
                      <Typography
                        sx={{
                          marginLeft: "0px !important",
                          textAlign: "start",
                          fontSize: "14px",
                        }}
                      >
                        Total Extra: {totalExtra * sl} Extra
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box>
                  <Box>
                  <Typography sx={{ color: "#BE48ED", textAlign:"end" }} variant="body2">
                    {typeWallet === "subscription"
                      ? "$19.99"
                      : `$${goldCombo}`}
                  </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <Button
                      variant="contained"
                      disabled={
                        typeWallet === "subscription"
                          ? true
                          : false || typeWallet === "combo1" || typeWallet === "combo2"
                          ? false
                          : true
                      }
                      onClick={() => {
                        if (sl <= 1) {
                        } else {
                          setSl(sl - 1);
                        }
                      }}
                      sx={{
                        color: "white",
                        backgroundColor:
                          typeWallet === "subscription"
                            ? "gray !important"
                            : "" || typeWallet === "combo1" || typeWallet === "combo2"
                            ? "#7848ED"
                            : "",
                        borderRadius: "0px",
                        padding: "0px",
                        minWidth: "auto",
                        width: "30px",
                        height: "30px",
                        "&:hover": {
                          backgroundColor: "#7848ED",
                        },
                      }}
                    >
                      <RemoveIcon />
                    </Button>
                    <input
                      type="number"
                      className="input_check"
                      max={4}
                      min={1}
                      disabled={
                        typeWallet === "subscription" ||
                        typeWallet === "combo1" ||
                        typeWallet === "combo2"
                      }
                      onChange={handleChangeValue}
                      style={{
                        backgroundColor:
                          typeWallet === "subscription"
                            ? "#3D2D53"
                            : "" || typeWallet === "combo1" || typeWallet === "combo2"
                            ? "#181223"
                            : "",
                      }}
                      value={sl}
                    />
                    <Button
                      variant="contained"
                      disabled={typeWallet === "subscription"}
                      onClick={() => {
                        if (sl > 3) {
                        } else {
                          setSl(sl + 1);
                        }
                        // setTotalGold(sl * goldTicket)
                      }}
                      sx={{
                        color: "white",
                        backgroundColor:
                          typeWallet === "subscription"
                            ? "gray !important"
                            : "" || typeWallet === "combo1" || typeWallet === "combo2"
                            ? "#7848ED !important"
                            : "",
                        borderRadius: "0px",
                        padding: "0px",
                        minWidth: "auto",
                        width: "30px",
                        height: "30px",
                        "&:hover": {
                          backgroundColor: "gray",
                        },
                      }}
                    >
                      <AddIcon />
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
            <hr
              style={{
                color: "white",
                border: "2",
                background: "white",
                borderColor: "white",
                height: "1px",
              }}
            />
            <Box>
              <Typography className="text-white mb-2">Voucher</Typography>
              <Box className={"d-flex"}>
                <input type="text" className="input_voucher" />
                <Button
                  sx={{
                    padding: "12px 40px 12px 39px",
                    borderRadius: "8px",
                    background:
                      "linear-gradient(0deg, #7848ED 0%, #7848ED 100%), linear-gradient(180deg, #893BF1 0%, #7947EE 100%)",
                    color: "white",
                    marginLeft: "20px",
                    textTransform: "none",
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
            <hr
              style={{
                color: "white",
                border: "2",
                background: "white",
                borderColor: "white",
                height: "1px",
              }}
            />
            <Box
              className="mt-4 mb-4"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
              }}
            >
              <Typography>Total payment</Typography>
              {typeWallet === "combo1" || typeWallet === "combo2" ? (
                <Typography sx={{ color: "#BF48ED" }}>
                  {" "}
                  ${formatMoney(Number.parseFloat(sl * goldCombo))}
                </Typography>
              ) : (
                <Typography sx={{ color: "#BF48ED" }}>$ 19.99</Typography>
              )}
            </Box>
            <Box
              className="mt-4 mb-4"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
              }}
            >
              {typeWallet === "combo1" || typeWallet === "combo2" ? (
                <Typography>Your curent balance</Typography>
              ) : (
                <Typography>Your curent balance</Typography>
              )}
              {typeWallet === "subscription" ? (
                <Typography>
                  ${formatMoney(Number.parseFloat(userGold)) - 19.99}
                </Typography>
              ) : (
                <Typography>
                  ${" "}
                  {formatMoney(
                    Number.parseFloat(
                      userGold - Number(sl) * Number(goldCombo)
                    )
                  )}
                </Typography>
              )}
            </Box>
            <Box>
              <Grid container columnSpacing={2}>
                <Grid item xs={6} md={6}>
                  <AnimButton
                    onClick={cancelButton}
                    text={"Cancel"}
                    type={"ghost"}
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  {typeWallet === "subscription" ? (
                    <AnimButton
                      type={"primary"}
                      onClick={btnSubscription}
                      text={"Place Order"}
                    />
                  ) : (
                    <AnimButton
                      onClick={btnBuyTicket}
                      text={"Place Order"}
                      type={"primary"}
                    />
                  )}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>,
    document.body
  );
}
