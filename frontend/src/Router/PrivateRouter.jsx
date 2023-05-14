import React from 'react'
import { Navigate } from 'react-router'

const PrivateRouter = ({children}) => {
    const token = sessionStorage.getItem("sports-app-token")
    if (!token){
        return <Navigate to={"/auth"}/>
    }
  return (
    <>
        {children}
    </>
  )
}

export default PrivateRouter