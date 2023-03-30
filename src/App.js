import './App.css';
import { createContext, useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"

import Signup from './Components/Signup';
import Login from './Components/Login';
import Verification from './Components/Verification';
import VerifyComplete from './Components/VerifyComplete';
import Forget from './Components/Forget';
import PasswordChange from './Components/PasswordChange';
import { fullLink } from './Components/link';
import AddProducts from './Components/store CRUD/AddProducts';
import EditProduct from './Components/store CRUD/EditProduct';
import Products from './Components/store CRUD/Products';
import PaymentPage from './Components/Payment/PaymentPage';
import Success from './Components/Payment/Success';
import ShippingAddress from './Components/Payment/ShippingAddress';
import MyOrders from './Components/Orders.js/MyOrders';
import PendingOrders from './Components/Orders.js/PendingOrders';
import NotFound from './Components/NotFound';
import Logout from './Components/Logout';

export const contxt = createContext()
function App() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const [mobiles, setMobiles] = useState()
  const [product, setProduct] = useState()
  const [address, setAddress] = useState()
  useEffect(() => {
    fetch(`${fullLink}/products`, {
      method: 'GET',
      headers: {
        "x-auth-token": token
      }
    })
      .then(data => data.json())
      .then(res => { setMobiles(res); })



  }, [])
  return (
    <div className="App">
      <contxt.Provider value={{ mobiles, product, setProduct, address, setAddress }}>
        <ToastContainer />
        {token ? <Logout /> : null}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify_link/:username/:id" element={<VerifyComplete />} />
          <Route path="/verification-link/:username/:id" element={<Verification />} />
          <Route path="/password-change/:username" element={<Protectedroute><PasswordChange /></Protectedroute>} />
          <Route path="/forgetpassword" element={<Forget />} />
          <Route path="/editproducts/:id" element={<Protectedroute><EditProduct /></Protectedroute>} />
          <Route path="/products" element={<Protectedroute><Products /></Protectedroute>} />
          <Route path="/addproducts" element={<Protectedroute><AddProducts /></Protectedroute>} />
          <Route path="/payment" element={<Protectedroute><PaymentPage /></Protectedroute>} />
          <Route path="/payment-success" element={<Protectedroute><Success /></Protectedroute>} />
          <Route path="/shipping-address" element={<Protectedroute><ShippingAddress /></Protectedroute>} />
          <Route path="/myorders" element={<Protectedroute><MyOrders /></Protectedroute>} />
          <Route path="/pendingorders" element={<Protectedroute><PendingOrders /></Protectedroute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </contxt.Provider>

    </div>

  );
}









function Protectedroute({ children }) {
  const navigate = useNavigate()
  const isAuth = localStorage.getItem('token')
  const otAuth = localStorage.getItem("ot-auth-token")
  if (isAuth || otAuth) {
    return (
      children
    )
  } else {
    navigate("/login")
  }

}


export default App;
