import React from 'react'
import ReactDOM from 'react-dom/client'
import './shared/style/index.scss'
import { RouterProvider } from 'react-router-dom'
import Routes from './shared/infra/http/Router.tsx/Routes'
import { MyContextProvider } from './shared/context/ContextApi'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ToastContainer />
    <MyContextProvider>
      <RouterProvider router={Routes} />
    </MyContextProvider>
  </React.StrictMode>,
)
