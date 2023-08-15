import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListRef } from '../../../redux-saga-middleware_admin/reducers/adminSubDistributorReducer'
import { Box } from '@mui/material'
import useWindowDimensions from './../../../utils/useWindowDimensions'
import { Navigate } from 'react-router-dom'

export default function ListRefPage() {
    const dispatch = useDispatch()
    const { listRefs } = useSelector(state => state.adminSubDistributorReducer)
    const { roles, permissions } = useSelector(state => state.adminAuthReducer)
    
    useEffect(() => {
        dispatch(getListRef())
    }, [dispatch])
    const { height } = useWindowDimensions()

    return (
        <>
            {permissions && permissions?.length > 0 && permissions?.includes("view_ref_end_user")
            && roles && roles?.length > 0 && roles?.includes("sub_distributor")
            ? (
                <Box component={"div"} className='p-2 bg-white text-dark' sx={{
                    height
                }}>
                    {listRefs && listRefs?.length > 0 && listRefs?.map((ref, i_ref) => (
                        <Box component={"div"} key={i_ref}>
                            {ref?.userName}
                            {
                                ref?.receivers && ref?.receivers?.length > 0 && ref?.receivers?.map((sR, i_sr) => (
                                    <Box component={"div"} className='ms-3' key={i_sr}>
                                        - {sR?.userName}
                                    </Box>
                                ))
                            }
                        </Box>
                    ))}
                    
                </Box>
            ) : <Navigate to={"/"}/> }
        </>
        
    )
}
