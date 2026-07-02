import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Home = () => {
  const authCtx = useContext(AuthContext)
  return (
    <div>{authCtx?.username}</div>
  )
}

export default Home