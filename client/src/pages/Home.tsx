import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Home = () => {
  const authCtx = useContext(AuthContext)
  console.log(authCtx?.isAuthenticated)
  return (
    <div>Your auth status is {String(authCtx?.isAuthenticated)}</div>
  )
}

export default Home