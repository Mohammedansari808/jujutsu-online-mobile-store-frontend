import React, { useContext, useState } from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';



function Logout() {
    const navigate = useNavigate()
    const role_id = localStorage.getItem("role_id")
    const [load, setLoad] = useState(false)
    const logout = () => {
        setLoad(true)
        localStorage.removeItem('token')
        localStorage.removeItem("role_id")
        localStorage.removeItem("username")
        localStorage.removeItem("email")
        navigate("/")
    }
    return (

        <div style={{ backgroundColor: "white", boxShadow: "2px 2px 10px black", marginBottom: "15px", borderRadius: "8px 2px 8px 2px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ marginLeft: "10px", }} >JUJUTSU STORE</h3>
            <div>
                <Button onClick={() => { navigate("/myorders") }} sx={{
                    backgroundColor: "rgb(77, 224, 243)", '&:hover': {
                        backgroundColor: "black", color: "whitesmoke"
                    }
                }} variant="contained">My Orders</Button>
                {role_id == 6298 ? <Button style={{ marginLeft: "5px", marginRight: "5px" }} sx={{
                    backgroundColor: "rgb(208 179 248)", '&:hover': {
                        backgroundColor: "black", color: "whitesmoke"
                    }
                }} onClick={() => (navigate("/pendingorders"))} variant="contained">Pending Orders</Button> : null}
                <Button sx={{
                    backgroundColor: "rgb(252 181 157)", '&:hover': {
                        backgroundColor: "black", color: "whitesmoke"
                    }
                }} style={{ margin: "10px", }} onClick={() => logout()} color="success" variant="contained">{load ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}logout</Button>

            </div>
        </div>

    )
}

export default Logout