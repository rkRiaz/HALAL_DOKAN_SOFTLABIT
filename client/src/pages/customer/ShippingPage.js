import React, { useState, useEffect } from 'react'
import './ShippingPage.css'
import { } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Form, Alert } from 'react-bootstrap'
import { GoLocation } from 'react-icons/go'
import { AiOutlineUser, AiOutlinePhone, AiOutlineMail } from 'react-icons/ai'
import axios from 'axios'
import {connect} from 'react-redux'
import {loginSideBar} from '../../store/actions/sideBarAction'
import { orderAction } from '../../store/actions/busketActions'

function ShippingPage(props) {
    const [values, setValues] = useState({
        name: '',
        phone: '',
        address: '',
        email: '',
        error: {}
    })
    const [subTotal, setSubTotal] = useState('')

    const history = useHistory()

    useEffect(() => {
        props.loginSideBar()
        setSubTotal(props.busket.order.subTotal)
        axios.get(`/api/customer/loginCustomerInfo`, {
            headers: {
                Authorization: `Bearer ${props.customer.customerToken}`
            }
        }) 
        .then(res => {
            console.log(res.data.customerInfo)
            setValues({
                ...values,
                name: res.data.customerInfo.name,
                phone: res.data.customerInfo.phone,
                address: res.data.customerInfo.address,
                email: res.data.customerInfo.email
            })
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        props.orderAction({
            customerId: props.customer.customerLoggedIn ? props.customer.customerInfo._id : '',
            shippingInformation: {
                name: values.name,
                phone: values.phone,
                address: values.address,
                email: values.email,
            }})
    }, [values])


    const change = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };

    const submit = e => {
        alert('Shipping Information Submitted')
        history.push('/paymentInformation')
    }

    return (
        <div className="shipping">
            {/* <Alert variant='success' className="text-center" style={{"fontSize": "20px"}}>
                        Login Success
                    </Alert> */}
         
                {props.customer.customerLoggedIn ? 
                <Alert variant='success' className="shipping__notification">
                    <p>Dear {values.name ? values.name : "John Doe"}...<br />
                    You can change your shipping information</p>
                </Alert> 
                : ""   
            }
                
            <div className="shipping__content">
                <Form onSubmit={submit} className="shipping__contentForm">
                    <h3>SHIPPING INFORMATION</h3>
                    <div className="shipping__contentFormInputs">
                        <Form.Group controlId="formGroupEmail" className="shipping__contentFormGroup">
                            <Form.Label>Full Name *</Form.Label>
                            <Form.Control required onChange={change('name')} isInvalid={values.error.name ? true : false} className="shipping__contentInput" type="text" value={values.name ? values.name : ''} />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {values.error.name ? values.error.name : ""}
                            </Form.Control.Feedback>
                            <AiOutlineUser className="shipping__contentFormIcon" />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword" className="shipping__contentFormGroup">
                            <Form.Label>Phone *</Form.Label>
                            <Form.Control required onChange={change('phone')} isInvalid={values.error.phone ? true : false} className="shipping__contentInput" type="number" value={values.phone ? values.phone : ''} />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {values.error.phone ? values.error.phone : ""}
                            </Form.Control.Feedback>
                            <AiOutlinePhone className="shipping__contentFormIcon" />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword" className="shipping__contentFormGroup">
                            <Form.Label>Email </Form.Label>
                            <Form.Control onChange={change('email')} isInvalid={values.error.email ? true : false} className="shipping__contentInput" type="text" value={values.email ? values.email : ''} />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {values.error.email ? values.error.email : ""}
                            </Form.Control.Feedback>
                            <AiOutlineMail className="shipping__contentFormIcon" />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword" className="shipping__contentFormGroup">
                            <Form.Label>Address *</Form.Label>
                            <Form.Control required onChange={change('address')} isInvalid={values.error.address ? true : false} className="shipping__contentInput" type="text" value={values.address ? values.address : ''} />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {values.error.address ? values.error.address : ""}
                            </Form.Control.Feedback>
                            <GoLocation className="shipping__contentFormIcon" />
                        </Form.Group>
                    </div>
                    <Button className="btn btn-success p-2 mt-3" type="submit">SELECT PAYMENT METHOD</Button>
                </Form>
                <div>
                    <div className="shipping__contentOrderSummery">
                        <h4 className="mb-4">Order Summary</h4>
                        <div className="d-flex justify-content-between">
                            <div className="">Subtotal</div>
                            <div className="text-danger">&#2547;{subTotal ? subTotal : ''}</div>
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                            <div className="">Shiping cost</div>
                            <div className="text-danger">&#2547;0</div>
                        </div>
                        <div className="shipping__contentOrderSummeryTotal d-flex justify-content-between mt-3">
                            <div className="">Total cost</div>
                            <div className="text-danger">&#2547;{subTotal ? subTotal : ''}</div>
                        </div>
                    </div>
                </div>

            </div>
    
            {/* shipping__content ends */}
        </div>

    )
}

const mapStateToProps = state => ({
    customer: state.customer,
    busket: state.busket
})

export default connect(mapStateToProps, {loginSideBar, orderAction})(ShippingPage)

