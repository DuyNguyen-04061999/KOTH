import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailDistributor,
  updateDistributor,
} from "../../../redux-saga-middleware_admin/reducers/adminMasterReducer";
import { useParams } from "react-router-dom";
import { Box, Button, Container, TextField } from "@mui/material";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { useState } from "react";
import CheckMasterComponent from "../../../components/Admin/CheckMasterComponent";

export default function EditDistributorPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { detailDistributor } = useSelector(
    (state) => state.adminMasterReducer
  );
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {}, [detailDistributor]);

  useEffect(() => {
    dispatch(getDetailDistributor({ id }));
  }, [dispatch, id]);

  const { height } = useWindowDimensions();

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPassword || String(newPassword)?.length < 9) {
      alert("New password incorrect format!");
    } else {
      dispatch(updateDistributor({ id, newPassword }));
      setNewPassword("");
    }
  };

  return (
    <Container fixed>
      <CheckMasterComponent
        children={
          <Box
            component={"form"}
            onSubmit={handleSubmit}
            className="bg-white text-dark p-2"
            sx={{
              height,
            }}
          >
            <TextField
              placeholder="New password"
              value={newPassword}
              onChange={handleChangeNewPassword}
              type="password"
              id="password"
              autoComplete="new"
            />
            <Button type="submit" className="bg-info text-white p-2 m-2">
              UPDATE
            </Button>
          </Box>
        }
      />
    </Container>
  );
}
