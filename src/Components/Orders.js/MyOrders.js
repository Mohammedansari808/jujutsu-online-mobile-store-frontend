import React, { useEffect, useState } from 'react'
import { fullLink } from '../link'

function MyOrders() {
    const [myOrders, setMyOrders] = useState([])
    //authentication
    const token = localStorage.getItem("token")
    const username = localStorage.getItem('username')

    //to fetch orders from the users
    useEffect(() => {
        const data = fetch(`${fullLink}/orderdata/${username}`, {
            method: "GET",
            headers: {
                "x-auth-token": token
            }
        }).then((res) => res.json())
            .then((res) => {
                setMyOrders(res.data)
            })
    }, [])
    return (
        <div>
            <h2>MyOrders</h2>
            <div>
                {myOrders.map((order, ind) => {
                    return (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            {ind % 2 === 0 ? (

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
                                    </div>
                                </div>
                            ) : null}
                        </div>

                    )

                })}

            </div>
        </div>

    )
}

export default MyOrders