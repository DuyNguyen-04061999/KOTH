import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, TextField } from "@mui/material";

const SearchBar = ({
  searchValue,
  onChange,
  onSubmit,
  placeholder = "ID, Account or Nickname",
  type = "text",
}) => {
  
  const handleFocus = (e) => {
    e.stopPropagation();
  };

  return (
    <form onSubmit={onSubmit}>
      <Box
        sx={{
          border: "2px solid #5474F1",
          borderRadius: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px",
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
          sx={{ width: "100%" }}
        />
        <IconButton type="submit" aria-label="search" onClick={onSubmit}>
          <SearchIcon style={{ fill: "black" }} />
        </IconButton>
      </Box>
    </form>
  );
};
export default SearchBar;
