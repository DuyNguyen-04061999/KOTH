import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function CheckSubDistributorComponent(props) {
    const { children } = props
    const { roles } = useSelector(state => state.adminAuthReducer)

    return (
        <>
             {roles && roles?.length > 0 && roles?.includes("sub_distributor") ? (
                children
            ) : (
                <Navigate to={"/"}/>
            )}
        </>
    )
}
