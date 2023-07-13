import { Box, Dialog, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment/moment";

export default function TransactionDetailDialog(props) {
  const { trans, open, handleClose } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        zIndex: 1305,
      }}
      fullWidth
    >
      <Box
        className="position-relative"
        sx={{
          width: "100%",
        }}
      >
        <Box
          className="position-absolute"
          sx={{
            right: 0,
          }}
          onClick={handleClose}
        >
          <CloseIcon
            sx={{
              color: "#6d5b9a",
            }}
          />
        </Box>
        <Box
          className="p-2 d-flex"
          sx={{
            backgroundColor: "#37285c",
          }}
        >
          <Box className="ms-2 text-white">
            <span
              style={{
                color: "#acaad8",
              }}
            >
              {}
            </span>
            <br />
            <span
              style={{
                fontSize: 10,
                color: "#acaad8",
              }}
            >
            </span>
          </Box>
        </Box>
        <Box
          className="p-2"
          sx={{
            backgroundColor: "#2d224a",
          }}
        >
          <Box className="d-flex justify-content-between pb-2">
            <Typography
              sx={{
                fontSize: 12,
                color: "#acaad8",
              }}
            >
              Time
            </Typography>
            <Typography
              sx={{
                color: "#6e71d5",
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              {moment(trans?.createdAt).format("DD/MM/YY")}
              <br />
              {moment(trans?.createdAt).format("HH:mm:ss")}
            </Typography>
          </Box>
          <Box className="d-flex justify-content-between pb-2">
            <Typography
              sx={{
                fontSize: 12,
                color: "#acaad8",
              }}
            >
              Transaction ID
            </Typography>
            <Typography
              sx={{
                color: "#6e71d5",
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              {trans?.userId}
            </Typography>
          </Box>
          <Box className="d-flex justify-content-between pb-2">
            <Typography
              sx={{
                fontSize: 12,
                color: "#acaad8",
              }}
            >
              Gateway
            </Typography>
            <Typography
              sx={{
                color: "#6e71d5",
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              {"1+1=2"}
            </Typography>
          </Box>
          <Box className="d-flex justify-content-between pb-2">
            <Typography
              sx={{
                fontSize: 12,
                color: "#acaad8",
              }}
            >
              Amount
            </Typography>
            <Typography
              sx={{
                color: "#6e71d5",
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              {trans?.transactionValue}
            </Typography>
          </Box>
          <Box className="d-flex justify-content-between pb-2">
            <Typography
              sx={{
                fontSize: 12,
                color: "#acaad8",
              }}
            >
              Rate
            </Typography>
            <Typography
              sx={{
                color: "#6e71d5",
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              <span
                style={{
                  color: "#fc3c3c",
                }}
              >
                {trans?.transactionRate}
              </span>
            </Typography>
          </Box>
          <Box className="d-flex justify-content-between pb-2">
            <Typography
              sx={{
                fontSize: 12,
                color: "#acaad8",
              }}
            >
              Charge
            </Typography>
            <Typography
              sx={{
                color: "#6e71d5",
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
                {"1"}
            </Typography>
          </Box>
          <Box className="d-flex justify-content-between pb-2">
            <Typography
              sx={{
                fontSize: 12,
                color: "#acaad8",
              }}
            >
              Status
            </Typography>
            <Typography
              sx={{
                color: "#6e71d5",
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              {trans?.transactionStatus}
            </Typography>
          </Box>
          <Box className="d-flex justify-content-between pb-2">
            <Typography
              sx={{
                fontSize: 12,
                color: "#acaad8",
              }}
            >
              Receivable
            </Typography>
            <Typography
              sx={{
                color: "#6e71d5",
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              {trans?.transactionReceivable}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
