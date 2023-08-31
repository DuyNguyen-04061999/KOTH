import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom'
import _socket from '../../redux-saga-middleware/config/socket';
import Web3 from "web3"
import { useDispatch } from 'react-redux';
import { showAlert } from '../../redux-saga-middleware/reducers/alertReducer';

export default function TransactionDetailPage() {
    const params = useParams()
    const { id } = params
    const location = useLocation();
    const useQuery = () => new URLSearchParams(location.search);
    const query = useQuery();
    const [process, setProcess] = useState(true)
    
    const [socket, setSocket] = useState(null)
  
    const dispatch = useDispatch();

    useEffect(() => {
      setSocket(_socket)
    }, [])
    
    useEffect(() => {
      socket?.emit("checkTransactionId", {  transactionId: id })
    }, [id, socket])

    useEffect(() => {
        async function sendToken(transaction) {
          try {
            let web3 = new Web3(window.ethereum)
            await window.ethereum.enable();
            let accounts = await web3.eth.getAccounts()
            let account = accounts[0]
            
            if (web3.currentProvider.isConnected()) {
              console.log("Metamask connected !");
            } else {
              console.log("Metamask disconnected !");
            }
      
            socket?.emit("updateDepositTransactionQr", {
              type: "process",
              transactionId: id,
              userId: query?.get("token")
            })
      
            let contract = new web3.eth.Contract(JSON.parse(transaction?.transactionAbi), transaction?.transactionContract)
            let depositAmount = (transaction?.transactionQuantity) + "00000000";
      
            if(!transaction?.transactionScanQr || transaction?.transactionScanQr) {
              let result = await contract.methods.transfer(transaction?.transactionWallet, depositAmount).send({ from: account })
      
              if(result) {
                  socket?.emit("updateDepositTransactionQr", {
                    type: "confirm",
                    transactionId: id,
                    tid: id,
                    txh: result?.transactionHash,
                    userId: query?.get("token")
                  })
                  return result;
                } else {
                  socket?.emit("updateDepositTransactionQr", {
                    type: "error",
                    transactionId: id,
                    userId: query?.get("token")
                  })
                }
            }
              setProcess(false)
          } catch (error) {
            socket?.emit("updateDepositTransactionQr", {
              type: "error",
              transactionId: id,
              userId: query?.get("token")
            })
            setProcess(false)
          }

        return false
      }
      
      socket?.on("checkTransactionIdSuccess", async (transaction) => {
        await sendToken(transaction)
      })

      socket?.on("updateDepositTransactionQrSuccess", async () => {
        setProcess(false)
      })

      socket?.on("error", async (data) => {
        setProcess(false)
        dispatch(showAlert("error", data))
      })

      socket?.on("warning", async (data) => {
        setProcess(false)
        dispatch(showAlert("warning", data))
      })

      return () => {
        socket?.off("checkTransactionIdSuccess")
        socket?.off("error")
        socket?.off("warning")
        socket?.off("updateDepositTransactionQrSuccess")
      }
    }, [socket, query, id, dispatch])

    return (
      <div className='text-white p-2'>
          {process ? "Processing" : "Done!"}
      </div>
    )
}
