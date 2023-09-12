import {
  Box,
  Button,
  Container,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  getListTicket,
  provideTicket,
} from "../../../redux-saga-middleware_admin/reducers/adminConfigReducer";
import { getListRef } from "../../../redux-saga-middleware_admin/reducers/adminSubDistributorReducer";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { FormControl } from "react-bootstrap";

const ProvideEndUserTicketPage = () => {
  const { roles, permissions } = useSelector((state) => state.adminAuthReducer);
  const { listRefs } = useSelector((state) => state.adminSubDistributorReducer);
  const { listTicket } = useSelector((state) => state.adminConfigReducer);

  const [disId, setDisId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListRef());
    dispatch(getListTicket());
  }, [dispatch]);

  const { height } = useWindowDimensions();

  const [listUserRef, setListUserRef] = useState([]);

  useEffect(() => {
    let list = [];
    for (let index = 0; index < listRefs.length; index++) {
      const element = listRefs[index];
      list?.push(element);
      if (element?.receivers && element?.receivers?.length > 0) {
        for (let ii = 0; ii < element?.receivers?.length; ii++) {
          const element_ = element?.receivers[ii];
          list?.push(element_);
        }
      }
    }
    setListUserRef(list);
  }, [listRefs]);

  const getUsername = (se) => {
    let username;
    for (let index = 0; index < listUserRef.length; index++) {
      const element = listUserRef[index];
      if (se === element?.id) {
        username = element?.userName;
      }
    }
    return username;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!data?.get("quantity") || !disId) {
      alert("Quantity incorrect!");
    } else {
      dispatch(
        provideTicket({
          disId: disId,
          quantity: Number.parseInt(data?.get("quantity")),
        })
      );
    }
  };

  return (
    <Container fixed>
      {
      roles &&
      roles?.length > 0 &&
      roles?.includes("agent") ? (
        <Box
          component={"div"}
          className="bg-white text-dark p-2"
          sx={{
            height,
          }}
        >
          <Box component={"div"}>
            Tickets available:{" "}
            {listTicket && listTicket?.length > 0 ? listTicket?.length : 0}
          </Box>
          <Box component={"div"} className="mt-2">
            {/* <FormControl sx={{ width: 300 }}>
              <Select
                inputProps={{
                  style: {
                    color: "#000 !important",
                  },
                }}
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                sx={{
                  "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                    {
                      color: "#000 !important",
                    },
                  "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                    {
                      color: "#000 !important",
                    },
                  color: "#000 !important",
                }}
                value={disId}
                onChange={(e) => setDisId(e?.target?.value)}
                input={<OutlinedInput label="Tag" />}
                renderValue={(se) => {
                  return getUsername(se);
                }}
              >
                {listUserRef.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.userName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
          </Box>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
            className="text-white"
          >
            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              id="quantity"
              label="Quantity"
              name="quantity"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Provide
            </Button>
          </Box>
        </Box>
      ) : (
        <Navigate to={"/"} />
      )}
    </Container>
  );
};

export default ProvideEndUserTicketPage;
