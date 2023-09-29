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
import {toggleCheckWallet, toggleWalletDialog} from "../../../../redux-saga-middleware/reducers/walletReducer";

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
              <Box sx={{
                  display:"flex",
                  justifyContent:"flex-end",
                  alignItems:"end"
              }}>
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 20 20"
                      className={"cursor-pointer"}
                      onClick={() => {
                          dispatch(toggleWalletDialog())
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
                  justifyContent:"center"
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
                            position: "absolute", top: 15, right: 20,
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
                      color: "white", border: "2", background: "white", borderColor: "white", height: "1px",
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
