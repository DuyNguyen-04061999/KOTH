import { Box, Pagination, PaginationItem, Typography } from "@mui/material";
import React from "react";
import { images } from "../../utils/images";
import useWindowDimensions from "../../utils/useWindowDimensions";

export default function PaginatedItems({ changeOffSet, pageCount }) {
  const { width } = useWindowDimensions();
  return width < 576 ? (
    <Box
      sx={{
        position: "fixed",
        bottom: "0px",
        backgroundColor: "#251F41",
        padding: "20px 12px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {" "}
      <Pagination
        defaultPage={6}
        siblingCount={0}
        onChange={(e, value) => {
          changeOffSet(value);
        }}
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
                    width: "72px",
                    height: "32px",
                    borderRadius: "5px",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "lighter !important",
                      marginRight: "8px",
                      fontSize: "14px",
                      marginLeft: "0px !important",
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
                    width: "72px",
                    height: "32px",
                    borderRadius: "5px",
                    justifyContent: "center",
                  }}
                >
                  {" "}
                  <Box
                    sx={{ width: "12px", marginRight: "5px" }}
                    component={"img"}
                    src={images.BackButtonLobby}
                  ></Box>
                  <Typography
                    sx={{
                      fontWeight: "lighter !important",
                      marginRight: "8px",
                      fontSize: "14px",
                      marginLeft: "0px !important",
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
        count={pageCount}
      />
    </Box>
  ) : (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "32px",
        marginBottom: "32px",
      }}
    >
      <Pagination
        onChange={(e, value) => {
          changeOffSet(value);
        }}
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
        count={pageCount}
      />
    </Box>
  );
}
