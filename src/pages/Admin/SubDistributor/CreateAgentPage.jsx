import {
  Box,
  Button,
  Container,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAgent } from "../../../redux-saga-middleware_admin/reducers/adminAgentReducer";
import { Navigate } from "react-router-dom";
import { CheckSubDistributorComponent } from "../../../components/Admin";

const CreateAgentPage = () => {
  const { listRole, listPermission } = useSelector(
    (state) => state.adminConfigReducer
  );
  const [roleId, setRoleId] = useState(0);
  const dispatch = useDispatch();
  const [pIds, setPIds] = useState([]);
  const { roles } = useSelector((state) => state.adminAuthReducer);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (
      data.get("username") &&
      data.get("password") &&
      roleId &&
      pIds &&
      pIds?.length > 0
    ) {
      dispatch(
        createAgent({
          username: data.get("username"),
          password: data.get("password"),
          roleId: roleId,
          pIds,
        })
      );
    } else {
      alert("Please enter infors!");
    }
  };

  const handleSelectPermission = (e) => {
    setPIds(e.target.value);
  };

  return (
    <CheckSubDistributorComponent>
      <Container fixed>
        {roles && roles?.length > 0 && roles?.includes("sub_distributor") ? (
          <Box
            component={"div"}
            className="text-dark p-2 bg-white"
            sx={{
              height: "100%",
            }}
          >
            <Box component={"div"} className="d-flex">
              {listRole &&
                listRole?.length > 0 &&
                listRole
                  ?.filter((it) => it?.roleName === "Agent")
                  ?.map((role, i_role) => {
                    return (
                      <Box
                        component={"div"}
                        key={i_role}
                        onClick={() => setRoleId(role?.id)}
                      >
                        <Box
                          component={"span"}
                          sx={{
                            color: role?.id === roleId ? "green" : "#000",
                          }}
                        >
                          {role?.roleName}
                        </Box>
                      </Box>
                    );
                  })}
            </Box>
            <Box component={"div"} className="mt-2">
              <FormControl sx={{ width: 300 }}>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={pIds}
                  onChange={handleSelectPermission}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) =>
                    selected
                      .map(
                        (value) =>
                          listPermission.find((option) => option.id === value)
                            .permissionName
                      )
                      .join(", ")
                  }
                >
                  {listPermission.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.permissionName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
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
                Create Agent
              </Button>
            </Box>
          </Box>
        ) : (
          <Navigate to={"/"} />
        )}
      </Container>
    </CheckSubDistributorComponent>
  );
};

export default CreateAgentPage;
