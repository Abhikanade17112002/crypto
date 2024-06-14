import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './Components/HomePage/Home.jsx'
import Coin from './Components/Coin/Coin.jsx'
import CoinContextProvider from './Context/CoinContext.jsx'
const route = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/coin/:coinId",
        element:<Coin/>
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CoinContextProvider>
   < RouterProvider router={route} />
   </CoinContextProvider>
  </React.StrictMode>,
)
