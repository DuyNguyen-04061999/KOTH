import { Box, Dialog, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAccount } from '../../../redux-saga-middleware_admin/reducers/adminConfigReducer'
import { closeConfirmDialog } from '../../../redux-saga-middleware_admin/reducers/adminDialogReducer'

export default function ConfirmDialogComponent() {
    const { isConfirmDialog, typeConfirm } = useSelector(state => state.adminDialogReducer)
    const { detailAccount } = useSelector((state) => state.adminReducer_);
    
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(closeConfirmDialog())
    }

    const handleAccept = () => {
        dispatch(deleteAccount({ account: detailAccount?.account || "" }))
        dispatch(closeConfirmDialog())
    }

    const handleReject = () => {
        dispatch(closeConfirmDialog())
    }

    return (
        <Dialog open={isConfirmDialog} onClose={handleClose}>
            {typeConfirm === "delete-account" && (
                <Box component={"div"} className='p-2'>
                    <Typography>
                        Do you want delete this account?
                    </Typography>
                    <Box component={"div"} className='d-flex justify-content-between mt-4 cursor-pointer'>
                        <Typography onClick={handleReject} sx={{

                        }} className='bg-secondary text-white p-2 rounded'>Cancel</Typography>
                        <Typography onClick={handleAccept} className='bg-success text-white p-2 rounded cursor-pointer'>Accept</Typography>
                    </Box>
                </Box>
            )}
        </Dialog>
    )
}
