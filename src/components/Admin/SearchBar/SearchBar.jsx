import SearchIcon from "@mui/icons-material/Search";
import { Box, FormControl, IconButton, TextField } from "@mui/material";
import React from "react";

const SearchBar = ({
  searchValue,
  onChange,
  onSubmit,
  placeholder = "User Name, Display Name",
  type = "text",
  width = "365px",
}) => {
  const handleFocus = (e) => {
    e.stopPropagation();
  };

  return (
    <FormControl sx={{ width: width }} onSubmit={onSubmit}>
      <Box
        sx={{
          border: "2px solid #5474F1",
          borderRadius: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 4px 0 16px",
          width: "100%",
        }}
      >
        <TextField
          onClick={handleFocus}
          id="search-bar"
          className="text"
          placeholder={placeholder}
          variant="standard"
          value={searchValue}
          type={type}
          InputProps={{
            disableUnderline: true, // <== added this
          }}
          onChange={onChange}
          sx={{ 
            width: "100%",
            ".MuiInputBase-input:-webkit-autofill": {
              WebkitTextFillColor: "#000 !important"
            },
            ".MuiInputBase-input:hover": {
              WebkitTextFillColor: "#000 !important"
            }
          }}
        />
        <IconButton type="submit" aria-label="search" onClick={onSubmit}>
          <SearchIcon style={{ fill: "black" }} />
        </IconButton>
      </Box>
    </FormControl>
  );
};
export default SearchBar;
