import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { fullLink } from '../link';
import * as Yup from "yup";
import { useNavigate, useParams } from 'react-router-dom';
import { contxt } from '../../App';
function EditProduct() {
    //only accessible by admin
    // authentication
    const token = localStorage.getItem("token")
    const role_id = localStorage.getItem("role_id")

    const { mobiles } = useContext(contxt)
    const { id } = useParams()

    const navigate = useNavigate()

    const mobile = mobiles.filter((data) => data._id === id)
    const [load, setLoad] = useState(false)

    const bookVali = Yup.object({
        phonepicture: Yup.string()
            .matches(
                /((https?):\/\/)?(www.)?[a-z0-9]+/,
                'Enter a Valid url!'
            )
            .required('Please enter a URL'),
        phonename: Yup.string().min(3, "Please Enter a Mobile").required("Please fill"),
        phonemodel: Yup.string().min(1, "Please Enter a Model").required("Please fill"),
        phonerate: Yup.number().min(5000, "Please Enter a Rate").required("Please fill")
    })
    const formik = useFormik({
        initialValues: {
            phonepicture: mobile[0].phone_picture,
            phonename: mobile[0].phone_name,
            phonemodel: mobile[0].phone_model,
            phonerate: mobile[0].phone_rate,
            phoneoffer: mobile[0].phone_offer
        }, validationSchema: bookVali, onSubmit: async (values) => {
            setLoad(true)
            const PhoneInfo = {
                phone_name: values.phonename,
                phone_model: values.phonemodel,
                phone_rate: values.phonerate,
                phone_picture: values.phonepicture
            }
            let data = await fetch(`${fullLink}/products/updateproducts/${id}`, {
                method: 'PUT',
                body: JSON.stringify(PhoneInfo),
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": token
                }
            })
            let result = await data.json()
            if (result.message === "update success") {
                toast.success("Product Updated successfully")
                values.phonename = ""
                values.phonemodel = ""
                values.phonerate = ""
                values.phonepicture = ""
                navigate("/products")
            } else {
                toast.error("Product not Updated. Please check!!")
            }
        }
    })
    return (
        <div>
            {role_id == 6298 ? (<div style={{ display: "flex", justifyContent: "center", marginTop: "150px" }}>
                <form style={{ padding: "40px", width: "400px", borderRadius: "7px", boxShadow: "2px 2px 20px black" }} onSubmit={formik.handleSubmit}>
                    <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                        name="phonepicture" label="phonepicture" onChange={formik.handleChange}
                        value={formik.values.phonepicture} variant="standard" />
                    <div style={{ color: "red", fontSize: "15px", marginLeft: "10px" }}>
                        {formik.touched.phonepicture && formik.errors.phonepicture ? formik.errors.phonepicture : null}
                    </div>
                    <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                        name="phonename" label="phonename" onChange={formik.handleChange}
                        value={formik.values.phonename} variant="standard" />
                    <div style={{ color: "red", fontSize: "15px", marginLeft: "10px" }}>
                        {formik.touched.phonename && formik.errors.phonename ? formik.errors.phonename : null}
                    </div>
                    <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                        name="phonemodel" label="phonemodel" onChange={formik.handleChange}
                        value={formik.values.phonemodel} variant="standard" />
                    <div style={{ color: "red", fontSize: "15px", marginLeft: "10px" }}>
                        {formik.touched.phonemodel && formik.errors.phonemodel ? formik.errors.phonemodel : null}
                    </div>
                    <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                        name="phonerate" label="phonerate" onChange={formik.handleChange}
                        value={formik.values.phonerate} variant="standard" />
                    <div style={{ color: "red", fontSize: "15px", marginLeft: "10px" }}>
                        {formik.touched.phonerate && formik.errors.phonerate ? formik.errors.phonerate : null}
                    </div>
                    <TextField onBlur={formik.handleBlur} style={{ margin: "10px", width: "300px" }} id="standard-basic"
                        name="phoneoffer" label="phoneoffer" onChange={formik.handleChange}
                        value={formik.values.phoneoffer} variant="standard" />
                    <div style={{ color: "red", fontSize: "15px", marginLeft: "10px" }}>
                        {formik.touched.phoneoffer && formik.errors.phoneoffer ? formik.errors.phoneoffer : null}
                    </div>
                    <Button style={{ marginTop: "8px" }} type="submit" color="success" variant="contained">{load ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}Add Product</Button>
                </form>
            </div>) : <div>{null}</div>}
        </div>

    )
}

export default EditProduct