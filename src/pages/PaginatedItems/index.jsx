import { Box, Pagination, PaginationItem, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useTranslation } from "react-i18next";
import { images } from "../../utils/images";
import useWindowDimensions from "../../utils/useWindowDimensions";

export default function PaginatedItems({
  changeOffSet,
  pageCount,
  defaultPage,
}) {
  const { width } = useWindowDimensions();
  const { t } = useTranslation("global");
  const useStyles = makeStyles(() => ({
    ul: {
      "& .MuiPaginationItem-root": {
        color: "#fff",
      },
    },
    root: {
      "& li .Mui-selected": {
        color: "white",
        backgroundColor: "#7648ED",
      },
      "& li .MuiPaginationItem-page": {
        color: "white",
        border: "1px solid #7648ED",
      },
      "& li .Mui-selected:hover": {
        color: "white",
        backgroundColor: "#7648ED",
      },
    },
  }));

  const classes = useStyles();
  return width < 576 ? (
    <Box
      sx={{
        bottom: "0px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {" "}
      <Pagination
        defaultPage={defaultPage}
        siblingCount={0}
        onChange={(e, value) => {
          changeOffSet(value);
        }}
        classes={{ ul: classes.ul, root: classes.root }}
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
                    backgroundColor: "#7848ED",
                    width: "32px",
                    height: "32px",
                    borderRadius: "5px",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "8px",
                      height: "12px",
                      marginRight: "0px !important",
                    }}
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
                    backgroundColor: "#7848ED",
                    width: "32px",
                    height: "32px",
                    borderRadius: "5px",
                    justifyContent: "center",
                  }}
                >
                  {" "}
                  <Box
                    sx={{
                      width: "12px",
                    }}
                    component={"img"}
                    src={images.BackButtonLobby}
                  ></Box>
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
        defaultPage={defaultPage}
        siblingCount={0}
        classes={{ ul: classes.ul, root: classes.root }}
        onChange={(e, value) => {
          changeOffSet(value);
        }}
        color="secondary"
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
                    backgroundColor: "#7848ED",
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
                    {t("Next")}
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
                    backgroundColor: "#7848ED",
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
                    {t("Back")}
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
