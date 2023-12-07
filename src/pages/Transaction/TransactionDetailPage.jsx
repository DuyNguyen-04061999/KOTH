import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import _socket from '../../redux-saga-middleware/config/socket';
// import Web3 from "web3"

export default function TransactionDetailPage() {
    const params = useParams()
    const { id } = params
    
    const [socket, setSocket] = useState(null)

    useEffect(() => {
      setSocket(_socket)
    }, [])
    
    useEffect(() => {
      socket?.emit("checkTransactionId", {  transactionId: id })
    }, [id, socket])

    return (
      <div className='text-white p-2'>
          {/* {process ? "Processing" : "Done!"} */}
      </div>
    )
}
