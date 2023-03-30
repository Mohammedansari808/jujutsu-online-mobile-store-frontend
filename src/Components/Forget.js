import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { display } from '@mui/system';
import { fullLink } from './link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Forget() {
    const [load, setLoad] = useState(false)
    //to change into please wait this hook is used
    const [vlink, setVlink] = useState("send verification link")
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            username: "",
            email: ""
        }, onSubmit: async (values) => {
            const userData = {
                username: values.username,
                email: values.email
            }
            setVlink("please wait")
            setLoad(true)

            let data = await fetch(`${fullLink}/forgetpassword`, {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    "Content-type": "application/json",

                }
            })

            const result = await data.json()
            console.log(result)

            if (result.message == "link sent") {
                toast.success("Verification sent to your mail please check", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: false
                })
                setLoad(false)
                setVlink("send verification link")
            } else {
                setLoad(false)
                setVlink("send verification link")
                toast.error("Please give correct email and username", {
                    position: toast.POSITION.TOP_LEFT,

                })

                navigate("/forgetpassword")
            }



        }
    })
    return (
        <>

            <div style={{ textAlign: "center" }}>
                <h1 style={{ textAlign: "center", marginTop: "15px" }}>Verification Link</h1>
            </div>
            <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", alignContent: "flex-end" }}>
                <form style={{ padding: "40px", width: "400px", borderRadius: "7px", boxShadow: "2px 2px 20px black", display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center" }} onSubmit={formik.handleSubmit}>
                    <TextField style={{ marginRight: "15px" }} id="standard-basic"
                        name="username" label="Enter username" onChange={formik.handleChange} value={formik.values.username}
                        variant="standard" /><br />
                    <TextField style={{ marginRight: "15px" }} id="standard-basic"
                        name="email" label="Enter email" onChange={formik.handleChange} value={formik.values.email}
                        variant="standard" />
                    <Button style={{ marginTop: "25px" }} type="submit" color="success" variant="contained">{load ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                        {vlink}  </Button>
                </form>
            </div>
        </>

    )
}

export default Forget