import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Home = () => {
  const authCtx = useContext(AuthContext)
  return (
    <div>What's up, {authCtx?.username}
          {String(authCtx?.isAuthenticated)}
    </div>
  )
}

export default Home