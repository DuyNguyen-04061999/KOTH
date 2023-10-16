import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { hideToastNotify } from '../../../redux-saga-middleware_admin/reducers/adminAlertReducer';

export default function AlertAdminComponent() {
    const { 
        showToast,
        typeToast,
        messageToast 
    } = useSelector(state => state.adminAlertReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        if(showToast) {
            switch(typeToast) {
                case "error": toast.error(messageToast || "This is default notify!");break
                case "warning": toast.warning(messageToast || "This is default notify!");break
                case "success": toast.success(messageToast || "This is default notify!");break
                case "info": toast.info(messageToast || "This is default notify!");break
                default: return toast.info("This is default notify!")
            }
        }
        setTimeout(() => {
            dispatch(hideToastNotify())
        }, 1000)
    }, [messageToast, showToast, typeToast, dispatch])

    return (
        <></>
    )
}
