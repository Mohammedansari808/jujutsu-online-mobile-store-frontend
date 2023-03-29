import { useFormik } from 'formik'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { fullLink } from '../link';
import * as Yup from "yup";
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';

function AddProducts() {
    const token = localStorage.getItem('token')
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
        phoneram: Yup.number().min(4, "ram should be above 4").required("Please fill"),
        phonerom: Yup.number().min(32, "rom should be above 32GB").required('Please fill'),
        phonerate: Yup.number().min(5000, "Please Enter a Rate").required("Please fill"),
        phoneoffer: Yup.number().max(100, "Please Enter the Offer").required("Please fill")
    })
    const formik = useFormik({
        initialValues: {
            phonepicture: "",
            phonename: "",
            phonemodel: "",
            phoneram: 4,
            phonerom: 32,
            phonerate: "",
            phoneoffer: 0
        }, validationSchema: bookVali, onSubmit: async (values) => {

            setLoad(true)
            const PhoneInfo = {
                phone_name: values.phonename,
                phone_model: values.phonemodel,
                phone_ram: values.phoneram,
                phone_rom: values.phonerom,
                phone_rate: values.phonerate,
                phone_picture: values.phonepicture,
                phone_offer: values.phoneoffer
            }
            let data = await fetch(`${fullLink}/products/addproducts`, {
                method: 'POST',
                body: JSON.stringify(PhoneInfo),
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": token
                }
            })
            console.log(PhoneInfo)
            let result = await data.json()
            if (result.message === "upload success") {
                toast.success("Product created successfully")
                values.phonename = ""
                values.phonemodel = ""
                values.phonerate = ""
                values.phonepicture = ""
                values.phoneoffer = 0
                values.phoneram = 4
                values.phonerom = 32
            } else {
                toast.error("Product already added. Please check!!")
            }
        }
    })
    return (
        <div style={{ display: "flex", justifyContent: 'center', marginTop: "150px" }}>
            <form style={{ padding: "40px", width: "400px", borderRadius: "7px", boxShadow: "2px 2px 20px black" }} onSubmit={formik.handleSubmit}>
                <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                    name="phonepicture" label="Image" onChange={formik.handleChange}
                    value={formik.values.phonepicture} variant="standard" />
                <div style={{ color: "red", fontSize: "15px", marginLeft: "10px" }}>
                    {formik.touched.phonepicture && formik.errors.phonepicture ? formik.errors.phonepicture : null}
                </div>
                <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                    name="phonename" label="Name" onChange={formik.handleChange}
                    value={formik.values.phonename} variant="standard" />
                <div style={{ color: "red", fontSize: "15px", marginLeft: "10px" }}>
                    {formik.touched.phonename && formik.errors.phonename ? formik.errors.phonename : null}
                </div>
                <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                    name="phonemodel" label="Model" onChange={formik.handleChange}
                    value={formik.values.phonemodel} variant="standard" />
                <div style={{ color: "red", fontSize: "15px", marginLeft: "10px" }}>
                    {formik.touched.phonemodel && formik.errors.phonemodel ? formik.errors.phonemodel : null}
                </div>
                <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                    name="phoneram" label="RAM in GB" onChange={formik.handleChange}
                    value={formik.values.phoneram} variant="standard" />
                <div style={{ color: "red", fontSize: "15px", marginLeft: "10px" }}>
                    {formik.touched.phoneram && formik.errors.phoneram ? formik.errors.phoneram : null}
                </div>
                <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                    name="phonerom" label="ROM in GB" onChange={formik.handleChange}
                    value={formik.values.phonerom} variant="standard" />
                <div style={{ color: "red", fontSize: "15px", marginLeft: "10px" }}>
                    {formik.touched.phonerom && formik.errors.phonerom ? formik.errors.phonerom : null}
                </div>
                <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                    name="phonerate" label="Rate" onChange={formik.handleChange}
                    value={formik.values.phonerate} variant="standard" />
                <div style={{ color: "red", fontSize: "15px", marginLeft: "10px" }}>
                    {formik.touched.phonerate && formik.errors.phonerate ? formik.errors.phonerate : null}
                </div>
                <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                    name="phoneoffer" label="Offer" onChange={formik.handleChange}
                    value={formik.values.phoneoffer} variant="standard" />
                <div style={{ color: "red", fontSize: "15px", marginLeft: "10px" }}>
                    {formik.touched.phoneoffer && formik.errors.phoneoffer ? formik.errors.phoneoffer : null}
                </div>
                <Button style={{ marginTop: "8px" }} type="submit" color="success" variant="contained">{load ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}Add Product</Button>
            </form>
        </div>
    )
}

export default AddProducts