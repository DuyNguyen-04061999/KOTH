import { jwtDecode } from "jwt-decode"

export const CheckToken = () => {
    const token = localStorage.getItem('token' || "")
    const handleCheckToken = () => {
        if(token) {
            const decode = jwtDecode(token)
            return decode
        }
    }
       
    return handleCheckToken()
}