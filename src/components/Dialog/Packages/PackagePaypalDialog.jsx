import {
    Box,
    Dialog
} from "@mui/material";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closePaypalPackageDialog } from '../../../redux-saga-middleware/reducers/appReducer';

export default function PackagePaypalDialog() {
    const { isPaypalPackageDialog } = useSelector(state => state.appReducer)
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(closePaypalPackageDialog())
    }

    return (
        <Dialog open={isPaypalPackageDialog} onClose={handleClose} maxWidth={"md"} sx={{
            
        }}>
            <Box component={"div"} sx={{
                height: "100%",
                width: "100%"
            }}>
                <iframe title="paypal" sandbox="allow-top-navigation-by-user-activation allow-same-origin allow-scripts allow-popups allow-forms" src={process.env.REACT_APP_PAYPAL_PACKAGE_URL} height={"500"} width={"500"}>

                </iframe>
            </Box>
        </Dialog>
    )
}
