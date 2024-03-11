import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
export default function TableFilter({ filter, setFilter }) {
  const { device } = useSelector((state) => state.deviceReducer);

  return (
    <FormControl>
      <Select
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        inputProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                backgroundColor: "#181223",
                color: "white",
              },
            },
          },
        }}
        sx={{
          width: device === "Mobile" ? "120px" : "200px",
          backgroundColor: "#462A71",
          fontSize: device === "Mobile" ? "12px" : "16px",
          color: "#fff",
          "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            border: 0,
          },
          "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              border: 0,
            },
        }}
      >
        <MenuItem value={"all"}>All</MenuItem>
        <MenuItem value={"sub"}>Subscription</MenuItem>
        <MenuItem value={"non-sub"}>Non -Subscription</MenuItem>
      </Select>
    </FormControl>
  );
}
