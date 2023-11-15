import { Box, Grid, Typography } from "@mui/material";
import { images } from "../../../../utils/images";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import "./index.scss";
// import FullScreenDialog from "../../../FullScreenDialog";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { showToastNotification } from "../../../../redux-saga-middleware/reducers/alertReducer";
import { getPaypal } from "../../../../redux-saga-middleware/reducers/payPalReducer";
import { getStripe } from "../../../../redux-saga-middleware/reducers/stripeReducer";
import { toggleWalletDialog } from "../../../../redux-saga-middleware/reducers/walletReducer";
import { formatMoney, getAppType } from "../../../../utils/helper";
import { systemNotification } from "../../../../utils/notification";
import AnimButton from "../../../AnimButton";

export default function WalletTypePromote(props) {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const userGold = user?.userGold || 0;
  const { price } = useSelector((state) => state.walletReducer);
  const [amount, setAmount] = useState(0);
  const [typePayment, setTypePayment] = useState("stripe");
  const [currency, setCurrency] = useState("USD");
  const [agree, setAgree] = useState(false);
  const [bgInput, setBgInput] = useState("gray");
  const { listSetting } = useSelector((state) => state.settingReducer);
  const { isFetchStripe } = useSelector((state) => state.stripeReducer);
  const { isFetchPayPal } = useSelector((state) => state.payPalReducer);

  useEffect(() => {
    setAmount(Math.ceil(price));
  }, [price]);

  const navigate = useNavigate();

  const handleContinue = () => {
    if (!listSetting?.paymentEnabled) {
      dispatch(
        showToastNotification({
          type: systemNotification.maintenance.serviceClose.type,
          message: systemNotification.maintenance.serviceClose.message,
        })
      );
    } else {
      if (!agree) {
        toast.warning("Please agree policy!", {
          icon: ({ theme, type }) => (
            <img
              style={{ width: "20px", marginRight: "10px" }}
              alt="..."
              src={images.WarningIcon}
            />
          ),
          position: "top-center",
          className:
            width < 576 ? "warning-background-small" : "warning-background",
        });
        return;
      }
      if (!amount || amount < 0) {
        toast.warning("Please enter amount", {
          icon: ({ theme, type }) => (
            <img
              style={{ width: "20px", marginRight: "10px" }}
              alt="..."
              src={images.WarningIcon}
            />
          ),
          position: "top-center",
          className:
            width < 576 ? "warning-background-small" : "warning-background",
        });
      } else if (typePayment === "stripe" && currency === "USD") {
        dispatch(getStripe(Number.parseFloat(amount)));
      } else if (typePayment === "paypal" && currency === "USD") {
        dispatch(getPaypal(Number.parseFloat(amount)));
      } else {
        toast.warning("Updating...!", {
          icon: ({ theme, type }) => (
            <img
              style={{ width: "20px", marginRight: "10px" }}
              alt="..."
              src={images.WarningIcon}
            />
          ),
          position: "top-center",
          className:
            width < 576 ? "warning-background-small" : "warning-background",
        });
      }
    }
  };

  useEffect(() => {
    if (amount === "") {
      setBgInput("red");
    } else {
      setBgInput("gray");
    }
  }, [amount]);

  const handleKeyPress = (event) => {
    // Allow digits (0-9) and backspace (keyCode 8)
    if (event.key === "+" || event.key === "-") {
      event.preventDefault();
    }
  };

  const navigateFooter = (value) => {
    dispatch({
      type: "SET_TAB_HELPCENTER",
      payload: value,
    });
    navigate("/help-center");
    dispatch(toggleWalletDialog());
  };

  return (
    <>
      <Box
        className="position-relative wallet-type-promote"
        sx={{
          backgroundColor: "#271C39",
          width: "100%",
          // overflow: "auto",
          // height:"100%",
          // minHeight: width < 576 ? "100vh" : "unset",
          // maxHeight: width < 576 ? "unset" : height - 100,
        }}
      >
        {/* <FullScreenDialog /> */}
        {getAppType() === "promote" ? (
          <Box
            component={"div"}
            sx={{
              width: "100%",
              padding: "25px 25px 25px 25px",
              // overflowY: "auto",
              // height:"100vh"
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
                  dispatch(toggleWalletDialog());
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
                  className="me-2 ms-4 text-white"
                  sx={{
                    fontWeight: "lighter !important",
                  }}
                >
                  Wallet
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
                  Current Balance
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
              <Typography>Deposit</Typography>
            </Box>
            <Box
              sx={{
                paddingBottom: "20px",
                paddingTop: "20px",
              }}
            >
              <Grid container columnSpacing={1}>
                <Grid item xs={5}>
                  <form action="" className="d-flex flex-column">
                    <Typography
                      variant="subtitle1"
                      htmlFor=""
                      className="text-white pb-2"
                      sx={{
                        fontSize: "13px",
                        fontWeight: "lighter !important",
                        marginLeft: "0px !important",
                      }}
                    >
                      Currency
                    </Typography>
                    <select
                      defaultValue="stripe"
                      className="custom-select"
                      onChange={(e) => {
                        setCurrency(e.target.value);
                      }}
                      style={{
                        borderRadius: "7px",
                        border: "1px solid gray",
                        height: "40px",
                        fontSize: "15px",
                        background: "transparent",
                        paddingLeft: "10px",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      <option value="USD" style={{ color: "#642CDA" }}>
                        USD
                      </option>
                    </select>
                  </form>
                </Grid>
                <Grid item xs={7}>
                  <form
                    onSubmit={(event) => event.preventDefault()}
                    action=""
                    className="d-flex flex-column"
                    style={{ position: "relative" }}
                  >
                    <Typography
                      variant="subtitle1"
                      className="text-white pb-2"
                      sx={{
                        fontSize: "13px",
                        fontWeight: "lighter !important",
                        marginLeft: "0px !important",
                      }}
                    >
                      Amount
                    </Typography>
                    <input
                      type="number"
                      className="walletPromote"
                      min="0"
                      onKeyPress={handleKeyPress}
                      value={amount}
                      onChange={(e) => setAmount(e?.target?.value)}
                      style={{
                        borderRadius: "7px",
                        border: `1px solid ${bgInput}`,
                        height: "40px",
                        fontSize: "15px",
                        background: "#181223",
                        paddingLeft: "10px",
                        color: "white",
                      }}
                    />
                    {amount === 0 || amount === "" ? (
                      <span className="text-danger">
                        Please enter the amount.
                      </span>
                    ) : (
                      ""
                    )}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 37,
                        right: 8,
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="16"
                        fill="none"
                        viewBox="0 0 10 16"
                      >
                        <path
                          fill="#F0E9FF"
                          d="M4.413 15.454V.91h.932v14.545h-.932zM7.328 5.42a1.66 1.66 0 00-.75-1.25c-.44-.299-.992-.448-1.659-.448-.477 0-.89.075-1.239.227-.348.148-.619.352-.812.614-.19.257-.284.55-.284.88 0 .277.064.515.193.716.133.2.305.37.517.506.216.132.447.244.693.335.246.087.483.16.71.216l1.137.295c.371.091.752.214 1.142.37.39.155.752.36 1.085.613.333.254.602.569.807.944.208.374.312.823.312 1.346 0 .66-.17 1.244-.511 1.756-.337.511-.828.915-1.472 1.21-.64.296-1.414.443-2.323.443-.872 0-1.625-.138-2.262-.415-.636-.276-1.134-.668-1.494-1.176-.36-.511-.559-1.117-.597-1.818h1.762c.034.42.17.77.409 1.051.242.277.55.483.926.62.379.132.793.198 1.244.198.496 0 .938-.077 1.324-.232.39-.16.697-.38.92-.66.224-.284.336-.615.336-.994 0-.345-.099-.627-.296-.847a2.183 2.183 0 00-.79-.545 7.719 7.719 0 00-1.119-.38l-1.375-.376c-.932-.253-1.67-.627-2.216-1.119-.541-.492-.812-1.144-.812-1.955 0-.67.182-1.255.545-1.755.364-.5.856-.888 1.478-1.165.62-.28 1.321-.42 2.102-.42.788 0 1.483.138 2.085.414.606.277 1.083.658 1.432 1.142.348.481.53 1.034.545 1.66H7.328z"
                        ></path>
                      </svg>
                    </Box>
                  </form>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                paddingBottom: "50px",
                paddingTop: "10px",
              }}
            >
              <Box className="text-white d-flex justify-content-between">
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "15px",
                    fontWeight: "lighter !important",
                  }}
                >
                  Deposit Amount
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "15px",
                    fontWeight: "lighter !important",
                  }}
                >
                  {userGold && userGold > 0
                    ? formatMoney(Number.parseFloat(amount === "" ? 0 : amount))
                    : 0}
                  USD
                </Typography>
              </Box>
              <Box
                className="text-white d-flex justify-content-between"
                sx={{ marginBottom: "20px" }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "12px",
                    color: "gray",
                    fontWeight: "lighter !important",
                  }}
                >
                  Limit
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "12px",
                    color: "gray",
                    fontWeight: "lighter !important",
                  }}
                >
                  $ 1-1000
                </Typography>
              </Box>
              <Box className="text-white d-flex justify-content-between">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "lighter !important",
                  }}
                >
                  Updated Balance
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "lighter !important" }}
                >
                  {userGold > 0
                    ? formatMoney(
                        Number.parseFloat(
                          userGold +
                            Number.parseFloat(amount === "" ? 0 : amount)
                        )
                      )
                    : 0}{" "}
                  USD
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                paddingTop: "10px",
                paddingBottom: "30px",
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
                      padding: "10px 15px",
                      backgroundColor: "#ffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderRadius: "8px",
                    }}
                  >
                    <img src={images.stripeLogo} alt="Paypal" />
                    <input
                      defaultChecked
                      name="wallet"
                      type="radio"
                      onClick={() => {
                        // setActveColor("activewl");
                        setTypePayment("stripe");
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: "45%",
                      padding: "10px 15px",
                      backgroundColor: "#ffff",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderRadius: "8px",
                    }}
                  >
                    <img src={images.payPalIcon} alt="Paypal" />
                    <input
                      name="wallet"
                      type="radio"
                      onClick={() => {
                        // setActveColor("activewl");
                        setTypePayment("paypal");
                      }}
                    />
                  </Box>{" "}
                </Box>
              </form>
            </Box>
            <Box
              className="d-flex align-items-start"
              sx={{
                paddingTop: "10px",
                paddingBottom: "30px",
              }}
            >
              <input
                type="checkbox"
                className="me-2 custom-checkbox-input"
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
              </Box>
            </Box>
            <Box>
              {amount === "" || agree === false ? (
                <AnimButton type="disable" text="CONTINUE" isHasIcon />
              ) : isFetchStripe || isFetchPayPal ? (
                <AnimButton
                  text="CONTINUE"
                  onClick={handleContinue}
                  type="loading"
                  isHasIcon
                />
              ) : (
                <AnimButton
                  text="CONTINUE"
                  onClick={handleContinue}
                  type="primary"
                  isHasIcon
                />
              )}
            </Box>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </>
  );
}
