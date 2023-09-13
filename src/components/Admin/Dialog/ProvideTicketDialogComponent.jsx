import React, { useRef } from 'react'
import { Box, Button, Dialog, Typography } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close"

const bg = "rgba(228, 228, 228, 0.2967)"
// const borderRadius = 12

export default function ProvideTicketDialogComponent(props) {
    const { account, customerTicket, availableTicket } = props
    const handleSubmit = (e) => {
      e.preventDefault()
    }

    const rechargeInputRef = useRef(null)
    const [focusedRechargeInput, setFocusedRechargeInput] = React.useState(false)
    const onFocusRechargeInput = () => setFocusedRechargeInput(true)
    const onBlurRechargeInput = () => setFocusedRechargeInput(false)

    return (
      <Dialog open={false} sx={{
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
        <Box component={"div"} className='p-2 ps-4 pe-4'>
          <Box component={"div"} className='d-flex justify-content-between mt-4 mb-5'>
              <Typography component={"h1"} sx={{
                fontWeight: 550,
                fontSize: 24,
                lineHeight: "32px"
              }}>
                Provide Tickets
              </Typography>
              <Box component={"div"} className='rounded-circle p-2' sx={{
                  boxShadow: "1px 20px 25px 5px #E4E4E4"
                }}>
                <CloseIcon  sx={{
                  
                }}/>
              </Box>
          </Box>
          <Box component={"form"} onSubmit={handleSubmit}>
              <Box component={"div"} className='rounded p-2 ps-3 pe-3 mt-2' sx={{
                backgroundColor: bg
              }}>
                <Box component={"div"}>
                  <Typography component={"span"} className='' sx={{
                    color: '#808191',
                    fontSize: 10,
                    lineHeight: "16px",
                    fontWeight: "700",
                    letterSpacing: "0.9px",
                    marginLeft: "0px !important",
                  }}>
                    ACCOUNT
                  </Typography>
                </Box>
                <Box component={"input"} value={account || "Account"} disabled className='pt-0 pb-2' sx={{
                  width: "100%",
                  border: 0,
                  padding: 0,
                  backgroundColor: "transparent",
                  color: '#11142D',
                  fontSize: 14,
                  fontWeight: "700",
                  ":focus": {
                    outline: "none"
                  },
                  "::placeholder": {
                    fontSize: 14
                  }
                }} placeholder='Account'>

                </Box>
              </Box>

              <Box component={"div"} className='rounded p-2 ps-3 pe-3 mt-3' sx={{
                backgroundColor: bg
              }}>
                <Box component={"div"}>
                  <Typography component={"span"} className='' sx={{
                    color: '#808191',
                    fontSize: 10,
                    lineHeight: "16px",
                    fontWeight: "700",
                    letterSpacing: "0.9px",
                    marginLeft: "0px !important",
                  }}>
                    CUSTOMER TICKETS
                  </Typography>
                </Box>
                <Box component={"input"} value={customerTicket || "Customer tickets"} disabled className='pt-0 pb-2' sx={{
                  width: "100%",
                  border: 0,
                  padding: 0,
                  backgroundColor: "transparent",
                  color: '#11142D',
                  fontSize: 14,
                  fontWeight: "700",
                  ":focus": {
                    outline: "none"
                  },
                  "::placeholder": {
                    fontSize: 14
                  }
                }} placeholder='Customer tickets'>

                </Box>
              </Box>

              <Box component={"div"} className='rounded p-2 ps-3 pe-3 mt-3' sx={{
                backgroundColor: bg,
              }}>
                <Box component={"div"}>
                  <Typography component={"span"} className='' sx={{
                    color: '#808191',
                    fontSize: 10,
                    lineHeight: "16px",
                    fontWeight: "700",
                    letterSpacing: "0.9px",
                    marginLeft: "0px !important",
                  }}>
                    AVAILABLE TICKETS
                  </Typography>
                </Box>
                <Box component={"input"} value={availableTicket || "Available tickets"} disabled className='pt-0 pb-2' sx={{
                  width: "100%",
                  border: 0,
                  padding: 0,
                  backgroundColor: "transparent",
                  color: '#11142D',
                  fontSize: 14,
                  fontWeight: "700",
                  ":focus": {
                    outline: "none"
                  },
                  "::placeholder": {
                    fontSize: 14
                  }
                }} placeholder='Available tickets'>

                </Box>
              </Box>

              <Box component={"div"} className='rounded p-2 ps-3 pe-3 mt-3' sx={{
                backgroundColor: bg,
                border: focusedRechargeInput ? "2px solid #355DFF" : "none"
              }}>
                <Box component={"div"}>
                  <Typography component={"span"} className='' sx={{
                    color: '#808191',
                    fontSize: 10,
                    lineHeight: "16px",
                    fontWeight: "700",
                    letterSpacing: "0.9px",
                    marginLeft: "0px !important",
                  }}>
                    RECHARGE TICKETS
                  </Typography>
                </Box>
                <Box component={"input"} className='pt-0 pb-2' sx={{
                  width: "100%",
                  border: 0,
                  padding: 0,
                  backgroundColor: "transparent",
                  color: '#4FBF67',
                  fontSize: 14,
                  fontWeight: "700",
                  ":focus": {
                    outline: "none"
                  },
                  "::placeholder": {
                    fontSize: 14
                  }
                }} ref={rechargeInputRef} onFocus={onFocusRechargeInput} onBlur={onBlurRechargeInput} placeholder='Input your ticket amount'>

                </Box>
              </Box>

              <Button className='mt-3 rounded mb-4 pt-2 pb-2' sx={{
                '&:hover': {
                  background:'#355DFF'
             },
                width: "100%",
                backgroundColor: "#355DFF",
                color: "#fff",
                fontSize: 14,
                fontStyle: "normal",
                textTransform: "none",
              }} type='submit'>
                Recharge
              </Button>
          </Box>
        </Box>

      </Dialog>
    )
}
