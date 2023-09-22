import { Box, Grid, Typography } from "@mui/material";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import { popup } from "../../../../utils/images";
import "./index.scss";
// import FullScreenDialog from "../../../FullScreenDialog";
import { useDispatch, useSelector } from "react-redux";
import { getStripe } from "../../../../redux-saga-middleware/reducers/stripeReducer";
import { showAlert } from "../../../../redux-saga-middleware/reducers/alertReducer";
import { formatMoney, getAppType } from "../../../../utils/helper";
import { useState } from "react";

export default function WalletTypePromote(props) {
  const { handleClose } = props;
  const { width, height } = useWindowDimensions();
  const dispatch = useDispatch();
  const { userGold } = useSelector((state) => state.authReducer);
  const [activeColor, setActveColor] = useState("");
  const [amount, setAmount] = useState(0);
  const [typePayment, setTypePayment] = useState("stripe");
  const [currency, setCurrency] = useState("USD");
  const [agree, setAgree] = useState(false);

  return (
    <>
      <Box
        className="position-relative wallet-type-promote pb-4"
        sx={{
          backgroundColor:"#271C39",
          width: "100%",
          height: "100%",
          overflow: 'auto',
          minHeight: width < 576 ? "100vh" : "unset",
          maxHeight: width < 576 ? "unset" : height - 100,
        }}
      >
        {/* <FullScreenDialog /> */}
        {getAppType() === "promote" ? (
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              // backgroundImage: `url(${popup.proWallet})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "25px 25px 0px 25px",
              overflowY:"auto"
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="20"
                fill="none"
                viewBox="0 0 13 20"
                 onClick={() => {
                  handleClose()
                 }}
              >
                <path
                  fill="#fff"
                  d="M10.4 0L13 2.5 5.2 10l7.8 7.5-2.6 2.5L0 10 10.4 0z"
                ></path>
              </svg>
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
                <img src={popup.walletopen} alt="..." width={23} height={23} />
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
                      border: "1px solid gray",
                      height: "40px",
                      fontSize: "15px",
                      background: "#120f1d",
                      paddingLeft: "10px",
                      color: "white",
                    }}
                  />
                  <img
                    src={popup.coin2}
                    alt="..."
                    width={22}
                    height={22}
                    style={{
                      position: "absolute",
                      top: 9,
                      right: 15,
                    }}
                  />
                </Box>
              </form>
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
                      <option value="DOGE" style={{ color: "#642CDA" }}>
                        DOGE
                      </option>
                      <option value="EURO" style={{ color: "#642CDA" }}>
                        EURO
                      </option>
                    </select>
                  </form>
                </Grid>
                <Grid item xs={7}>
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
                      Amount
                    </Typography>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      className="walletPromote"
                      // value={amount}
                      onChange={(e) => setAmount(e?.target?.value)}
                      style={{
                        borderRadius: "7px",
                        border: "1px solid gray",
                        height: "40px",
                        fontSize: "15px",
                        background: "transparent",
                        paddingLeft: "10px",
                        color: "white",
                      }}
                    />
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
                  Amount
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "15px",
                    fontWeight: "lighter !important",
                    
                  }}
                >
                  {userGold &&
                    userGold > 0 &&
                    formatMoney(
                      Number.parseFloat(userGold + Number.parseFloat(amount))
                    )}{" "}
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
                  {userGold &&
                    userGold > 0 &&
                    formatMoney(
                      Number.parseFloat(userGold + Number.parseFloat(amount))
                    )}{" "}
                  USD
                </Typography>
              </Box>
              <Box className="text-white d-flex justify-content-between">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "lighter !important",
                    
                  }}
                >
                  Total payment
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "lighter !important" }}
                >
                  {userGold &&
                    userGold > 0 &&
                    formatMoney(
                      Number.parseFloat(userGold + Number.parseFloat(amount))
                    )}{" "}
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
                    fontSize: "13px",
                    fontWeight: "lighter !important",
                    marginLeft: "0px !important",
                    
                  }}
                >
                  Payment method
                </Typography>
                <input
                  type="text"
                  className={`w-100 input-method ${activeColor}`}
                  defaultValue="stripe"
                  disabled
                  style={{
                    borderRadius: "7px",
                    border: "1px solid gray",
                    height: "40px",
                    fontSize: "15px",
                    background: "transparent",
                    paddingLeft: "20px",
                    color: "#6c59fc",
                    fontWeight: "bold",
                  }}
                />
                <input
                  type="radio"
                  className="radio-input"
                  defaultChecked
                  style={{
                    position: "absolute",
                    top: 43,
                    right: 20,
                  }}
                  onClick={() => {
                    setActveColor("activewl");
                    setTypePayment("stripe");
                  }}
                />
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
                    
                  }}
                  className="text-white"
                >
                  I agree with Interchain{" "}
                  <span
                    style={{
                      color: "#A57FF6",
                      fontSize: "14px",
                      fontWeight: "lighter !important",
                    }}
                  >
                    Terms & Agreement
                  </span>{" "}
                  services.
                </Typography>
              </Box>
            </Box>
            <Box>
              <button
                style={{
                  color: "white",
                  width: "100%",
                  height: "45px",
                  borderRadius: "7px",
                  border: "none",
                  outline: "none",
                  fontWeight: "bolder",
                  backgroundImage: "linear-gradient(#893aef,#7547ee)",
                  fontSize: "15px",
                  marginBottom:"30px"
                }}
                onClick={() => {
                  if (!agree) {
                    dispatch(showAlert("warning", "Please agree policy!"));
                    return;
                  }
                  if (!amount || amount < 0) {
                    dispatch(showAlert("warning", "Please enter amount"));
                  } else if (typePayment === "stripe" && currency === "USD") {
                    dispatch(getStripe(Number.parseFloat(amount)));
                  } else {
                    dispatch(showAlert("warning", "Updating...!"));
                  }
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    marginLeft: "0px !important",
                    
                  }}
                >
                  Continue
                </Typography>
              </button>
            </Box>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </>
  );
}
