import { useContext, useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router'
import { AuthContext } from '../context/AuthContext'

export function LoginRequired() {
  const authCtx = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect (() => {
    const checkAuth = async () => {
        if (!authCtx?.isAuthenticated) {
        return (
          navigate("/login", { replace: true })
        )
      }

      checkAuth()
    }
  }, [authCtx?.isAuthenticated])

  return (
    <Outlet />
  )
}