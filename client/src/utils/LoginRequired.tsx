import { useNavigate } from "react-router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export function requireLogin() {
  // Assume this made-up hook provides is a boolean value 
  // and its false if user not logged in
  const AuthCtx = useContext(AuthContext)
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!AuthCtx?.isAuthenticated) {
      // Redirect the user back to /login route
      navigate("/login", { replace: true } );
    }
  }, [AuthCtx?.isAuthenticated]);
}