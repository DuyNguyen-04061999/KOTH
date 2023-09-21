import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, TextField } from "@mui/material";

const SearchBar = ({ searchValue, onChange, onSubmit }) => {
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
          marginTop: { xs: "14px" },
        }}
      >
        <TextField
          id="search-bar"
          className="text"
          placeholder="ID, Account or Nickname"
          variant="standard"
          value={searchValue}
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
