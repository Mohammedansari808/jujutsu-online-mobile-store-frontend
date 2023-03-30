import React, { useState, useEffect, useLayoutEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useContext } from "react";
import CheckoutForm from "./CheckoutForm";
import "./paymentpage.css"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { contxt } from "../../App";
import { fullLink } from "../link";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51MV6exSC4rEaEZLNvOofe5me2XVjOKrd591BK8SFWEVXrKi0GyHtlqeybQKMZ6aRU3zC7fu9XqciET57jh73ys9500glma6aLV");

export default function PaymentPage(props) {
    //authentication
    const token = localStorage.getItem("token")
    const email = localStorage.getItem("email")
    const username = localStorage.getItem("username")
    const [clientSecret, setClientSecret] = useState("");
    const { product, address } = useContext(contxt)

    //creating separate token for payment success
    useEffect(() => {
        fetch(`${fullLink}/onetimetoken`, {
            method: "GET",
            headers: {
                "x-auth-token": token
            }
        }).then(res => res.json())
            .then(res => localStorage.setItem("ot-auth-token", res.token))
            .catch(err => console.log(err))


        toast.success("use 4242 4242 4242 4242 card no for testing", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false
        })


        const finaldata = {
            product: product,
            address: address,
            email: email,

        }
        //return_url in checkoutform reloads page so address,product data stored in session storage
        sessionStorage.setItem("mob_data", JSON.stringify(finaldata))

        // Create PaymentIntent as soon as the page loads
        fetch(`${fullLink}/pay`, {
            method: "POST",
            headers: {
                "x-auth-token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(finaldata),
        })
            .then((res) => res.json())
            .then((data) => { (setClientSecret(data.clientSecret)); })
            .catch(err => console.log(err));


    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="payment" style={{ display: "flex", justifyContent: "center" }}>
            {clientSecret && (
                <Elements className="appse" options={options} stripe={stripePromise}>
                    <CheckoutForm username={username} />
                    {/* email={email} username={username} token={token} role_id={role_id} */}
                </Elements>
            )}
        </div>
    );
}