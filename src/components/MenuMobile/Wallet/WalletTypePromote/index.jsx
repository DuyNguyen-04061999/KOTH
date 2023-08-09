import { Box, Grid, Typography } from "@mui/material";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import { popup } from "../../../../utils/images";
import "./index.scss";
import FullScreenDialog from "../../../FullScreenDialog";
import { useDispatch, useSelector } from "react-redux";
import { toggleDialogPromote } from "../../../../redux-saga-middleware/reducers/paymentReducer";
import { getStripe } from "../../../../redux-saga-middleware/reducers/stripeReducer";
import { formatMoney } from "../../../../utils/helper";
import { useState } from "react";

export default function WalletTypePromote() {
  const { width, height } = useWindowDimensions();
  const dispatch = useDispatch();
  const { userGold } = useSelector((state) => state.authReducer);
  const [activeColor, setActveColor] = useState("");
  const [amount, setAmount] = useState(0);

  return (
    <>
      <Box
        className="position-relative wallet-type-promote"
        sx={{
          backgroundImage: `url(${popup.proWallet})`,
          width: "100%",
          height: "100%",
        }}
      >
        <FullScreenDialog />
        <Box
          sx={{
            minHeight: width < 576 ? "1000px" : "unset",
            maxHeight: width < 576 ? "unset" : height - 100,
            backgroundImage: `url(${popup.proWallet})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "25px",
          }}
        >
          <Box className="text-white d-flex justify-content-center align-items-center">
            <Typography
              variant="h6"
              className="me-2"
              sx={{ fontWeight: "lighter !important", fontFamily: "Cyntho" }}
            >
              Wallet
            </Typography>
            <img src={popup.walletopen} alt="..." width={23} height={23} />
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
                  fontFamily: "Cyntho",
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
                      fontFamily: "Cyntho",
                    }}
                  >
                    Currency
                  </Typography>
                  {/* <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e?.target?.value)}
                    style={{
                      borderRadius: "10px",
                      border: "1px solid gray",
                      height: "40px",
                      fontSize: "15px",
                      background: "transparent",
                      paddingLeft: "10px",
                      color: "white",
                    }}
                  /> */}
                  <select
                    defaultValue="stripe"
                    className="custom-select"
                    style={{
                      borderRadius: "7px",
                      border: "1px solid gray",
                      height: "40px",
                      fontSize: "15px",
                      background: "transparent",
                      paddingLeft: "10px",
                      // color: "#642CDA",
                      color: "white",
                      fontWeight: "bold",
                      fontFamily: "Cyntho",
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
                      fontFamily: "Cyntho",
                    }}
                  >
                    Amount
                  </Typography>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="walletPromote"
                    value={amount}
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
                  fontFamily: "Cyntho",
                }}
              >
                Amount
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "15px",
                  fontWeight: "lighter !important",
                  fontFamily: "Cyntho",
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
                  fontFamily: "Cyntho",
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
                  fontFamily: "Cyntho",
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
                  fontFamily: "Cyntho",
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
                  fontFamily: "Cyntho",
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
                  fontWeight:"bold",
                }}
              />
              <input
                type="radio"
                className="radio-input"
                style={{
                  position: "absolute",
                  top: 43,
                  right: 20,
                }}
                onClick={() => {
                  // dispatch(toggleDialogPromote(true));
                  setActveColor("activewl");
                }}
              />
              {/* <select
                defaultValue="stripe"
                className="custom-select"
                style={{
                  borderRadius: "10px",
                  border: "1px solid gray",
                  height: "40px",
                  fontSize: "15px",
                  background: "transparent",
                  paddingLeft: "10px",
                  color: "#642CDA",
                }}
              >
                <option value="stripe" >stripe</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select> */}
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
                  fontFamily: "Cyntho",
                }}
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
              }}
              onClick={() => {
                dispatch(getStripe(Number.parseFloat(amount)));
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  marginLeft: "0px !important",
                  fontFamily: "Cyntho",
                }}
              >
                Continue
              </Typography>
            </button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
