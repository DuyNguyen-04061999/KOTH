import React, { useEffect } from 'react'
import CheckMasterComponent from '../../../components/Admin/CheckMasterComponent'
import { useDispatch, useSelector } from 'react-redux'
import { getListTable } from '../../../redux-saga-middleware_admin/reducers/adminMasterReducer'
import { Box, Container } from "@mui/material"

export default function DatabaseManagerPage() {
    const dispatch = useDispatch()
    const { listTable } = useSelector(state => state.adminMasterReducer)

    console.log(listTable);


    useEffect(() => {
        dispatch(getListTable())
    }, [dispatch])

    return (
        <Container fixed>
            <CheckMasterComponent children={
            <Box component={"div"} className='d-flex flex-wrap p-2 justify-content-between'>
                {listTable && listTable?.length > 0 && listTable?.map((table, i_t) => {
                    return (
                        <Box component={"div"} className='card p-2 me-2 mb-2' key={i_t}>
                            {table?.table_name}
                        </Box>
                    )
                })}
            </Box>
        }/>   
        </Container>
    )
}
