import { Box, Pagination, PaginationItem, Typography } from "@mui/material";
import React from "react";
import { images } from "../../utils/images";
import { makeStyles } from "@mui/styles";

export default function PaginatedItems({
  onPageChange,
  itemLength,
  itemPerPage,
}) {
  const useStyles = makeStyles((theme) => ({
    selected: {
      backgroundColor: "red",
      color: "#19D5C6",
    },
  }));
  const classes = useStyles();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "32px",
      }}
    >
      <Pagination
        sx={{
          "& .css-1xnf3w-MuiButtonBase-root-MuiPaginationItem-root": {
            color: "#fff",
          },
          "& .css-1ynb6jz-MuiPaginationItem-root": {
            color: "#fff",
          },
          "& .css-1xnf3w-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
            {
              backgroundColor: "#5A5A5A",
            },
        }}
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            components={{
              next: () => (
                <Box
                  sx={{
                    display: "flex",
                    color: "#fff",
                    alignItems: "center",
                    backgroundColor: "#7648ED",
                    width: "96px",
                    height: "36px",
                    borderRadius: "5px",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "lighter !important",
                      marginRight: "8px",
                      fontSize: "16px",
                    }}
                  >
                    Next
                  </Typography>
                  <Box
                    sx={{ width: "8px", height: "12px" }}
                    component={"img"}
                    src={images.NextButtonPagination}
                  ></Box>
                </Box>
              ),
              previous: () => (
                <Box
                  sx={{
                    display: "flex",
                    color: "#fff",
                    alignItems: "center",
                    backgroundColor: "#BF48ED",
                    width: "96px",
                    height: "36px",
                    borderRadius: "5px",
                    justifyContent: "center",
                  }}
                >
                  {" "}
                  <Box
                    sx={{ width: "12px" }}
                    component={"img"}
                    src={images.BackButtonLobby}
                  ></Box>
                  <Typography
                    sx={{
                      fontWeight: "lighter !important",
                      marginRight: "8px",
                      fontSize: "16px",
                    }}
                  >
                    Back
                  </Typography>
                </Box>
              ),
            }}
            {...item}
          />
        )}
        count={10}
      />
    </Box>
  );
}
