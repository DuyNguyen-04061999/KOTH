import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from "react-router-dom"

export default function SystemBalance() {
    const { tokenUser } = useSelector(state => state.userReducer)
    const navigate = useNavigate()

    useEffect(() => {
        const key = window.prompt("Please enter key!")
        if(key !== "somethingwenterror") {
            navigate("/")
        }
    }, [navigate])

    return (
        <>
            {!tokenUser ? <Navigate to={"/"}/> : (
                <div>SystemBalance</div>
            )}
        </>
    )
}
