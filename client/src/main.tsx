import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Dashboard from './pages/Dashboard.tsx'
import MyWikis from './pages/MyWikis.tsx'
import Home from './pages/Home.tsx'

const router = createBrowserRouter([
  {
    path: "/", element:<App />,
    children: [
      {index: true, element:<Home/>},
      {path: "/dashboard", element:<Dashboard/>},
      {path: "/dashboard/wikis", element:<MyWikis/>},
  ]
}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
