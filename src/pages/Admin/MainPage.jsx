import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getConfigs } from '../../redux-saga-middleware_admin/reducers/adminConfigReducer'

const renderActions = (data) => {
  return (
    <>
      {data && data?.length > 0 && data?.map((action, i_action) => (
        <Box component={"div"} className='p-2' key={i_action}>
            {action?.name}
        </Box>
      ))}
    </>
  )
}

export default function MainPage() {
  const { roles } = useSelector(state => state.adminAuthReducer)
  const masterActions = [
    {
      name: "Create Distributor",
      link: ""
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
      link: ""
    },
  ]
  const distributorActions = [
    {
      name: "Create Sub Distributor",
      link: ""
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
      link: ""
    },
  ]
  const subDistributorActions = [
    {
      name: "View Sub Distributor",
      link: ""
    },
    {
      name: "View Ref User",
      link: ""
    },
    {
      name: "Ticket Provider",
      link: ""
    }
  ]
  
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(getConfigs())
    }, 3000)
  }, [dispatch])

  return (
    <div className='text-white p-2'>
      {roles && roles?.length > 0 && roles?.includes("master") && renderActions(masterActions)}
      {roles && roles?.length > 0 && roles?.includes("distributor") && !roles?.includes("Sub") && renderActions(distributorActions)}
      {roles && roles?.length > 0 && roles?.includes("sub_distributor") && renderActions(subDistributorActions)}
    </div>
  )
}
