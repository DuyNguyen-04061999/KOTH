import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import { Box, Dialog, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListTicket,
  provideTicket,
} from "../../../redux-saga-middleware_admin/reducers/adminConfigReducer";
import { closeProvideDialog } from "../../../redux-saga-middleware_admin/reducers/adminDialogReducer";

const bg = "rgba(228, 228, 228, 0.2967)";
// const borderRadius = 12

export default function ProvideTicketDialogComponent(props) {
  const { roles } = useSelector((state) => state.adminAuthReducer);
  const { isProvideDialog } = useSelector((state) => state.adminDialogReducer);
  const { detailAccount } = useSelector((state) => state.adminReducer_);
  const { listTicket, isProvideTicket } = useSelector(
    (state) => state.adminConfigReducer
  );
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const [dateInput] = useState({
    date: moment().format("YYYY/MM/DD"),
  });
  const [ticketQuantity, setTicketQuantity] = useState(0);
  
  useEffect(() => {
    dispatch(getListTicket());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const provideTicketInfo = {
      accountName: detailAccount.account,
      quantity: parseInt(ticketQuantity),
      date: roles?.includes("master") && dateInput.date,
    };
    if (
      !provideTicketInfo.disId ||
      provideTicketInfo.quantity === 0 ||
      !provideTicketInfo.date
    ) {
      setErrorMessage("Please fill all required fields");
    }
    if (
      roles?.includes("master")
        ? provideTicketInfo.quantity > 10000
        : provideTicketInfo.quantity > listTicket?.length
    ) {
      setErrorMessage("Not enough available tickets to provide");
    } 
    // else if (
    //   roles?.includes("master") &&
    //   new Date(dateInput.date).getTime() < new Date().getTime()
    // ) {
    //   setErrorMessage("Date you have selected is before current date");
    // } 
    else {
      dispatch(provideTicket(provideTicketInfo));
      setErrorMessage("");
      setTicketQuantity(0)
    }
  };

  const handleTicketQuantityChange = (e) => {
    e.preventDefault();
    setTicketQuantity(e.target.value);
  };

  const [focusedRechargeInput, setFocusedRechargeInput] = useState(false);
  const onFocusRechargeInput = () => setFocusedRechargeInput(true);
  const onBlurRechargeInput = () => setFocusedRechargeInput(false);

  const handleClose = () => {
    dispatch(closeProvideDialog());
  };

  return (
    <Dialog
      open={isProvideDialog}
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root-MuiDialog-paper": {
          overflowY: "hidden",
          backgroundColor: "white",
        },
        height: "100%",
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            height: "auto",
            overflowY: "hidden",
            backgroundColor: "white",
          },
        },
      }}
    >
      <Box component={"div"} className="p-2 ps-4 pe-4">
        <Box
          component={"div"}
          className="d-flex justify-content-between mt-4 mb-5"
        >
          <Typography
            component={"h1"}
            sx={{
              fontWeight: 550,
              fontSize: 24,
              lineHeight: "32px",
            }}
          >
            Provide Tickets
          </Typography>
          <Box
            component={"div"}
            className="rounded-circle p-2"
            sx={{
              boxShadow: "1px 20px 25px 5px #E4E4E4",
            }}
          >
            <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
          </Box>
        </Box>
        <Box component={"form"} onSubmit={handleSubmit}>
          <Box
            component={"div"}
            className="rounded p-2 ps-3 pe-3 mt-2"
            sx={{
              backgroundColor: bg,
            }}
          >
            <Box component={"div"}>
              <Typography
                component={"span"}
                className=""
                sx={{
                  color: "#808191",
                  fontSize: 10,
                  lineHeight: "16px",
                  fontWeight: "700",
                  letterSpacing: "0.9px",
                  marginLeft: "0px !important",
                }}
              >
                ACCOUNT
              </Typography>
            </Box>
            <Box
              component={"input"}
              value={detailAccount?.account || "Account"}
              disabled
              className="pt-0 pb-2"
              sx={{
                width: "100%",
                border: 0,
                padding: 0,
                backgroundColor: "transparent",
                color: "#11142D",
                fontSize: 14,
                fontWeight: "700",
                ":focus": {
                  outline: "none",
                },
                "::placeholder": {
                  fontSize: 14,
                },
              }}
              placeholder="Account"
            ></Box>
          </Box>

          <Box
            component={"div"}
            className="rounded p-2 ps-3 pe-3 mt-3"
            sx={{
              backgroundColor: bg,
            }}
          >
            <Box component={"div"}>
              <Typography
                component={"span"}
                className=""
                sx={{
                  color: "#808191",
                  fontSize: 10,
                  lineHeight: "16px",
                  fontWeight: "700",
                  letterSpacing: "0.9px",
                  marginLeft: "0px !important",
                }}
              >
                CUSTOMER TICKETS
              </Typography>
            </Box>
            <Box
              component={"input"}
              value={detailAccount?.ticket}
              disabled
              className="pt-0 pb-2"
              sx={{
                width: "100%",
                border: 0,
                padding: 0,
                backgroundColor: "transparent",
                color: "#11142D",
                fontSize: 14,
                fontWeight: "700",
                ":focus": {
                  outline: "none",
                },
                "::placeholder": {
                  fontSize: 14,
                },
              }}
              placeholder="Customer tickets"
            ></Box>
          </Box>

          <Box
            component={"div"}
            className="rounded p-2 ps-3 pe-3 mt-3"
            sx={{
              backgroundColor: bg,
            }}
          >
            <Box component={"div"}>
              <Typography
                component={"span"}
                className=""
                sx={{
                  color: "#808191",
                  fontSize: 10,
                  lineHeight: "16px",
                  fontWeight: "700",
                  letterSpacing: "0.9px",
                  marginLeft: "0px !important",
                }}
              >
                AVAILABLE TICKETS
              </Typography>
            </Box>
            <Box
              component={"input"}
              value={
                roles?.includes("master") ? "Unlimited" : listTicket?.length
              }
              disabled
              className="pt-0 pb-2"
              sx={{
                width: "100%",
                border: 0,
                padding: 0,
                backgroundColor: "transparent",
                color: "#11142D",
                fontSize: 14,
                fontWeight: "700",
                ":focus": {
                  outline: "none",
                },
                "::placeholder": {
                  fontSize: 14,
                },
              }}
              placeholder="Available tickets"
            ></Box>
          </Box>

          <Box
            component={"div"}
            className="rounded p-2 ps-3 pe-3 mt-3"
            sx={{
              backgroundColor: bg,
              border: focusedRechargeInput
                ? "2px solid #355DFF"
                : "2px solid transparent",
            }}
          >
            <Box component={"div"}>
              <Typography
                component={"span"}
                className=""
                sx={{
                  color: "#808191",
                  fontSize: 10,
                  lineHeight: "16px",
                  fontWeight: "700",
                  letterSpacing: "0.9px",
                  marginLeft: "0px !important",
                }}
              >
                RECHARGE TICKETS
              </Typography>
            </Box>
            <Box
              value={ticketQuantity}
              component={"input"}
              className="pt-0 pb-2"
              type="number"
              sx={{
                width: "100%",
                border: 0,
                padding: 0,
                backgroundColor: "transparent",
                color: "#4FBF67",
                fontSize: 14,
                fontWeight: "700",
                ":focus": {
                  outline: "none",
                },
                "::placeholder": {
                  fontSize: 14,
                },
              }}
              onChange={handleTicketQuantityChange}
              onFocus={onFocusRechargeInput}
              onBlur={onBlurRechargeInput}
              placeholder="Input your ticket amount"
            ></Box>
          </Box>

          {/* {roles.includes("master") && (
            <Box component={"div"} className="rounded mt-3">
              <div>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <Box>
                    {" "}
                    <DatePicker
                      onChange={(newValue) => {
                        setDateInput({
                          date: moment(newValue).format("YYYY/MM/DD"),
                        });
                      }}
                      format="YYYY/MM/DD"
                      value={moment(dateInput?.date, "YYYY/MM/DD")}
                      sx={{
                        display: { xs: "none", sm: "block" },
                        "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root":
                          {
                            border: "none",
                            outline: "none",
                            width: "100%",
                            padding: "10px 16px 10px 2px",
                          },
                        "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input":
                          {
                            border: "none",
                            outline: "none",
                            borderRadius: "10px",
                            padding: "10px 20px",
                          },
                      }}
                    />
                    <MobileDatePicker
                      format="YYYY/MM/DD"
                      value={moment(dateInput?.date, "YYYY/MM/DD")}
                      onChange={(newValue) =>
                        setDateInput({
                          date: moment(newValue).format("YYYY/MM/DD"),
                        })
                      }
                      sx={{
                        display: { xs: "block", sm: "none" },
                        "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root":
                          {
                            width: "100%",
                            padding: "10px 16px 10px 2px",
                          },
                        "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                          {
                            border: "none",
                            outline: "none",
                            padding: "10px 15px",
                            borderRadius: "5px",
                          },
                        "& .css-1g7nc1s-MuiPickersLayout-root": {
                          backgroundColor: "white",
                        },
                      }}
                    />
                  </Box>
                </LocalizationProvider>
              </div>
            </Box>
          )} */}

          {errorMessage && (
            <p style={{ color: "red", marginTop: "24px" }}>{errorMessage}</p>
          )}

          <LoadingButton
            loading={isProvideTicket}
            className="mt-3 rounded mb-4 pt-2 pb-2"
            sx={{
              "&:hover": {
                background: "#355DFF",
              },
              width: "100%",
              backgroundColor: "#355DFF",
              color: "#fff",
              fontSize: 14,
              fontStyle: "normal",
              textTransform: "none",
            }}
            type="submit"
          >
            Recharge
          </LoadingButton>
        </Box>
      </Box>
    </Dialog>
  );
}
