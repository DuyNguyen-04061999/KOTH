import { useDispatch, useSelector } from "react-redux"

export default function TicketCheckOut () {
    const {isCheckWallet} = useSelector((state) => state.walletReducer)
    const dispatch = useDispatch()
    return <>
        
    </>
}