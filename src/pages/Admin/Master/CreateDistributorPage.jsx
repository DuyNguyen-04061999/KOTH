import { Box, Button, FormControl, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDistributor } from "./../../../redux-saga-middleware_admin/reducers/adminMasterReducer"
import { Navigate } from 'react-router-dom'

export default function CreateDistributorPage() {
    const { listRole, listPermission } = useSelector(state => state.adminConfigReducer)
    
    const { roles, permissions } = useSelector(state => state.adminAuthReducer)
    const [roleId, setRoleId] = useState(0)
    const dispatch = useDispatch()
    const [pIds, setPIds] = useState([]);

    const handleSubmit = (e) => {
      e.preventDefault()
      const data = new FormData(e.currentTarget);
      if(data.get('username') && data.get('password') && roleId && pIds && pIds?.length > 0) {
        dispatch(createDistributor({
          username: data.get('username'),
          password: data.get('password'),
          roleId: roleId,
          pIds
        }))
      } else {
        alert("Please enter infors!")
      }
    }

    const handleSelectPermission = (e) => {
      setPIds(e.target.value);
    }

    return (
      <>
        {permissions && permissions?.length > 0 && permissions?.includes("create_distributor")
        && roles && roles?.length > 0 && roles?.includes("master")
        ? (
          <Box component={"div"} className='text-dark p-2 bg-white' sx={{
            height: '100%'
          }}>
            <Box component={"div"} className='d-flex'>
              {listRole && listRole?.length > 0 && listRole?.filter(it => it?.roleName === "Distributor")?.map((role, i_role) => {
                return (
                  <Box component={"div"} key={i_role} onClick={() => setRoleId(role?.id)}>
                    <Box component={"span"} sx={{
                      color: role?.id === roleId ? "green" : '#000'
                    }}>
                      {role?.roleName}
                    </Box>
                  </Box>
                )
              })}
            </Box>
            <Box component={"div"} className='mt-2'>
              <FormControl sx={{ width: 300 }}>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={pIds}
                onChange={handleSelectPermission}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) =>
                  selected.map((value) =>
                    listPermission.find((option) => option.id === value).permissionName
                  ).join(', ')
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} className='text-white'>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete='username'
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
                  Create Distributor
                </Button>
              </Box>
        </Box>
        ) : <Navigate to={"/"}/>}
      </>
    )
}
