import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { hideToastNotification } from '../../redux-saga-middleware/reducers/alertReducer';

export default function ToastNotification() {
    const { 
        isShowToastNotification,
        messageToastNotifiaction,
        typeToastNotifiaction 
    } = useSelector(state => state.alertReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        if(isShowToastNotification) {
            switch(typeToastNotifiaction) {
                case "error": toast.error(messageToastNotifiaction || "This is default notify!");break
                case "warning": toast.warning(messageToastNotifiaction || "This is default notify!");break
                case "success": toast.success(messageToastNotifiaction || "This is default notify!");break
                case "info": toast.info(messageToastNotifiaction || "This is default notify!");break
                default: return toast.info("This is default notify!")
            }
        }
        setTimeout(() => {
            dispatch(hideToastNotification())
        }, 1000)
    }, [messageToastNotifiaction, isShowToastNotification, typeToastNotifiaction, dispatch])

    return (
        <></>
    )
}
