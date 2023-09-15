import React, { useRef, useState } from "react";
import { Box, Button, Dialog, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker, MobileTimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { closeProvideDialog } from "../../../redux-saga-middleware_admin/reducers/adminDialogReducer";

const bg = "rgba(228, 228, 228, 0.2967)";
// const borderRadius = 12

export default function ProvideTicketDialogComponent(props) {
  const { account, customerTicket, availableTicket } = props;
  const { isProvideDialog } = useSelector(state => state.adminDialogReducer)
  const dispatch = useDispatch()

  const [dateInput, setDateInput] = useState({
    date: moment().format("YYYY/MM/DD"),
    time: moment("2022-04-17T15:30"),
  });
  const [ticketQuantity, setTicketQuantity] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const provideTicketInfo = {
      account: account,
      customerTicket: customerTicket,
      availableTicket: availableTicket,
      ticketQuantity: ticketQuantity,
      date: dateInput,
    };
    console.log(provideTicketInfo);
    e.target.reset();
  };

  const handleTicketQuantityChange = (e) => {
    e.preventDefault();
    setTicketQuantity(e.target.value);
  };

  const [focusedRechargeInput, setFocusedRechargeInput] = useState(false);
  const onFocusRechargeInput = () => setFocusedRechargeInput(true);
  const onBlurRechargeInput = () => setFocusedRechargeInput(false);

  const handleClose = () => {
    dispatch(closeProvideDialog())
  }

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
            <CloseIcon onClick={handleClose} sx={{}} />
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
              value={account || "Account"}
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
              value={customerTicket || "Customer tickets"}
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
              value={availableTicket || "Available tickets"}
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

          <Box component={"div"} className="rounded mt-3">
            <div>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <Box>
                  {" "}
                  <DatePicker
                   onChange={(newValue) => {
                    setDateInput({
                      ...dateInput,
                      date: newValue,
                    });
                  }}
                    format="YYYY/MM/DD"
                    value={moment(dateInput?.date, "YYYY/MM/DD")}
                    sx={{
                      display: { xs: "none", sm: "block" },
                      "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root": {
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
                    onChange={(newValue) => setDateInput({
                      ...dateInput,
                      date: newValue,
                    })}
                    sx={{
                      display: { xs: "block", sm: "none" },
                      "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
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

          <Button
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
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
