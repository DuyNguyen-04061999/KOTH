import { Box, Grid, Typography } from "@mui/material";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import { popup } from "../../../../utils/images";
import "./index.scss"
import FullScreenDialog from "../../../FullScreenDialog";
import { useDispatch, useSelector,
  } from "react-redux";
import { toggleDialogPromote } from "../../../../redux-saga-middleware/reducers/paymentReducer";
import { getStripe } from "../../../../redux-saga-middleware/reducers/stripeReducer";
import { formatMoney } from "../../../../utils/helper";
import { useState } from "react";

export default function WalletTypePromote() {
  const { width, height } = useWindowDimensions();
  const dispatch = useDispatch()
  const { userGold } = useSelector(
    (state) => state.authReducer
  );

  const [amount, setAmount] = useState(0)

  return (
    <>
      <Box
        className="position-relative"
        sx={{
          backgroundImage: `url(${popup.proWallet})`,
          width: "100%",
          height: "100%",
        }}
      >
        <FullScreenDialog />
        <Box
          sx={{
            minHeight: width < 576 ? "1000px" : "unset",
            maxHeight: width < 576 ? "unset" : height - 100,
            backgroundImage: `url(${popup.proWallet})`,
            backgroundRepeat:"no-repeat",
            backgroundSize:"cover",
            backgroundPosition:"center",
            padding: "25px",
          }}
        >
          <Box className="text-white d-flex justify-content-center align-items-center">
            <Typography variant="h6" className="me-2" sx={{fontWeight:"lighter !important"}}>
              Wallet
            </Typography>
            <img src={popup.walletopen} alt="..." width={23} height={23} />
          </Box>
          <Box sx={{
            paddingBottom:"20px",
            paddingTop:"20px"
          }}>
            <form action="" className="d-flex flex-column">
              <span className="text-white pb-2" style={{fontSize:"13px",fontWeight:"lighter !important"}}>
                My wallet
              </span>
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <input type="text" className="w-100"  defaultValue={userGold &&
                    Number.parseFloat(userGold) > 0 &&
                    formatMoney(Number.parseFloat(userGold))} style={{
                    borderRadius:"10px",
                    border:"1px solid gray",
                    height:"40px",
                    fontSize:"15px",
                    background:"#120f1d",
                    paddingLeft:"10px",
                    color:"white"
                }}/>
                <img src={popup.coin2} alt="..." width={25} height={25} style={{
                    position:"absolute",
                    top: 7, 
                    right: 15
                }}/>
              </Box>
            </form>
          </Box>
          <Box sx={{
            paddingBottom:"20px",
            paddingTop:"20px"
          }}>
            <Grid container columnSpacing={1}>
              <Grid item xs={5}>
                <form action="" className="d-flex flex-column">
                  <label htmlFor="" className="text-white pb-2" style={{fontSize:"13px",fontWeight:"lighter !important"}}>
                    Currency
                  </label>
                  <input type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e?.target?.value)} style={{
                     borderRadius:"10px",
                     border:"1px solid gray",
                     height:"40px",
                     fontSize:"15px",
                     background:"transparent",
                     paddingLeft:"10px",
                     color:"white"
                  }}/>
                </form>
              </Grid>
              <Grid item xs={7}>
                <form action="" className="d-flex flex-column">
                  <label htmlFor="" className="text-white pb-2" style={{fontSize:"13px",fontWeight:"lighter !important"}}>
                    Amount
                  </label>
                  <input type="text" placeholder="USD" disabled style={{
                     borderRadius:"10px",
                     border:"1px solid gray",
                     height:"40px",
                     fontSize:"15px",
                     background:"transparent",
                     paddingLeft:"10px",
                     color:"white"
                  }}/>
                </form>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{
            paddingBottom:"50px",
            paddingTop:"10px"
          }}>
            <Box className="text-white d-flex justify-content-between">
              <Typography variant="body1" sx={{fontSize:"15px", fontWeight:"lighter !important"}}>Amount</Typography>
              <Typography variant="body2" sx={{fontSize:"15px", fontWeight:"lighter !important"}}>{userGold && userGold > 0 && formatMoney(Number.parseFloat(userGold + Number.parseFloat(amount)))} USD</Typography>
            </Box>
            <Box className="text-white d-flex justify-content-between" sx={{marginBottom:"20px"}}>
              <Typography variant="body1" sx={{fontSize:"12px", color:"gray",fontWeight:"lighter !important"}}>Amount</Typography>
              <Typography variant="body2" sx={{fontSize:"12px", color:"gray",fontWeight:"lighter !important"}}>{userGold && userGold > 0 && formatMoney(Number.parseFloat(userGold + Number.parseFloat(amount)))} USD</Typography>
            </Box>
            <Box className="text-white d-flex justify-content-between">
              <Typography variant="body1" sx={{fontWeight:"lighter !important"}}>Amount</Typography>
              <Typography variant="body2" sx={{fontWeight:"lighter !important"}}>{userGold && userGold > 0 && formatMoney(Number.parseFloat(userGold + Number.parseFloat(amount)))} USD</Typography>
            </Box>
          </Box>
          <Box sx={{
            paddingTop:"10px",
            paddingBottom:"30px",
            position:"relative"
          }}>
            <form action="" className="d-flex flex-column" style={{position:"relative"}}>
              <label htmlFor="" className="text-white mb-2" style={{fontSize:"13px",fontWeight:"lighter !important"}}>
                Payment method
              </label>
              <input type="text" className="w-100" defaultValue="Stripe" disabled style={{
                 borderRadius:"10px",
                 border:"1px solid gray",
                 height:"40px",
                 fontSize:"15px",
                 background:"transparent",
                 paddingLeft:"10px",
                 color:"#642CDA"
              }}/>
              <input type="radio" className="radio-check" style={{
                position:"absolute",
                top:40,
                right:20,
              }} 
                onClick={() => {
                  dispatch(toggleDialogPromote(true))
                }}
              />
            </form>
          </Box>
          <Box className="d-flex align-items-start" sx={{
            paddingTop:"10px",
            paddingBottom:"30px"
          }}>
            <input type="checkbox" className="me-2 mt-1" style={{borderRadius:"50px"}} checked readOnly/>
            <Box className="text-white" sx={{fontSize:"14px",fontWeight:"lighter !important"}}>
              I agree with Interchain{" "}
              <span style={{ color: "#A57FF6", fontSize:"14px",fontWeight:"lighter !important" }}>Terms & Agreement</span>{" "}
              services.
            </Box>
          </Box>
          <Box>
            <button
              style={{
                color: "white",
                width: "100%",
                height: "45px",
                borderRadius: "4px",
                border: "none",
                outline: "none",
                fontWeight: "bolder",
                backgroundImage: "linear-gradient(#893aef,#7547ee)",
                fontSize:"15px"
              }}
              onClick={() => {
                dispatch(getStripe(Number.parseFloat(amount)))
              }}
            >
              Continue
            </button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
