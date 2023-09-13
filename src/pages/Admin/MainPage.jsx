import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getConfigs } from '../../redux-saga-middleware_admin/reducers/adminConfigReducer'
import { useNavigate } from 'react-router-dom'
import CreateAccountDialogComponent from '../../components/Admin/Dialog/CreateAccountDialogComponent'
import ProvideTicketDialogComponent from '../../components/Admin/Dialog/ProvideTicketDialogComponent'
import { DetailAccountDialogComponent } from '../../components/Admin/Dialog'

const RenderActions = (data) => {
  const navigate = useNavigate()
  return (
    <Box component={"div"} className='d-flex mt-3 mb-3'>
      {data && data?.length > 0 && data?.map((action, i_action) => (
        <Box component={"div"} onClick={() => navigate(action?.link)} className='p-2 card text-dark ms-2 me-2 cursor-pointer' key={i_action}>
            {action?.name}
        </Box>
      ))}
    </Box>
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
      name: "List Distributor",
      link: "/master/list-distributor"
    },
    {
      name: "Database Manager",
      link: "/master/database-manager"
    },
    {
      name: "Templates Manager",
      link: "/master/template-manager"
    },
    {
      name: "Feedbacks Manager",
      link: "/master/feedback-manager"
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
      name: "List Sub Distributor",
      link: "/distributor/list-sub-distributor"
    },
    {
      name: "Ticket Provider",
      link: "/distributor/provide-ticket"
    },
  ]
  const subDistributorActions = [
    {
      name: "View Sub Distributor",
      link: "/sub-distributor/detail"
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
      <CreateAccountDialogComponent/>
      <ProvideTicketDialogComponent/>
      <DetailAccountDialogComponent/>
      <span className='ms-2'>Welcome - {roles && roles?.length > 0 && roles?.includes("master") ? "Master" : roles && roles?.length > 0 && roles?.includes("distributor") ? "Distributor" : "Sub-Distributor"} - {ref}</span>
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
