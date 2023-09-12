import {
  Box,
  Container,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { createEndUser } from "../../../redux-saga-middleware_admin/reducers/adminAgentReducer";
import { CheckAgentComponent } from "../../../components/Admin";

const CreateEndUserPage = () => {
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.adminAuthReducer);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("username") && data.get("password")) {
      dispatch(
        createEndUser({
          username: data.get("username"),
          password: data.get("password"),
        })
      );
    } else {
      alert("Please enter infors!");
    }
  };

  return (
    <CheckAgentComponent>
          <Container fixed>
      {roles && roles?.length > 0 && roles?.includes("agent") ? (
        <Box
          component={"div"}
          className="text-dark p-2 bg-white"
          sx={{
            height: "100%",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              style={{ color: "black" }}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create End User
            </Button>
          </Box>
        </Box>
      ) : (
        <Navigate to={"/"} />
      )}
    </Container>
    </CheckAgentComponent>
  );
};

export default CreateEndUserPage;
