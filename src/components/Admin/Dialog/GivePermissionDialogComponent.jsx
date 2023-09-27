import { Dialog } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeGivePerDialog } from '../../../redux-saga-middleware_admin/reducers/adminDialogReducer'

export default function GivePermissionDialogComponent() {
    const dispatch = useDispatch()

    const { isGivePerDialog } = useSelector(state => state.adminDialogReducer)

    const handleClose = () => {
        dispatch(closeGivePerDialog())
    }

    return (
        <Dialog open={isGivePerDialog} onClose={handleClose}>
            Give Permission
        </Dialog>
    )
}
