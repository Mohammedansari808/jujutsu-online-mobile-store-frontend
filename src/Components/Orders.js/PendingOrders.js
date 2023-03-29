import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { fullLink } from '../link'

function PendingOrders() {
    const role_id = localStorage.getItem("role_id")
    const token = localStorage.getItem("token")
    const [allOrders, setAllOrders] = useState()
    function reload() {
        fetch(`${fullLink}/allorders`, {
            method: "GET",
            headers: {
                "x-auth-token": token
            }
        }).then((res) => res.json())
            .then(res => { setAllOrders(res); })
    }
    useEffect(() => {
        fetch(`${fullLink}/allorders`, {
            method: "GET",
            headers: {
                "x-auth-token": token
            }

        }).then((res) => res.json())
            .then(res => { setAllOrders(res) })
    }, [])
    const handleSubmit = (username, email, delivered, id) => {
        const finalData = {
            email: email,
            order: delivered,
            username: username,
            id: id

        }
        fetch(`${fullLink}/changestatus`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "x-auth-token": token
            },
            body: JSON.stringify(finalData)
        }).then(res => res.json())
            .then(res => {
                if (res.message == "success") {
                    toast.success("delivery status changed")
                    reload()
                } else {
                    toast.error("not changed")
                }
            })
    }
    return (
        <div style={{ width: 'auto' }} className='phone-container'>
            <h2>PendingOrders</h2>
            {role_id == 6298 ? (<div>{
                allOrders != undefined ? (allOrders.data.map((data) => {
                    return (
                        <div >
                            <div>username : <b>{data.username}</b></div>
                            <div>email :<b>{data.email}</b></div>
                            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                                {data.OrderData.map((order, ind) => {
                                    return (
                                        <>


                                            <div key={ind} style={{ width: "500px", margin: "20px" }} className='phone-container'>
                                                <img alt={order.product.model} className='phone-picture' height={150} width={150} src={order.product.phone_picture} />
                                                <h2 className='phone-name' style={{ margin: "0" }}>{order.product.phone_name}</h2>
                                                <h3 className='phone-company' style={{ margin: 0 }}>{order.product.phone_model}</h3>
                                                {order.product.phone_offer > 0 ? (
                                                    <>
                                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <h4 style={{ fontSize: "15px" }}>Rate : <span style={{ textDecoration: "line-through" }}>₹{order.product.phone_rate}</span></h4>
                                                            <h4 style={{ fontSize: "17px", marginLeft: "7px", color: "red" }}>₹{order.product.phone_rate - (order.product.phone_rate * order.product.phone_offer / 100)}</h4>

                                                        </div>
                                                        <div>
                                                            <div style={{ fontWeight: "bold", backgroundColor: "orange", marginBottom: "15px", padding: "5px", boxShadow: "1px 1px 5px black" }}>{order.product.phone_offer}% offer</div>
                                                            <div><span style={{ color: "orange" }}>Save Upto</span> <b>₹{order.product.phone_rate - (order.product.phone_rate - (order.product.phone_rate * order.product.phone_offer / 100))}</b></div>
                                                        </div>
                                                    </>


                                                ) : <h4>Rate : {order.product.phone_rate}</h4>}

                                                <p>RAM : {order.product.phone_ram}GB</p>
                                                <p>ROM : {order.product.phone_rom}GB</p>
                                                <div>
                                                    <p>Payment Status : {order.paid ? <b>PAID</b> : <b>NOT PAID</b>}</p>
                                                    <p>Ordered Status : {order.ordered ? <b>Order Success</b> : <b>Order Fail</b>}</p>
                                                    <p>Delivery Status : {order.delivered ? <b>Delivery success</b> : <b>Delivery Pending</b>}</p>
                                                    <Button style={{ margin: "7px" }} variant='success' onClick={() => { handleSubmit(data.username, data.email, order.delivered, data._id) }}>Change Delivery status</Button>
                                                </div>
                                                <div>
                                                    <details>
                                                        <summary style={{ fontWeight: "bolder", marginBottom: "10px" }}>Address</summary>
                                                        <p>{order.address.address},{order.address.city},{order.address.state}</p>
                                                    </details>
                                                </div>
                                            </div>

                                        </>

                                    )

                                })}
                            </div>
                        </div>
                    )
                })) : <div>Please wait...</div>
            }
            </div>) : <div>null</div>}
        </div>

    )
}

export default PendingOrders