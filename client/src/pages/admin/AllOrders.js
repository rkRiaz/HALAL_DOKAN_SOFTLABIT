import React, { useState, useEffect } from 'react'
import './AllOrders.css'
import AdminLayout from './AdminLayout'
import axios from 'axios'
import "./AllOrders.css"
import Moment from 'react-moment';
import Loading from '../../components/Loading';
import {connect} from 'react-redux'


const AllOrders = (props) => {
    const [orders, setOrders] = useState('')
    const [message, setMessage] = useState('')


    useEffect(() => {
        axios.get("/api/order/all-orders", {
            headers: {
                'Administrator': `Bearer ${props.admin.adminToken}` 
            }
        })
        .then(res => {
            console.log(res.data.orders)
            setOrders(res.data.orders)
        })
        .catch(e => console.log(e))
}, [message, props.admin.adminToken])

    const updateStatus = (orderId, type) => e => {
        e.preventDefault()
        if(type == 'paid') {
            axios.put(`/api/order/update-order/${orderId}`, {
                paid: {
                    message: 'payment complete',
                    time: new Date()
                }
            })
            .then(res => {
                console.log(res.data.message)
                setMessage(res.data.message)
                alert(res.data.message)
            })
        } 
        if(type == 'delivered') {
            axios.put(`/api/order/update-order/${orderId}`, {
                delivered: {
                    message: 'Delivered',
                    time: new Date()
                }
            })
            .then(res => {
                console.log(res.data.message)
                setMessage(res.data.message)
                alert(res.data.message)
            })
        }
    }

    const removeOrder = orderId => e => {
        e.preventDefault()
        axios.delete(`/api/order/delete-order/${orderId}`)
        .then(res => {
            setMessage(res.data.message)
            alert(res.data.message)
        })
    }


    return (
        <AdminLayout>
             <div className="allOrders">
                    {
                        !orders ?  
                        <div className="loading">
                            <Loading/>
                        </div>
                        :
                        orders.length === 0 ?
                        <div className="">Sorry! No orders yet</div> :
                     
                       orders.map(order => (
                                <div key={order._id} className="allOrders__Items my-2">
                                    <div className={`${order.status.delivered.message ? 'bg-success': 'bg-info'} my-3 text-light p-4 d-flex justify-content-between h5`}>
                                        <div className="">{order._id}</div>
                                        <div className=""><Moment format="D MMMM, h:mm A" date={order.createdAt}/></div>
                                    </div>
                                    <div className="my-2 allOrders__Item">
                                        <div className="allOrders__ItemLeft">
                                            <div className="d-flex ">
                                                <div className="allOrders__customerInfo">
                                                    <div className="font-weight-bold h6 text-info mb-2">Customer Information</div>
                                                    <div className="">{order.customer.name}</div>
                                                    <div className="">{order.customer.phone}</div>
                                                    <div className="">{order.customer.address}</div>
                                                </div>
                                                <div className="allOrders__shippingInfo ml-5">
                                                    <div className="font-weight-bold h6 text-info mb-2">Shipping Information</div>
                                                    <div className="">{order.shippingInformation.name}</div>
                                                    <div className="">{order.shippingInformation.phone}</div>
                                                    <div className="">{order.shippingInformation.address}</div>
                                                </div>
                                            </div>
                                            <div className="allOrders__contentOrderSummery mt-5">
                                                <div className="font-weight-bold text-info">Order Summary</div>
                                                <div className="text-danger">Total &#2547;{order.subTotal}</div>
                                                <div className="">Payment method: {order.payment.method}</div>
                                            </div>
                                        </div>

                                    <div className="allOrders__ItemLRight pl-3">
                                        <div className="font-weight-bold h6 text-info">Products</div>
                                        {
                                        order.cart_products.map((cart_product, i) => (
                                            <div key={i}className="allOrders__product">
                                                <div className="allOrders__leftProductInfo">
                                                    <div className="mr-3">
                                                        <img width="70px" height="70px" src={`/uploads/images/${cart_product.productImage}`} alt="" />
                                                    </div>
                                                    <div className="">
                                                        <div className="">{cart_product.productName}</div>
                                                        <div className="" style={{ width: "100%" }}>{cart_product.quantity} * {cart_product.salePrice}</div>
                                                        <div className="">&#2547;{cart_product.salePrice * cart_product.quantity}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        
                                        ))
                                        }
                                    </div>

                                    <div className="allOrders__ItemLRight">
                                        <div className="timeline p-3">
                                                <div className="timeline__aglance">
                                                    <ul className="timeline__aglance__bar">
                                                        <li className={!order.status.paid.message  ? "li" : "li complete"}>
                                                            <div className="status">
                                                            <h4> Paid </h4>
                                                            </div>
                                                        </li>
                                                

                                                        <li className={!order.status.delivered.message  ? "li" : "li complete"}>
                                                            <div className="status">
                                                            <h4> Delivered </h4>
                                                            </div>
                                                        </li>
                                                    </ul>   
                                                </div>

                                        <div className="timeline__details">
                                            <div className="font-weight-bold h6 text-info">Order Timeline Details</div>
                                            {
                                                !order.status.delivered.message ? "" :
                                                <div className="box">
                                                    <div className="box-content">
                                                        <div className="title text-success">Delivered</div>
                                                        <div><Moment format="D MMMM, h:mm A" date={order.status.delivered.time}/></div>
                                                        <div className="message">{order.status.delivered.message ? order.status.delivered.message : "Product is delivered"}. If any issues conatct 017141xxxxx</div>
                                                    </div>
                                                </div>
                                                
                                            }
                                            {
                                                !order.status.paid.message ? "" :
                                                <div className="box">
                                                    <div className="box-content">
                                                        <div className="title text-success">Paid</div>
                                                        <div><Moment format="D MMMM, h:mm A" date={order.status.paid.time}/></div>
                                                        <div className="message">Payment Confirmed. Thank you for your order</div>
                                                    </div>
                                                </div> 
                                            }
                                        </div>
                                        
                                        <div className="updateStatus mt-3">
                                            <button onClick={updateStatus(order._id, 'paid')} className="btn btn-primary" disabled={order.status.paid.message ? 'false': ''} >Paid</button>
                                            <button onClick={updateStatus(order._id, 'delivered')} className="btn btn-primary mx-2" disabled={order.status.delivered.message ? 'false': ''}>Delivered</button>
                                            <button onClick={removeOrder(order._id)} className="btn btn-danger">Remove Order</button>


                                        </div>

                                    </div>
                                         
                                    </div>
                        
                                </div>
                                </div>
                    
                       ))
                           
                            
                        
                    }
                </div>
        </AdminLayout>
    )
}

const mapStateToProps = state => ({
    admin: state.admin,
})
export default connect(mapStateToProps)(AllOrders)

