import React, { useEffect } from 'react'
import { CheckDistributorComponent } from '../../../components/Admin'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSub, getListSub } from '../../../redux-saga-middleware_admin/reducers/adminDistributorReducer'
import { Box } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { useNavigate } from 'react-router-dom'
import UserIcon from "@mui/icons-material/Group"

export default function ListSubDistributorPage() {
    const dispatch = useDispatch()
    const { listSub } = useSelector(state => state.adminDistributorReducer)
    const navigate = useNavigate()
console.log(listSub);
    useEffect(() => {
        dispatch(getListSub())
    }, [dispatch])

    const handleEdit = (id) => {
        navigate(`/distributor/edit-sub-distributor/${id}`)
    }

    const handleDelete = (id) => {
        if(window.confirm("Are you sure?")) {
            dispatch(deleteSub({ id }))
        }
    }

    return (
        <CheckDistributorComponent children={
            <Box component={"div"} className=' d-flex p-2'>
                    {listSub && listSub?.length > 0 && listSub?.map((sdis, i_sdis) => (
                        <Box component={"div"} className='card me-2 p-2 pt-3 pb-3 cursor-pointer d-flex flex-row justify-content-between' key={i_sdis}>   
                            {sdis?.userName}
                            <Box component={"div"}>
                                {sdis && sdis?.receivers && sdis?.receivers?.length > 0 ? sdis?.receivers?.length : 0} <UserIcon sx={{ fontSize: 16 }} color="primary"/>
                            </Box>
                            <Box component={"div"} className='d-flex'>
                                <EditIcon color='success' onClick={() => handleEdit(sdis?.id)}/>
                                <DeleteIcon color="error" onClick={() => handleDelete(sdis?.id)} className='ms-3'/>
                            </Box>
                            
                        </Box>
                    ))}
                </Box>
        }/>
    )
}
