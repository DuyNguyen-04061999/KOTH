import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, Dialog, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _socket from "../../../redux-saga-middleware/config/socket";
import { getCheckOut } from "../../../redux-saga-middleware/reducers/checkoutReducer";
import {
  closeCheckWallet,
  toggleCheckWallet,
} from "../../../redux-saga-middleware/reducers/walletReducer";
import { formatMoney } from "../../../utils/helper";
import { images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import AnimButton from "../../AnimButton";
import "./index.scss";

export default function TicketCheckOut() {
  const { isCheckWallet, typeWallet, goldCombo, totalExtra } = useSelector(
    (state) => state.walletReducer
  );
  const { idPackage } = useSelector((state) => state.authReducer);
  const { listPackage } = useSelector((state) => state.packageReducer);
  const [feeCheckout, setFeeCheckout] = useState({
    origin: 4.4 / 100,
    bonus: 0.3,
  });
  const [typePayment, setTypePayment] = useState("paypal");
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [agree, setAgree] = useState(false);
  const [feeMoney, setFeeMoney] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [sl, setSl] = useState(1);
  useEffect(() => {
    if (typePayment === "skrill") {
      setFeeCheckout({
        origin: 4.4,
        bonus: 0.3,
      });
    } else if (typePayment === "paypal") {
      setFeeCheckout({
        origin: 4.4,
        bonus: 0.3,
      });
    }
  }, [typePayment]);

  useEffect(() => {
    if (feeCheckout) {
      const mn =
        Number((feeCheckout?.origin * (sl * goldCombo)) / 100) +
        Number(feeCheckout?.bonus);
      setFeeMoney(mn);
      setTotalMoney(Number(sl * goldCombo + mn));
    }
  }, [sl, goldCombo, feeCheckout]);

  const handleChangeValue = (e) => {
    setSl(e.target.value);
  };
  const navigate = useNavigate();

  const cancelButton = () => {
    dispatch(closeCheckWallet(false));
  };

  const navigateFooter = (value) => {
    dispatch({
      type: "SET_TAB_HELPCENTER",
      payload: value,
    });
    navigate("/help-center");
    dispatch(toggleCheckWallet());
  };

  const btnSubscription = (event) => {
    event.currentTarget.disabled = true;
      dispatch(
          getCheckOut({
            packageId: idPackage,
            quantity: sl,
            type: typePayment,
            price: Number(totalMoney)?.toFixed(2)
          })
        );
      setSl(1);
      // dispatch(toggleCheckWallet());
  };
  const btnBuyTicket = (event) => {
    event.currentTarget.disabled = true;
      dispatch(
       getCheckOut({
        packageId: idPackage,
        quantity: sl,
        type: typePayment,
        price: Number(totalMoney)?.toFixed(2)
       })
      );
      setSl(1);
      // dispatch(toggleCheckWallet());
  };

  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, [listPackage, setSocket]);

  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, [socket]);
  useEffect(() => {}, [socket]);

  return createPortal(
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
          dispatch(closeCheckWallet(false));
          setSl(1);
        }}
      >
        <Box
          sx={{
            backgroundColor: "#271C39",
            width: "100%",
            height: "100%",
            overflow: "auto",
          }}
        >
          <Box
            component={"div"}
            sx={{
              width: "100%",
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
                  setSl(1);
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
              sx={{
                paddingBottom: "20px",
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
                        {typeWallet === "subscription" ? "Subscription Pack" : typeWallet === "combo1" ? "Standard Extra Pack" : "Value Extra Pack"}
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
                    <Typography
                      sx={{ color: "#BE48ED", textAlign: "end" }}
                      variant="body2"
                    >
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
                          : false ||
                            typeWallet === "combo1" ||
                            typeWallet === "combo2"
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
                            : "" ||
                              typeWallet === "combo1" ||
                              typeWallet === "combo2"
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
                            : "" ||
                              typeWallet === "combo1" ||
                              typeWallet === "combo2"
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
                            : "" ||
                              typeWallet === "combo1" ||
                              typeWallet === "combo2"
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
              sx={{
                paddingTop: "10px",
                paddingBottom: "10px",
                position: "relative",
              }}
            >
              <form
                action=""
                className="d-flex flex-column"
                style={{ position: "relative" }}
              >
                <Typography
                  variant="subtitle1"
                  className="text-white mb-2"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "lighter !important",
                    marginLeft: "0px !important",
                  }}
                >
                  Payment method
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {" "}
                  <Box
                    sx={{
                      width: "45%",
                      padding: "5px 15px",
                      backgroundColor: "#ffff",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderRadius: "8px",
                    }}
                  >
                    <img src={images.payPalIcon} alt="Paypal" />
                    <input
                      defaultChecked
                      name="wallet"
                      type="radio"
                      onClick={() => {
                        // setActveColor("activewl");
                        setTypePayment("paypal");
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: "45%",
                      padding: "5px 15px",
                      backgroundColor: "#ffff",
                      opacity: 0.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderRadius: "8px",
                    }}
                  >
                    <Box component={"img"} src={images.skrillIcon} />
                    <Box>
                      <Typography sx={{ fontSize: "14px" }}>
                        (Coming soon)
                      </Typography>
                    </Box>
                  </Box>{" "}
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
            <Box
              className="mt-4 mb-2"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
              }}
            >
              <Typography sx={{ fontSize: "14px" }}>
                {typeWallet === "subscription" ? "Subscription Pack x 1" : "Combo Pack x 1"}
              </Typography>
              <Typography sx={{ color: "white", fontSize: "14px" }}>
                  {" "}
                  ${formatMoney(Number.parseFloat(sl * goldCombo))}
                </Typography>
            </Box>
            <Box
              className="mt-2 mb-2"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
              }}
            >
              <Typography sx={{ fontSize: "14px" }}>
                Processing Fee
                {feeCheckout && (
                  <Box component={"span"} className="ms-2" sx={{
                    color: "#A89CD7",
                    fontSize: "12px"
                  }}>
                    {"(" + feeCheckout?.origin + "%"} + {"$"}{feeCheckout?.bonus + ")"}
                  </Box>
                )}
                </Typography>
              <Typography sx={{ color: "white", fontSize: "14px", }}>
                ${feeCheckout ? feeMoney?.toFixed(2) : 0}
              </Typography>
            </Box>
            <Box
              className="mt-3 mb-2"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
              }}
            >
              <Typography sx={{ fontSize: "18px" }}>Total payment</Typography>
              <Typography sx={{ color: "#BF48ED", fontSize: "18px", fontWeight: 600  }}>
                {" "}
                {feeCheckout ? (Number((sl*goldCombo) + feeMoney)).toFixed(2) : 0}
              </Typography>
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
              className="d-flex align-items-start"
              sx={{
                paddingTop: "10px",
                paddingBottom: "30px",
              }}
            >
              <input
                type="checkbox"
                className="me-2 custom-checkbox-input checkout checkboxtext"
                style={{ borderRadius: "50px", marginTop: "6px" }}
                readOnly
                onClick={() => {
                  setAgree(!agree);
                }}
                checked={agree}
              />
              <Box
                className="text-white"
                sx={{ fontSize: "14px", fontWeight: "lighter !important" }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "lighter !important",
                    fontSize: "14px",
                    marginLeft: "0px !important",
                    color: agree === false ? "red" : "white",
                  }}
                >
                  I agree with Play4promo{" "}
                  <span
                    className="cursor-pointer"
                    onClick={() => navigateFooter(1)}
                    style={{
                      color: "#FF9F38",
                      fontSize: "14px",
                      fontWeight: "lighter !important",
                      cursor: "pointer",
                    }}
                  >
                    Terms & Agreement
                  </span>{" "}
                  services.
                </Typography>
                <Box
                  sx={{
                    width: "350px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#7848ED",
                    }}
                  >
                    Persons under the age of 18 should use this Website only
                    with the supervision of an Adult. Payment Information must
                    be provided by or with the permission of an Adult.
                  </span>
                </Box>
              </Box>
            </Box>
            <Box className="mt-2 mb-4">
              <Grid container columnSpacing={2}>
                <Grid item xs={6} md={6}>
                  <AnimButton
                    onClick={cancelButton}
                    text="Cancel"
                    type="ghost"
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  {agree === false ? (
                    <AnimButton type="disable" text="Place Order" />
                  ) : (
                    <>
                      {typeWallet === "subscription" ? (
                        <AnimButton
                          type="primary"
                          onClick={btnSubscription}
                          text="Place Order"
                        />
                      ) : (
                        <AnimButton
                          onClick={btnBuyTicket}
                          text="Place Order"
                          type="primary"
                        />
                      )}
                    </>
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
