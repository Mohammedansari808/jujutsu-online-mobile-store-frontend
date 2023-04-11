
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { fullLink } from '../link'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import { contxt } from '../../App';
import { toast } from 'react-toastify';

function Products() {
    const navigate = useNavigate()
    //authentication
    const token = localStorage.getItem("token")
    const [mobiles, setMobiles] = useState([])
    const role_id = localStorage.getItem("role_id")

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
    //after clearing search bar to rerender
    const filterRefresh = () => {
        fetch(`${fullLink}/products`, {
            method: 'GET',
            headers: {
                "x-auth-token": token
            }
        })
            .then(data => data.json())
            .then(res => { setMobiles(res) })
    }
    const handleChange = (event) => {

        const value = event.target.value
        const valueSplit = value.split("")
        if (valueSplit.length) {
            //filtering using includes and map into new array to show the datas which has same letter
            //word
            let filterData = mobiles.filter(res => {
                return (res.phone_name.toLowerCase().includes(value))
            }).map(filteredName => {
                return filteredName
            })
            setMobiles(filterData)

        } else {
            // it is for after full backspace to show full data in the page
            filterRefresh()
        }
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <TextField label="Filter"
                    id="outlined-size-small"
                    size="small"
                    sx={{ backgroundColor: "white", border: "1px solid white", borderRadius: "5px", width: "200px" }}
                    type="text" onChange={handleChange} />

                {role_id == 6298 ?
                    <Button style={{ marginLeft: "35px", marginRight: "5px" }} sx={{
                        backgroundColor: "rgb(234 186 248)", '&:hover': {
                            backgroundColor: "black", color: "whitesmoke"
                        }
                    }} onClick={() => (navigate("/addproducts"))} variant="contained">Add Product</Button>
                    : null
                }
            </div>

            <div className='phone-list-container'>
                {
                    mobiles.map((mobile, ind) => (<Mobiles key={ind} mobile={mobile} mobiles={mobiles} setMobiles={setMobiles} />))
                }
            </div>
        </div>

    )
}

function Mobiles({ mobile, mobiles, setMobiles }) {
    const { setProduct } = useContext(contxt)
    const token = localStorage.getItem("token")
    const role_id = localStorage.getItem("role_id")
    const handleDelete = (id) => {
        const filData = mobiles.filter((mob) => mob._id != id)
        setMobiles(filData)
        fetch(`${fullLink}/products/deleteproduct/${id}`, {
            method: "DELETE",
            headers: {
                "x-auth-token": token
            }
        })
            .then(data => data.json())
            .then(res => {
                if (res.message == "successfully deleted") {
                    toast.success("successfully deleted")
                }
            })


    }
    const navigate = useNavigate()
    return (
        <div>

            <div className='phone-container'>
                <img alt={mobile.model} className='phone-picture' height={150} width={150} src={mobile.phone_picture} />
                <div className='phone-name' style={{ margin: "0" }}>{mobile.phone_name}</div>
                <div className='phone-company' style={{ margin: 0 }}>{mobile.phone_model}</div>
                {mobile.phone_offer > 0 ? (
                    <>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <h4 style={{ fontSize: "15px" }}>Rate : <span style={{ textDecoration: "line-through" }}>₹{mobile.phone_rate}</span></h4>
                            <h4 style={{ fontSize: "17px", marginLeft: "7px", color: "red" }}>₹{mobile.phone_rate - (mobile.phone_rate * mobile.phone_offer / 100)}</h4>

                        </div>
                        <div>
                            <div style={{ fontWeight: "bold", backgroundColor: "orange", marginBottom: "15px", padding: "5px", boxShadow: "1px 1px 5px black" }}>{mobile.phone_offer}% offer</div>
                            <div><span style={{ color: "orange" }}>Save Upto</span> <b>₹{mobile.phone_rate - (mobile.phone_rate - (mobile.phone_rate * mobile.phone_offer / 100))}</b></div>
                        </div>
                    </>


                ) : <h4>Rate : {mobile.phone_rate}</h4>}

                <p style={{ margin: 1, padding: 0 }}><b>RAM </b>: {mobile.phone_ram}GB</p>
                <p style={{ margin: 1, padding: 0 }}><b>ROM</b> : {mobile.phone_rom}GB</p>

                {role_id == 6298 ? (<div style={{ paddingBottom: "15px", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                    <Button color="success" onClick={() => { navigate(`/editproducts/${mobile._id}`) }} variant="contained"><EditIcon /></Button>
                    <Button variant="contained" onClick={() => handleDelete(mobile._id)} color="error"><DeleteIcon /></Button>
                </div>) : null}
                <Button sx={{
                    color: "white", backgroundColor: "rgb(234 150 248)", '&:hover': {
                        backgroundColor: "black", color: "whitesmoke"
                    }
                }} style={{ margin: "10px" }} onClick={() => { setProduct(mobile); navigate("/shipping-address") }}>Buy Product</Button>
            </div>

        </div>

    )
}

export default Products