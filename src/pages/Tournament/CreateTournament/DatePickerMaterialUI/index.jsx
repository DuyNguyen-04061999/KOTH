import React from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { Box } from "@mui/material";

export default function DatePickerMaterialUI() {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {" "}
          <DatePicker
            sx={{
              "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root": {
                color: "#fff",
                backgroundColor: "#68399E",
                border: "none",
                outline: "none",
                width: "240px",
              },

              "& ..css-cwhad8-MuiDateCalendar-root": {
                backgroundColor: "#68399E !important",
              },
              "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                color: "#fff",
                backgroundColor: "#68399E",
                border: "none",
                outline: "none",
                borderRadius: "10px",
                padding: "10px 20px",
              },
              "& .css-i4bv87-MuiSvgIcon-root": {
                color: "#fff",
              },
            }}
          />
          <MobileTimePicker
            sx={{
              "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                color: "#fff",
                backgroundColor: "#68399E",
                border: "none",
                outline: "none",
                width: "74px",
                padding: "10px 15px",
                borderRadius: "5px",
              },
            }}
            defaultValue={moment("2022-04-17T15:30")}
          />
        </Box>
      </LocalizationProvider>
    </div>
  );
}
