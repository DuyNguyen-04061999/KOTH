import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListDistributor } from '../../../redux-saga-middleware_admin/reducers/adminMasterReducer'
import { Navigate } from 'react-router-dom'
import { Box, Button, Container, FormControl, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import useWindowDimensions from './../../../utils/useWindowDimensions'
import { getListTicket, provideTicket } from '../../../redux-saga-middleware_admin/reducers/adminConfigReducer'

export default function ProvideTicketMasterPage() {
    const { roles, permissions } = useSelector(state => state.adminAuthReducer)
    const { listDistributor } = useSelector(state => state.adminMasterReducer)
    // const { listTicket } = useSelector(state => state.adminConfigReducer)
    
    const [disId, setDisId] = useState("")

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getListDistributor())
        dispatch(getListTicket())
    }, [dispatch])
    
    const { height } = useWindowDimensions()

    const getUsername = (se) => {
        let username;
        for (let index = 0; index < listDistributor.length; index++) {
            const element = listDistributor[index];
            if(se === element?.id) {
                username = element?.userName
            }
        }
        return username
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget);
        if(!data?.get("quantity") || !disId || !data?.get("date")) {
            alert("Quantity incorrect!")
        } else {
            dispatch(provideTicket({
                disId: disId,
                quantity: Number.parseInt(data?.get("quantity")),
                date: data?.get("date"),
            }))
        }
    }

    return (
        <Container fixed> 
            {permissions && permissions?.length > 0 && permissions?.includes("provide_ticket")
            && roles && roles?.length > 0 && roles?.includes("master")
            ? (
                <Box component={"div"} className='bg-white text-dark p-2' sx={{
                    height
                }}>
                    {/* <Box component={"div"}>
                        Tickets available: {listTicket && listTicket?.length > 0 ? listTicket?.length : 0} 
                    </Box> */}
                    <Box component={"div"} className='mt-2'>
                        <FormControl sx={{ width: 300 }}>
                            <Select
                                inputProps={{
                                    style: {
                                        color: "#000 !important"
                                    }
                                }}
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                sx={{
                                    "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
                                        color: "#000 !important"
                                    },
                                    "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
                                        color: "#000 !important"
                                    },
                                    color: "#000 !important"
                                }}
                                value={disId}
                                onChange={(e) => setDisId(e?.target?.value)}
                                input={<OutlinedInput label="Tag" />}
                                renderValue={(se) => {
                                    return getUsername(se)
                                }}
                            >
                                {listDistributor.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.userName}
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
                            type='number'
                            id="quantity"
                            label="Quantity"
                            name="quantity"
                            autoFocus
                        />
                        <TextField
                            sx={{
                                width: "300px"
                            }}
                            margin="normal"
                            required
                            fullWidth
                            type='date'
                            id="date"
                            name="date"
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

            ) : <Navigate to={"/"}/> }
        </Container>
    )
}
