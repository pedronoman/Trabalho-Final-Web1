import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css' // Garante que é o style.css (onde configuraste o Tailwind)
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Em vez de <Library />, usamos o RouterProvider */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)