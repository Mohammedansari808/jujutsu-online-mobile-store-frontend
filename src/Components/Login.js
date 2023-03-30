import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as Yup from "yup";
import { fullLink } from './link';
import { toast } from 'react-toastify';
import { contxt } from '../App';
const bookVali = Yup.object({
    username: Yup.string().min(3, "username or password is incorrect").required("Please fill the username"),
    password: Yup.string().min(4, "username or password is incorrect").required("Please fill the password")
})
function Login() {
    const [load, setLoad] = useState(false)
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        }, validationSchema: bookVali, onSubmit: async (values) => {
            setLoad(true)
            const loginInfo = {
                username: values.username,
                password: values.password
            }
            let data = await fetch(`${fullLink}/login`, {
                method: 'POST',
                body: JSON.stringify(loginInfo),
                headers: {
                    "Content-type": "application/json"
                }
            })
            let result = await data.json()
            if (result.message == "successful login") {
                localStorage.setItem("token", result.token)
                localStorage.setItem('role_id', result.role_id)
                localStorage.setItem("username", loginInfo.username)
                localStorage.setItem("email", result.email)
                toast.success("login successful")

                navigate(`/products`)
            } else {
                setLoad(false)
                toast.error("username Or password is wrong")


            }
        }
    })
    return (

        <div >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2 style={{ margin: "15px" }}>Login</h2>
                <Button sx={{
                    color: "white", backgroundColor: "rgb(208 179 248)", '&:hover': {
                        backgroundColor: "black", color: "whitesmoke"
                    }
                }} style={{ margin: "15px" }} onClick={() => navigate("/signup")} color="success" variant="contained">Signup</Button>

            </div>

            <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", alignContent: "flex-end" }}>

                <div>
                    <form style={{ padding: "40px", width: "400px", borderRadius: "7px", boxShadow: "2px 2px 20px black" }} onSubmit={formik.handleSubmit}>
                        <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                            name="username" label="Username" onChange={formik.handleChange}
                            value={formik.values.username} variant="standard" />
                        <div style={{ color: "red", fontSize: "15px", marginLeft: "10px" }}>
                            {formik.touched.username && formik.errors.username ? formik.errors.username : null}

                        </div>
                        <TextField type="password" onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                            name="password" label="Password" onChange={formik.handleChange}
                            value={formik.values.password} variant="standard" />
                        <div style={{ color: "red", fontSize: "15px", marginLeft: "10px" }}>
                            {formik.touched.password && formik.errors.password ? formik.errors.password : null}
                        </div>
                        <Button sx={{
                            backgroundColor: "rgb(252 181 157)", '&:hover': {
                                backgroundColor: "black", color: "whitesmoke"
                            }
                        }} style={{ marginTop: "8px" }} type="submit" color="success" variant="contained">{load ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}login</Button>

                    </form>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div></div>
                        <Button style={{ marginLeft: "10px", marginTop: "8px" }} onClick={() => navigate("/forgetpassword")} color="primary" >Forget Password</Button>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Login