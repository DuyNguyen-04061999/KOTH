import {
  Dialog,
  Box,
  Slide,
  Typography,
  CircularProgress,
  styled,
  TableCell,
  tableCellClasses,
  TableRow,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  FormControl,
  Input,
} from "@mui/material";
import { forwardRef, useCallback, useEffect } from "react";
import "./index.scss";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { images280423_l } from "../../../utils/images280423_l";
import { useState } from "react";
import copy from "copy-to-clipboard";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import moment from "moment";
import _socket from "../../../redux-saga-middleware/config/socket";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../../redux-saga-middleware/reducers/alertReducer";
import { store } from "../../../redux-saga-middleware/config/configRedux";
import {
  closeTransactionDialog,
  openTransactionDialog,
  toggleWalletDialog,
} from "../../../redux-saga-middleware/reducers/walletReducer";
import { images } from "../../../utils/images";
import { getFontSizeDependOnWidth } from "../../../utils/config";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function DialogWallet(props) {
  const { open, handleClose } = props;
  const { width, height } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false);
  const { isTransactionDialog } = useSelector((state) => state.walletReducer);
  const [withDrawAddress, setWithDrawAddress] = useState("");
  const [transactions, setTransaction] = useState([]);
  const [wrapperWidth, setWrapperWidth] = useState();
  const { userGold } = useSelector((state) => state.authReducer);
  const { withdrawData, despositData } = useSelector(
    (state) => state.paymentReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const div = useCallback((node) => {
    if (node !== null) {
      setWrapperWidth(node.getBoundingClientRect().width);
    }
  }, []);
  useEffect(() => {
    if (isTransactionDialog) {
      setWrapperWidth("900px");
    } else {
      setWrapperWidth("500px");
    }
  }, [isTransactionDialog]);
  const [withdrawCharge] = useState(5);
  const [willGet, setWillGet] = useState(0);
  const [willBe, setWillBe] = useState(0);
  const [valueDepositAddress,setValueDepositAddress] = useState("")

  const [tab, setTab] = useState(1);

  const renderDeposit = () => {
    return (
      <Box
        sx={{
          width: width < 576 ? "none" : wrapperWidth,
        }}
      >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          {" "}
          <Box
            sx={{
              width: "80%",
              padding: "0px 16px",
            }}
            className="mt-5 mb-3"
          >
            {tab === 1 && (
              <Box
                sx={{
                  width: "100%",
                  height: "38px",
                  backgroundColor: "#462a71",
                  borderRadius: "4px",
                  display: "flex",
                }}
              >
                <Box
                  className="cursor-pointer"
                  onClick={() => {
                    setTab(1);
                    setWillBe(0);
                    setWillGet(0);
                    setAmount(0);
                  }}
                  sx={{
                    width: "50%",
                    backgroundColor: "#68399e",
                    borderRadius: "4px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontWeight: "bolder",
                  }}
                >
                  <img
                    style={{ marginRight: "4px" }}
                    src={images.depositActive}
                    alt="..."
                  />
                  Deposit
                </Box>
                <Box
                  className="cursor-pointer"
                  onClick={() => {
                    setTab(2);
                  }}
                  sx={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#8a78b3",
                    fontWeight: "bolder",
                  }}
                >
                  <img
                    style={{ marginRight: "4px" }}
                    src={images.withdrawPassive}
                    alt="..."
                  />
                  Withdraw
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        <Box className="ps-3">
          <Typography
            className=""
            sx={{
              color: "#757ae4",
              fontWeight: "bold",
              fontSize: 16,
              textAlign: "start",
            }}
          >
            Cryptocurrency
          </Typography>
        </Box>
        <Box className="p-3">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img style={{ width: "90%" }} src={images.dogcoin} alt="..." />
          </Box>
          <Box className="mt-2 d-flex flex-column justify-content-center  mt-4">
            <Box>
              <Typography
                className=""
                sx={{
                  color: "#757ae4",
                  fontWeight: "bold",
                  fontSize: getFontSizeDependOnWidth(width),
                  textAlign: "start",
                }}
              >
                Your Deposit Address
              </Typography>
            </Box>
            <FormControl
              variant="standard"
              sx={{
                width: "100%",
                backgroundColor: "#181223",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
                marginTop: "20px",
              }}
            >
              <Input
                id="input-with-icon-adornment"
                value={"y21weplzx75"}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#fff",
                  },
                  "&:before": {
                    borderBottom: "0px solid",
                    "&:hover": {
                      borderBottom: "0px solid",
                    },
                  },
                  "&:after": {
                    borderBottom: "0px solid",
                  },
                  "&:hover": {
                    border: "none",
                  },
                  color: "#fff",
                  marginLeft: "10px",
                }}
                onChange={(e) => {
                  setValueDepositAddress(e.target.value)
                }}
              />
              <Box className="cursor-pointer">
                <img
                  src={images.copybutton}
                  alt=""
                  onClick={() => {
                    copy("y21weplzx75");
                    dispatch(showAlert("success", "Copy successfully!"));
                  }}
                />
              </Box>
            </FormControl>
            <Box
              sx={{
                width: "100%",
                height: "160px",
                position: "absolute",
                bottom: "0px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                left: "0px",
                backgroundColor: "#37285c",
              }}
            >
              <p style={{ color: "#7c81f3" }}>
                Click <span style={{ color: "#bbb7ec" }}>Check Deposit</span>{" "}
                button after deposit
              </p>
              <p style={{ color: "#7c81f3" }}>to require system to check</p>
              <button
                onClick={() => {
                  _socket.emit("deposit", { value: valueDepositAddress });
                 if(valueDepositAddress === '') {
                  dispatch(showAlert("error","not found"))
                 } else {
                  dispatch(showAlert("success", "Check Deposit Successfully!"));
                 }
                }}
                style={{
                  border: "none",
                  outline: "none",
                  borderRadius: "4px",
                  backgroundImage: "linear-gradient(#8b39f0,#7549ee)",
                  color: "white",
                  fontWeight: "800",
                  padding: "10px 50px",
                  marginTop: "10px",
                }}
              >
                Check Deposit
              </button>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  const [amount, setAmount] = useState(0);
  const renderWithdraw = () => {
    return (
      <Box
        sx={{
          width: width < 576 ? "none" : wrapperWidth,
        }}
      >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          {" "}
          <Box
            sx={{
              width: "80%",
              padding: "0px 16px",
            }}
            className="mt-5 mb-3"
          >
            {tab === 2 && (
              <Box
                sx={{
                  width: "100%",
                  height: "38px",
                  backgroundColor: "#462a71",
                  borderRadius: "4px",
                  display: "flex",
                }}
              >
                <Box
                  onClick={() => {
                    setTab(1);
                    setWillBe(0);
                    setWillGet(0);
                    setAmount(0);
                  }}
                  sx={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#8a78b3",
                    fontWeight: "bolder",
                  }}
                >
                  <img
                    style={{ marginRight: "4px" }}
                    src={images.depositPassive}
                    alt="..."
                  />
                  Deposit
                </Box>
                <Box
                  onClick={() => {
                    setTab(2);
                  }}
                  sx={{
                    width: "50%",
                    display: "flex",
                    backgroundColor: "#68399e",
                    borderRadius: "4px",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontWeight: "bolder",
                  }}
                >
                  <img
                    style={{ marginRight: "4px" }}
                    src={images.withdrawActive}
                    alt="..."
                  />
                  Withdraw
                </Box>
              </Box>
            )}
          </Box>
        </Box>
        <Box className="ps-4 pe-4">
          <Box
            className="mt-3"
            sx={{
              width: "100%",
              backgroundColor: "#3c2c64",
              borderRadius: "4px",
              height: "auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: "600",
              color: "#7c81f3",
              padding: "5px 4px 5px 10px",
            }}
          >
            <span>Cryptocurrency</span>
            <Box
              sx={{
                width: width < 576 ? width / 4.5 : "160px",
                heigth: "auto",
                padding: "4px",
                backgroundColor: "#c4a634",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={images.Doge} alt="..." />
              <span
                style={{
                  color: "#765c01",
                  fontWeight: "bolder",
                  marginLeft: "3px",
                }}
              >
                DOGE
              </span>
            </Box>
          </Box>
        </Box>
        <Box
          className="ps-4 pe-4 mt-2"
          sx={{
            background: "#281b39",
            borderRadius: 1,
          }}
        >
          <Box
            sx={{
              backgroundColor: "#3c2c64",
              padding: "10px 10px",
              height: "auto",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            {" "}
            <Box
              className="d-flex justify-content-between"
              sx={{
                border: "0px solid #3e3f70",
                borderRadius: 1,
              }}
            >
              <Typography
                sx={{
                  color: "#7275db",
                  fontSize: getFontSizeDependOnWidth(width),
                }}
              >
                Current Balance
              </Typography>
              <Typography
                className="text-end"
                sx={{
                  color: "white",
                  fontSize: getFontSizeDependOnWidth(width),
                }}
              >
                <span>{userGold} DOGEGOLD</span>
                <br />
                USD
              </Typography>
            </Box>
            <Box className="d-flex justify-content-between">
              <Typography
                sx={{
                  color: "#7275db",
                  fontSize: getFontSizeDependOnWidth(width),
                }}
              >
                Withdraw Limit
              </Typography>
              <Typography
                className="text-end"
                sx={{
                  color: "white",
                  fontSize: getFontSizeDependOnWidth(width),
                }}
              >
                <span>20 - 1000 USD</span>
              </Typography>
            </Box>
            <Box className="d-flex justify-content-between">
              <Typography
                sx={{
                  color: "#7275db",
                  fontSize: getFontSizeDependOnWidth(width),
                }}
              >
                Charge
              </Typography>
              <Typography
                className="text-end"
                sx={{
                  color: "white",
                  fontSize: getFontSizeDependOnWidth(width),
                }}
              >
                <span>0 USD + 5 %</span>
              </Typography>
            </Box>
            <Box className="d-flex justify-content-between">
              <Typography
                sx={{
                  color: "#7275db",
                  fontSize: getFontSizeDependOnWidth(width),
                }}
              >
                Conversion Rate
              </Typography>
              <Typography
                className="text-end"
                sx={{
                  color: "white",
                  fontSize: getFontSizeDependOnWidth(width),
                }}
              >
                <span>1 USD = DOGEGOLD</span>
                <img
                  src={images280423_l.gold}
                  alt="..."
                  width={14}
                  className="ms-1"
                />
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className="ps-4 pe-4 mt-2">
          <p
            style={{
              color: "rgb(135 154 234)",
              fontSize: getFontSizeDependOnWidth(width),
              textAlign: "start",
            }}
          >
            Address Wallet
          </p>
          <input
            className="addresswallet"
            required
            id="addressWallet"
            name="address"
            onChange={(e) => {
              setWithDrawAddress(e.target.value);
            }}
            value={withDrawAddress}
            style={{
              width: "100%",
              marginTop: "7px",
              padding: "7px 13px",
              border: "none",
              outline: "none",
              borderRadius: "4px",
              backgroundColor: "#181223",
              color: "white",
            }}
            placeholder="Enter address"
          />
          <p
            style={{
              color: "rgb(135 154 234)",
              fontSize: getFontSizeDependOnWidth(width),
              textAlign: "start",
              marginTop: "10px",
            }}
          >
            Enter Amount
          </p>
          <input
            type="number"
            style={{
              width: "100%",
              marginTop: "7px",
              padding: "7px 13px",
              border: "none",
              outline: "none",
              borderRadius: "4px",
              backgroundColor: "#181223",
              color: "white",
            }}
            id="amount"
            name="amount"
            value={amount}
            disabled={userGold <= amount ? true : false}
            onChange={(e) => {
              setAmount(e.target.value);
              const data = e.target.value;
              // const myUSD = 0 / 100; // User USD
              const willGet = data * (1 - 5 / 100);
              const leftGold = userGold - willGet;
              setWillGet(willGet);
              setWillBe(leftGold);
            }}
          />
          <Box className="mt-4">
            <Box
              className="p-2"
              sx={{
                background: "#3c2c64",
                borderRadius: "4px",
                height: "auto",
              }}
            >
              <Box className="d-flex justify-content-between" sx={{}}>
                <Typography
                  sx={{
                    color: "#7275db",
                    fontSize: getFontSizeDependOnWidth(width),
                    fontWeight: "800",
                  }}
                >
                  Withdraw Charge
                </Typography>
                <Typography
                  className="text-end"
                  sx={{
                    color: "white",
                    fontSize: getFontSizeDependOnWidth(width),
                  }}
                >
                  <span style={{ fontWeight: "600" }}>{withdrawCharge} %</span>
                </Typography>
              </Box>
              <Box className="d-flex justify-content-between">
                <Typography
                  sx={{
                    color: "#7275db",
                    fontSize: getFontSizeDependOnWidth(width),
                  }}
                >
                  You Will Get
                </Typography>
                <Typography
                  className="text-end"
                  sx={{
                    color: "white",
                    fontSize: getFontSizeDependOnWidth(width),
                  }}
                >
                  <span style={{ fontWeight: "600" }}>
                    {willGet.toFixed(2)} DOGECOIN
                  </span>
                </Typography>
              </Box>
              <Box className="d-flex justify-content-between">
                <Typography
                  sx={{
                    color: "#7275db",
                    fontSize: getFontSizeDependOnWidth(width),
                  }}
                >
                  Balance Will Be
                </Typography>
                <Typography
                  className="text-end"
                  sx={{
                    color: "white",
                    fontSize: getFontSizeDependOnWidth(width),
                  }}
                >
                  <span style={{ fontWeight: "600" }}>
                    {willBe.toFixed(2)} DOGECOIN
                  </span>
                  <br />
                  {willBe.toFixed(2)} USD
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>{" "}
        <Box
          sx={{
            width: "100%",
            height: "100px",
            position: "absolute",
            bottom: "0px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            left: "0px",
            backgroundColor: "#271c39",
          }}
          className="mt-3 d-flex justify-content-center mt-4"
        >
          {isLoading && isLoading ? (
            <CircularProgress color="success" />
          ) : (
            <div className="btn-check-deposit">
              <button
                style={{
                  color: "white",
                  width: width < 576 ? width * 0.6 : "250px",
                  height: "45px",
                  borderRadius: "4px",
                  border: "none",
                  outline: "none",
                  fontWeight: "bolder",
                  backgroundImage: "linear-gradient(#893aef,#7547ee)",
                }}
                onClick={() => {
                  if (!withDrawAddress || amount <= 0) {
                    store.dispatch(
                      showAlert("error", "Please enter Address Wallet")
                    );
                  } else {
                    _socket.emit("withdraw", { value: amount });
                    setIsLoading(true);
                    setWithDrawAddress("");
                    setAmount(0);
                    setTimeout(() => {
                      setIsLoading(false);
                    }, 5000);
                  }
                }}
              >
                Confirm
              </button>
            </div>
          )}
        </Box>
      </Box>
    );
  };

  // const transactionsTab = ["Deposit", "Withdraw"];
  const [transactionTabSelected, setTransactionTabSelected] = useState(0);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#251f41",
      color: "#7c81f3",
      fontWeight: "bolder",
      fontSize: 13,
      width: width / 5,
      maxWidth: width / 5,
      border: "none",
      padding: "10px 0px",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      width: width / 5,
      maxWidth: width / 5,
      border: "none",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#1f1933",
      width: width,
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#291e42",
      width: width,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: "none",
    },
  }));

  useEffect(() => {
    if (transactionTabSelected === 0) {
      setTransaction(despositData);
    } else {
      setTransaction(withdrawData);
    }
  }, [transactionTabSelected, withdrawData, despositData]);
  const renderTransaction = () => {
    return (
      <Box
        className="mt-5"
        sx={{
          minHeight: width > 576 ? height - 103 : "unset",
          width: width < 576 ? "none" : wrapperWidth,
          fontSize: getFontSizeDependOnWidth(width),
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            height: "100px",
            marginTop: "-51px",
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              width: width < 576 ? "100%" : "50%",
              padding: "0px 16px",
            }}
            className="mt-5 mb-3"
          >
            {transactionTabSelected === 0 ? (
              <Box
                sx={{
                  width: "100%",
                  height: "38px",
                  backgroundColor: "#462a71",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  onClick={() => {
                    setTransactionTabSelected(0);
                  }}
                  sx={{
                    width: "50%",
                    backgroundColor: "#68399e",
                    borderRadius: "4px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontWeight: "bolder",
                  }}
                >
                  <img
                    style={{ marginRight: "4px" }}
                    src={images.depositActive}
                    alt="..."
                  />
                  Deposit
                </Box>
                <Box
                  onClick={() => {
                    setTransactionTabSelected(1);
                  }}
                  sx={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#8a78b3",
                    fontWeight: "bolder",
                  }}
                >
                  <img
                    style={{ marginRight: "4px" }}
                    src={images.withdrawPassive}
                    alt="..."
                  />
                  Withdraw
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "38px",
                  backgroundColor: "#462a71",
                  borderRadius: "4px",
                  display: "flex",
                }}
              >
                <Box
                  onClick={() => {
                    setTransactionTabSelected(0);
                  }}
                  sx={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#8a78b3",
                    fontWeight: "bolder",
                  }}
                >
                  <img
                    style={{ marginRight: "4px" }}
                    src={images.depositPassive}
                    alt="..."
                  />
                  Deposit
                </Box>
                <Box
                  onClick={() => {
                    setTransactionTabSelected(1);
                  }}
                  sx={{
                    width: "50%",
                    display: "flex",
                    backgroundColor: "#68399e",
                    borderRadius: "4px",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontWeight: "bolder",
                  }}
                >
                  <img
                    style={{ marginRight: "4px" }}
                    src={images.withdrawActive}
                    alt="..."
                  />
                  Withdraw
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        {transactions && transactions?.length > 0 ? (
          <TableContainer
            sx={{
              borderRadius: 0,
              boxShadow: "unset",
              border: "none",
            }}
            component={Paper}
            className="mt-3"
          >
            <Table
              sx={{
                width: width < 576 ? width : wrapperWidth,
                borderRadius: 0,
                "& .MuiTableCell-root": {
                  borderWidth: "none",
                },
              }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Time</StyledTableCell>
                  <StyledTableCell align="center">Amount</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Fee</StyledTableCell>
                  <StyledTableCell align="center">Transaction</StyledTableCell>
                  {width > 576 && (
                    <StyledTableCell align="center">
                      Transaction
                    </StyledTableCell>
                  )}
                  {width > 576 && (
                    <StyledTableCell align="center">
                      Transaction
                    </StyledTableCell>
                  )}
                  {width > 576 && (
                    <StyledTableCell align="center">
                      Transaction
                    </StyledTableCell>
                  )}
                </TableRow>
              </TableHead>
              {transactions.length > 0 ? (
                <TableBody>
                  {transactions?.map((transaction, i_t) => (
                    <StyledTableRow key={i_t}>
                      <StyledTableCell
                        align="center"
                        component="td"
                        scope="row"
                      >
                        <Box
                          component={"span"}
                          sx={{
                            color: "#7a7fee",
                          }}
                        >
                          {moment(transaction?.updatedAt).format("DD/MM/YY")}
                          <br />
                          {moment(transaction?.updatedAt).format("HH:mm:ss")}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Box
                          component={"span"}
                          sx={{
                            color: "#fff",
                          }}
                        >
                          {transaction?.transactionValue} DOGEGOLD
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Box component={"span"} style={{ color: "#33b91f" }}>
                          {transaction?.transactionStatus}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Box component={"span"} className="text-danger">
                          0
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Box
                          component={"span"}
                          sx={{
                            color: "#51539c",
                            fontWeight: "bold",
                          }}
                          className="d-flex align-items-center justify-content-center"
                        >
                          Detail
                          <ArrowForwardIos
                            sx={{
                              color: "#51539c",
                              fontSize: 14,
                              fontWeight: "bold",
                            }}
                          />
                        </Box>
                      </StyledTableCell>
                      {width > 576 && (
                        <StyledTableCell align="center">
                          <Box
                            component={"span"}
                            sx={{
                              color: "#51539c",
                              fontWeight: "bold",
                            }}
                            className="d-flex align-items-center justify-content-center"
                          >
                            Detail
                            <ArrowForwardIos
                              sx={{
                                color: "#51539c",
                                fontSize: 14,
                                fontWeight: "bold",
                              }}
                            />
                          </Box>
                        </StyledTableCell>
                      )}
                      {width > 576 && (
                        <StyledTableCell align="center">
                          <Box
                            component={"span"}
                            sx={{
                              color: "#51539c",
                              fontWeight: "bold",
                            }}
                            className="d-flex align-items-center justify-content-center"
                          >
                            Detail
                            <ArrowForwardIos
                              sx={{
                                color: "#51539c",
                                fontSize: 14,
                                fontWeight: "bold",
                              }}
                            />
                          </Box>
                        </StyledTableCell>
                      )}
                      {width > 576 && (
                        <StyledTableCell align="center">
                          <Box
                            component={"span"}
                            sx={{
                              color: "#51539c",
                              fontWeight: "bold",
                            }}
                            className="d-flex align-items-center justify-content-center"
                          >
                            Detail
                            <ArrowForwardIos
                              sx={{
                                color: "#51539c",
                                fontSize: 14,
                                fontWeight: "bold",
                              }}
                            />
                          </Box>
                        </StyledTableCell>
                      )}
                    </StyledTableRow>
                  ))}
                </TableBody>
              ) : (
                <></>
              )}
            </Table>
          </TableContainer>
        ) : (
          <Box className="text-white p-2">Not Data Yet!</Box>
        )}
        <Box
          className="position-absolute d-flex justify-content-between p-2"
          sx={{
            bottom: 0,
            width: width < 576 ? width : wrapperWidth,
            zIndex: 1305,
            background: "#2f2851",
          }}
        >
          <Box
            className="text-white p-2 d-flex align-items-center"
            sx={{
              background: "#1f1933",
              borderRadius: 1,
            }}
          >
            <img
              src={images280423_l.coin}
              alt="..."
              width={25}
              className="img-fluid"
            />
            <span
              className="ms-2"
              style={{
                color: "white",
              }}
            >
              Dogegold
            </span>
            <ArrowForwardIos
              sx={{
                color: "#676ac7",
                fontSize: 14,
                fontWeight: "bold",
              }}
              className="ms-1"
            />
          </Box>
          <Box className="d-flex align-items-center">
            <Box
              className="text-white p-2 d-flex align-items-center"
              sx={{
                background: "#1f1933",
                borderRadius: 1,
              }}
            >
              <span
                className=""
                style={{
                  color: "white",
                }}
              >
                20
              </span>
              <ArrowForwardIos
                sx={{
                  color: "#676ac7",
                  fontSize: 14,
                }}
                className="ms-1"
              />
            </Box>
            <Box
              sx={{
                color: "#676ac7",
              }}
              className="mx-2"
            >
              Total: 1
            </Box>
            <Box
              className="text-white mx-1 p-2 d-flex align-items-content"
              sx={{
                background: "#1f1933",
                borderRadius: 1,
              }}
            >
              <span
                className=""
                style={{
                  color: "white",
                }}
              >
                1
              </span>
            </Box>
            <Box className="ms-2">
              <ArrowBackIos
                sx={{
                  color: "#676ac7",
                  fontSize: 14,
                }}
              />
              <ArrowForwardIos
                sx={{
                  color: "#676ac7",
                  fontSize: 14,
                }}
                className="ms-1"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Dialog
        fullScreen={width < 576}
        open={open || isTransactionDialog}
        onClose={() => {
          setWithDrawAddress("");
          setAmount(0);
          setWillBe(0);
          setWillGet(0);
          handleClose();
        }}
        TransitionComponent={Transition}
        sx={{
          zIndex: 1303,
          ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
            overflowY: "hidden",
            backgroundColor: "#271c39",
          },
          height: "100%",
          fontSize: getFontSizeDependOnWidth(width),
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth:
                width < 576 ? width : isTransactionDialog ? "900px" : "500px",
              height: "100%",
              maxHeight: width < 576 ? height : "800px",
            },
          },
        }}
      >
        <Box
          className="position-relative"
          ref={div}
          sx={{
            background: "transparent",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            className="position-fixed d-flex justify-content-between align-items-center"
            sx={{
              width: width < 576 ? "100%" : wrapperWidth,
              background: "#37285c",
              zIndex: 1305,
              height: "auto",
              padding: "5px 16px 5px 24px",
            }}
          >
            <Box>
              <img
                src={images.BackButtonDesposit}
                alt="..."
                width={11}
                className="img-fluid cursor-pointer"
                onClick={() => {
                  if (!isTransactionDialog) {
                    setTab(1);
                    dispatch(toggleWalletDialog());
                  } else {
                    dispatch(closeTransactionDialog());
                  }
                }}
              />
              <span
                className="mx-2"
                style={{
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {!isTransactionDialog ? "WALLET" : "TRANSACTIONS"}
              </span>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {!isTransactionDialog && (
                <Box
                  sx={{
                    color: "white",
                    borderRadius: 1,
                    backgroundColor: "#4a539a",
                    marginRight: "8px",
                    overflow: "hidden",
                    fontWeight: "bolder",
                    height: "35px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: `${width < 576 ? width / 3.2 : 130}px`,
                    backgroundImage: "linear-gradient(#8a3af0,#7548ee)",
                  }}
                  className="cursor-pointer position-relative"
                  onClick={() => {
                    dispatch(openTransactionDialog());
                  }}
                >
                  Transactions
                </Box>
              )}
              {width > 576 && (
                <Box
                  onClick={() => {
                    dispatch(toggleWalletDialog());
                    dispatch(closeTransactionDialog());
                  }}
                  sx={{ width: "15px", marginLeft: "20px", cursor: "pointer" }}
                >
                  <img src={images.CloseButtonDeposit} alt="..." />
                </Box>
              )}
            </Box>
          </Box>

          <Box
            sx={{
              paddingTop: "48px",
              minHeight: width < 576 ? height - 46 : "unset",
              maxHeight: width < 576 ? "unset" : height - 100,
              backgroundColor: "#271c39",
              paddingBottom: "100px",
              overflowY:"auto"
            }}
          >
            {isTransactionDialog
              ? renderTransaction()
              : tab && tab === 1
              ? renderDeposit()
              : renderWithdraw()}
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
