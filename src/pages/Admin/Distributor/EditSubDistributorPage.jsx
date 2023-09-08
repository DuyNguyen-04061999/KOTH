import React, { useState } from 'react'
import { CheckDistributorComponent } from '../../../components/Admin'
import { Box, Button, TextField } from '@mui/material'
import useWindowDimensions from '../../../utils/useWindowDimensions'
import { useDispatch } from 'react-redux'
import { updateSub } from '../../../redux-saga-middleware_admin/reducers/adminDistributorReducer'
import { useParams } from 'react-router-dom'

export default function EditSubDistributorPage() {
    const [newPassword, setNewPassword] = useState("")
    const dispatch = useDispatch();
    const { id } = useParams()

    const { height } = useWindowDimensions()
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!newPassword || String(newPassword)?.length < 9) {
            alert("New password incorrect format!")
        } else {
            dispatch(updateSub({ id, newPassword }))
            setNewPassword("")
        }
    }

    const handleChangeNewPassword = (e) => {
        setNewPassword(e.target.value)
    }

    return (
        <CheckDistributorComponent children={
            <Box component={"form"} onSubmit={handleSubmit} className='bg-white text-dark p-2' sx={{
                height
              }}>
                <TextField
                  placeholder='New password'
                  value={newPassword}
                  onChange={handleChangeNewPassword}
                  type='password'
                  id='password'
                  autoComplete='new'
                />
                <Button type='submit' className='bg-info text-white p-2 m-2'>
                  UPDATE
                </Button>
            </Box>
        }/>
    )
}
