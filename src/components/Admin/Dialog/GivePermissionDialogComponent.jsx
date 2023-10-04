import { Box, Dialog, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeGivePerDialog } from '../../../redux-saga-middleware_admin/reducers/adminDialogReducer'
import { givePermission, updateDataAgents } from '../../../redux-saga-middleware_admin/reducers/adminDistributorReducer'

export default function GivePermissionDialogComponent() {
    const dispatch = useDispatch()

    const { isGivePerDialog } = useSelector(state => state.adminDialogReducer)
    const { listDataAgents, accountAgent } = useSelector(state => state.adminDistributorReducer)

    const handleClose = () => {
        dispatch(closeGivePerDialog())
        dispatch(updateDataAgents({}))
    }

    const handleApproved = (id, active) => {
        if(id && accountAgent) {
            dispatch(givePermission({
                userId: id,
                account: accountAgent,
                active: active ? 0 : 1
            }))
        }
        
    }

    return (
        <Dialog open={isGivePerDialog} onClose={handleClose} sx={{
            "& .MuiPaper-root-MuiDialog-paper": {
              overflowY: "hidden",
              backgroundColor: "white",
            },
            height: "100%",
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                height: "auto",
                overflowY: "hidden",
                backgroundColor: "white",
              },
            },
          }}>
            {listDataAgents && <Box component={"div"}>
                <Box component={"div"} className='d-flex justify-content-between p-2'>
                    <Typography>Account</Typography>
                    <Typography>Approved</Typography>
                </Box>
                {listDataAgents && listDataAgents?.length > 0 && listDataAgents?.map((agent, i_agent) => (
                    <Box component={"div"} key={i_agent} sx={{
                        borderTop: "2px solid #E4E4E4",
                    }} className='mt-2 mb-2 pt-2 p-2 d-flex justify-content-between align-items-center'>
                        <Typography>
                            {agent?.account}
                        </Typography>
                        <Box component={"div"}>
                            <Box component={"div"} onClick={() => handleApproved(agent?.id, agent?.active)} className='text-center p-2 text-white cursor-pointer' sx={{
                                marginTop: "14px",
                                borderRadius: "16px", background: agent?.active ? "#355DFF" : "#FF4135"
                            }}>
                                <Typography sx={{
                                    color: "#FFF",
                                    textAlign: "center",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 700,
                                    lineHeight: "normal"
                                }}>
                                    {agent?.active ? "Active" : "Prohibit"}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>}
            
        </Dialog>
    )
}
