import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getConfigs } from '../../redux-saga-middleware_admin/reducers/adminConfigReducer'
import { useNavigate } from 'react-router-dom'

const RenderActions = (data) => {
  const navigate = useNavigate()
  return (
    <>
      {data && data?.length > 0 && data?.map((action, i_action) => (
        <Box component={"div"} onClick={() => navigate(action?.link)} className='p-2' key={i_action}>
            {action?.name}
        </Box>
      ))}
    </>
  )
}

export default function MainPage() {
  const { roles, ref } = useSelector(state => state.adminAuthReducer)
  const masterActions = [
    {
      name: "Create Distributor",
      link: "/master/create-distributor"
    },
    {
      name: "Edit Distributor",
      link: ""
    },
    {
      name: "Delete Distributor",
      link: ""
    },
    {
      name: "Database Manager",
      link: ""
    },
    {
      name: "Templates Manager",
      link: ""
    },
    {
      name: "Feedbacks Manager",
      link: ""
    },
    {
      name: "Ticket Provider",
      link: "/master/provide-ticket"
    },
  ]
  const distributorActions = [
    {
      name: "Create Sub Distributor",
      link: "/distributor/create-sub-distributor"
    },
    {
      name: "Edit Sub Distributor",
      link: ""
    },
    {
      name: "Delete Sub Distributor",
      link: ""
    },
    {
      name: "View Sub Distributor",
      link: ""
    },
    {
      name: "Ticket Provider",
      link: "/distributor/provide-ticket"
    },
  ]
  const subDistributorActions = [
    {
      name: "View Sub Distributor",
      link: ""
    },
    {
      name: "View Ref User",
      link: "/sub-distributor/refs"
    },
    {
      name: "Ticket Provider",
      link: "/sub-distributor/provide-ticket"
    }
  ]
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getConfigs())
  }, [dispatch])

  return (
    <div className='text-white p-2'>
      <span className='ms-2'>Welcome {ref}</span>
      {roles && roles?.length > 0 && roles?.includes("master") && RenderActions(masterActions)}
      {roles && roles?.length > 0 && roles?.includes("distributor") && !roles?.includes("Sub") && RenderActions(distributorActions)}
      {roles && roles?.length > 0 && roles?.includes("sub_distributor") && RenderActions(subDistributorActions)}
      <Box component={"div"} onClick={() => {
        localStorage.removeItem("token_admin")
        window.open("/", "_self")
      }} className='ms-2 text-danger'>
        Logout
      </Box>
    </div>
  )
}
