import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from "yup"
import React, { useContext } from 'react'
import { contxt } from '../../App'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const bookVali = Yup.object({
    city: Yup.string().min(3, "please enter a valid city").required("Please fill the city"),
    address: Yup.string().min(10, "Enter complete address").required("Please Fill")
})
function ShippingAddress() {

    const { setAddress } = useContext(contxt)
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            state: "Tamil Nadu",
            city: "",
            address: ""
        }, validationSchema: bookVali, onSubmit: (values) => {
            const data = {
                state: values.state,
                city: values.city,
                address: values.address
            }
            setAddress(data)
            //navigating to payment
            toast.warning("Please dont reload!!! navigating to Payments")
            navigate("/payment")
        }
    })
    return (
        <div><h4>ShippingAddress</h4>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <form className='phone-container' style={{ width: "200px", padding: "15px", margin: "20px" }} onSubmit={formik.handleSubmit}>
                    <TextField onBlur={formik.handleBlur} disabled={true} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                        name="state" label="state" onChange={formik.handleChange}
                        value={formik.values.state} variant="standard" />
                    <div style={{ color: "red", fontSize: "15px", marginLeft: "10px" }}>
                        {formik.touched.state && formik.errors.state ? formik.errors.state : null}
                    </div>

                    <TextField onBlur={formik.handleBlur} name="city" onChange={formik.handleChange} value={formik.values.city} label="city" variant='standard' />
                    <div style={{ color: "red", fontSize: "15px", marginLeft: "10px" }}>
                        {formik.touched.city && formik.errors.city ? formik.errors.city : null}
                    </div>
                    <TextField variant="standard" name="address" onBlur={formik.handleBlur} onChange={formik.handleChange} label="address" value={formik.values.address} />
                    <div style={{ color: "red", fontSize: "15px", marginLeft: "10px" }}>{formik.touched.address && formik.errors.address ? formik.errors.email : null}</div>
                    <Button style={{ margin: "10px" }} type="submit" variant="contained">Submit</Button>

                </form>
            </div>
        </div>

    )
}

export default ShippingAddress