import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { contxt } from '../../App';
import { fullLink } from '../link';
function Success() {
    const username = localStorage.getItem("username")
    const getData = sessionStorage.getItem("mob_data")
    const ot_token = localStorage.getItem("ot-auth-token")
    const data = JSON.parse(getData)
    const OrderData = {
        product: data.product,
        address: data.address
    }
    const navigate = useNavigate()
    useEffect(() => {

        const datas = fetch(`${fullLink}/orders/${username}`, {
            method: "POST",
            body: JSON.stringify(OrderData),
            headers: {
                "Content-type": "application/json",
                "ot-auth-token": ot_token

            }
        }).then((res) => res.json())
            .then(res => {
                if (res.message == "updated") {
                    localStorage.removeItem("ot-auth-token")
                    toast.success("Order Placed Check My Orders")
                    navigate("/products")
                } else {
                    console.log("Order not Placed")
                }
            })

    }, [username])

    toast.success("Please wait redirecting to store", { position: toast.POSITION.TOP_CENTER })

    // setTimeout(() => {
    //     navigate("/products")
    // }, 4000);

    return (
        <div>
            <h2 style={{ display: "flex", alignContent: "center", textAlign: "center" }}>Payment Success</h2>

        </div>

    )
}

export default Success