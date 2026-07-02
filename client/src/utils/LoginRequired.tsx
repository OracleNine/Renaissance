import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'
import { AuthContext } from '../context/AuthContext'

export function LoginRequired() {
  const authCtx = useContext(AuthContext)

  if (!authCtx?.isAuthenticated) {
    return (
      <Navigate to="/login" replace />
    )
  }

  return (
    <Outlet />
  )
}