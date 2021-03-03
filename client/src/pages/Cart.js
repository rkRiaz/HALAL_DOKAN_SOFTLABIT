import React, {useState, useEffect} from 'react';
import './Cart.css'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { productQuantity, removeFromBusket, orderAction, setBusketFromDB } from '../store/actions/busketActions'
import {loginSideBar} from '../store/actions/sideBarAction'
import emptycart from '../assets/images/emptycart.png'
import { FaTrash } from 'react-icons/fa'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import Loading from '../components/Loading'


const Cart = (props) => {
    const [cart_products, setCart_products] = useState('')
    const [subTotal, setSubTotal] = useState('')

    const history = useHistory()

    const fetchData = async () => {
        let cartProducts = []
        for(let i = 0; i < props.busket.cart_products.length; i++ ) {
            let {data} = await axios.get(`/api/product/get-single-product-by-id/${props.busket.cart_products[i]._id}`)
            cartProducts.push({
                _id: data.product._id,
                productName: data.product.productName,
                salePrice: data.product.salePrice,
                quantity: props.busket.cart_products[i].quantity,
                productImage: data.product.productImages[0],
            })
        }
        setCart_products(cartProducts)
        if(cartProducts.length > 0) {
            let total = cartProducts.map(p => { return p.salePrice * p.quantity })
            setSubTotal(total.reduce((a, b) => a + b, 0))
        }
    }

    useEffect(() => {
 
        fetchData()
        props.orderAction(
                {
                    cart_products, 
                    subTotal
                }
            )
    }, [props.busket.busketNumbers, subTotal, cart_products])


    let checkOut = (e) => {
        e.preventDefault()
        props.customer.customerLoggedIn ?
        history.push('/shippingInformation')
        :
        props.loginSideBar('open')
    }

    if(cart_products === '') {
        return(
            <div className="cart__loading">
                <Loading/>
            </div>
        )
    }

    if(cart_products.length === 0) {
        return(
            <div className="h1 text-center">
                <Link className="text-success font-weight-bold" to="/">Go to shop</Link><br />
                <img width="100%" src={emptycart} alt=""/>
             </div>
        )
    }

    if(cart_products.length !== 0) {
       return(
        <div className="cart"> 
        <div className="">
            {/* {console.log(cart_products)}  */}
            <div className="text-center text-dark" style={{padding: "2% 0", background: '#eaeaea'}}>
                <div className="h2 font-weight-bold">My Cart</div>
                <Link to="/"><div className="badge badge-secondary text-center">&#8594; Go To Shop</div></Link> 
            </div>
            <div className="cart__content">
                    <div className="cart__details mt-5 px-3">
                        <Table  hover>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                    <th>Remove</th>                                            
                                </tr>
                            </thead>
                            <tbody>
                                {cart_products.map(p => (
                                    <tr className="tableRow">
                                        <td><Link to={`/product/${p._id}`}><img className="img-thumbnail mr-3" src={`http://localhost:8080/uploads/images/${p.productImage}`} alt="" />{p.productName}</Link></td>
                                        <td>
                                            <div className="productQuantityController d-flex font-weight-bolder">
                                                <div onClick={() => props.productQuantity('decrease', p._id)} className="" style={{ cursor: 'pointer' }}>-</div>
                                                <div className="mx-3">{p.quantity}</div>
                                                <div onClick={() => props.productQuantity('increase', p._id)} className="" style={{ cursor: 'pointer' }}>+</div>
                                            </div>
                                        </td>
                                        <td>&#2547;{p.salePrice}</td>
                                        <td>&#2547;{p.salePrice * p.quantity}</td>
                                        <td>
                                            <FaTrash onClick={() => props.removeFromBusket(p._id)} style={{ marginBottom: 7, cursor: 'pointer', color: "#FE0000"}}/>
                                        </td>
                                    </tr>
                                    
                                ))}
                            </tbody>
                        </Table>
                        <hr/>
                    </div>
                    <div className="checkOut text-right mt-4 px-3">
                        <div className="h3 font-weight-bold">SubTotal Amount: <strong style={{color: "#FE0000"}}>&#2547;{subTotal}</strong></div>
                        <p>Taxes, shipping and discounts codes calculated at checkout</p>
                        <button onClick={checkOut} className="btn btn-primary mt-2" style={{width: 300}}>CHECK OUT</button>
                    </div>
                </div>
        </div>
    </div>
       )
    }
} 

    

const mapStateToProps = state => ({
    customer: state.customer,
    busket: state.busket
})
export default connect(mapStateToProps, { productQuantity, removeFromBusket, orderAction, setBusketFromDB, loginSideBar })(Cart);



