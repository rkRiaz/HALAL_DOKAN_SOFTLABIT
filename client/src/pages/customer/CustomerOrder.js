import React, { useState, useEffect } from 'react'
import './CustomerOrder.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../store/actions/customerAction'

import home from '../../assets/icons/home.svg'
import rightArrow from '../../assets/icons/right-arrow.svg'
import axios from 'axios'
import Loading from '../../components/Loading'
import Moment from 'react-moment';


function CustomerOrder(props) {
    const [orders, setOrders] = useState('')

    useEffect(() => {
        axios.get(`/api/order/orders-by-customer-id`, {
            headers: {
                Authorization: `Bearer ${props.customer.customerToken}`
            }
        }) 
        .then(res => {
           setOrders(res.data.orders)
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div className="customerOrder">
            <div className="customerOrder__container">
            {/* customerOrderHeader starts */}
            <div className="customerOrder__header ">
                <Link to="/"><img src={home} alt=""/></Link>
                <img className="customerOrder__headerArrowIcon" src={rightArrow} alt=""/>
                <Link to="#">ORDERS</Link>
            </div>
            {/* customerOrder__header ends */}

            {/* customerOrder__headline starts */}
                <div className="customerOrder__headline">MY ORDERS</div>
            {/* customerOrder__headline ends */}
        
            <div className="customerOrder__content">
                <div className="customerOrder__left">
                    {
                        !orders ?  
                        <div className="loading">
                            <Loading/>
                        </div> :
                        orders.length === 0 ?
                        <div className="">Sorry! You have no order.<Link to="/"> TO make a order go to shop</Link></div> :
                     
                        orders.map(order => (
                            
                            <div className="customerOrder__Items my-2">
                                <div className={`${order.status.delivered.message ? 'bg-success': 'bg-info'} my-3 text-light p-4 d-flex justify-content-between h5`}>
                                    <div className="">{order._id}</div>
                                    <div className=""><Moment format="D MMMM, h:mm A" date={order.createdAt}/></div>
                                </div>
                                <div className="my-2 customerOrder__Item">
                                    <div className="customerOrder__ItemLeft">
                                        <div className="d-flex ">
                                            <div className="customerOrder__customerInfo">
                                                <div className="font-weight-bold h6 text-info mb-2">Customer Information</div>
                                                <div className="">{order.customer.name}</div>
                                                <div className="">{order.customer.phone}</div>
                                                <div className="">{order.customer.address}</div>
                                            </div>
                                            <div className="customerOrder__shippingInfo ml-5">
                                                <div className="font-weight-bold h6 text-info mb-2">Shipping Information</div>
                                                <div className="">{order.shippingInformation.name}</div>
                                                <div className="">{order.shippingInformation.phone}</div>
                                                <div className="">{order.shippingInformation.address}</div>
                                            </div>
                                        </div>
                                        <div className="customerOrder__contentOrderSummery mt-5">
                                            <div className="font-weight-bold text-info">Order Summary</div>
                                            <div className="text-danger">Total &#2547;{order.subTotal}</div>
                                            <div className="">Payment method: {order.payment.method}</div>
                                        </div>
                                    </div>

                                <div className="customerOrder__ItemLRight pl-3">
                                    <div className="font-weight-bold h6 text-info">Products</div>
                                    {
                                    order.cart_products.map(cart_product => (
                                        
                                        <div className="customerOrder__product">
                                            <div className="customerOrder__leftProductInfo">
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

                                <div className="customerOrder__ItemLRight">
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
                                                        <div className="message">{order.status.delivered.message ? order.status.delivered.message : "Product is delivered"}. If any issues contact<br/> Email: info@halaldokanbd.com<br/>
                                                            +8809604442121<br/>+8801755662121</div>
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


                                    
                        

                                </div>
                                     
                                </div>
                    
                            </div>
                            </div>
                
                   ))
                           
                            
                        
                    }
                </div>
                <div className="customerOrder__right">
                    <h3>ACCOUNT MENU</h3>
                    <div className="customerOrder__rightList">
                        <Link to ="/customerDashboard"> <img src={rightArrow} alt=""/> MY ACCOUNT</Link>
                        <Link to ="#"> <img src={rightArrow} alt=""/> ADDRESS BOOK</Link>
                        <Link to ="#"> <img src={rightArrow} alt=""/> WISHLIST</Link>
                        <Link to ="/customerOrder"> <img src={rightArrow} alt=""/> ORDER HISTORY</Link>
                        <Link to ="#"> <img src={rightArrow} alt=""/> RETURNS</Link>
                        <Link to ="#"> <img src={rightArrow} alt=""/> TRANSACTIONS</Link>
                        <Link to ="#"> <img src={rightArrow} alt=""/> NEWSLETTER</Link>
                    </div>
                </div>
               
            </div>




            </div>
        </div>


    )
}
const mapStateToProps = state => ({
    customer: state.customer
})
export default connect(mapStateToProps, {logout})(CustomerOrder)

