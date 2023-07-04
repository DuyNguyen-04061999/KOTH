import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function Navigation() {
    const { token } = useSelector(state => state.authReducer)
    return (
        <>
            {!token && <Navigate to={"/"}/>}
        </>
    )
}
