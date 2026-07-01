import React from 'react'

const LoginPage = () => {
  return (
    <>
    <div>LoginPage</div>
        <form>
            <input type="text" name="email" placeholder="Enter username" />
            <input type="password" name="password" placeholder="Enter password" />
            <button type="submit">Submit</button>
        </form>
    </>
  )
}

export default LoginPage