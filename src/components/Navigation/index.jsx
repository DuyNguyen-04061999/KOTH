import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function Navigation() {
    const { tokenUser: token } = useSelector(state => state.userReducer)

    if (token && ['/', '/home'].includes(window.location.pathname)) {
        return <Navigate to="/home" />;
    }

    // Redirect if the user is not logged in and tries to access the dashboard or any private page
    if (!token && window.location.pathname.startsWith('/home')) {
        return <Navigate to="/home" />;
    }

    return null; // No need for redirection

    // return (
    //     <>
    //         {!token && <Navigate to={"/"}/>}
    //     </>
    // )
}
