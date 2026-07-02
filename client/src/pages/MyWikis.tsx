import React from 'react'
import { requireLogin } from '../utils/LoginRequired'


function MyWikis() {
  requireLogin()
  return (
    <div>MyWikis</div>
  )
}

export default MyWikis