import { useContext, useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router'
import { AuthContext } from '../context/AuthContext'

export function LoginRequired() {
  const authCtx = useContext(AuthContext)

  if (authCtx?.isLoading) {
    return null;
  }

  if (!authCtx?.isAuthenticated) {
    return (
      <Navigate to="/login" replace />
    )
  }
  

  return (
    <Outlet />
  )
}