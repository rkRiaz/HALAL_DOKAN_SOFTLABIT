
import React, {useState, useEffect} from 'react';
import './CartSideBar.css'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { productQuantity, removeFromBusket, orderAction } from '../../store/actions/busketActions'
import { MdClose } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'
import axios from 'axios'
import {cartSideBar} from "../../store/actions/sideBarAction"



const CartSideBar = (props) => {
    const [cart_products, setCart_products] = useState([])
    const [subTotal, setSubTotal] = useState('')


    const fetchData = async () => {
        let cartProducts = []
        for(let i = 0; i < props.busket.cart_products.length; i++ ) {
            let {data} = await axios.get(`http://localhost:8080/api/product/get-single-product-by-id/${props.busket.cart_products[i]._id}`)
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
        // if(!props.customer.customerLoggedIn) {
            fetchData()
        // }
        props.orderAction(
            {
                customerId:props.customer.customerLoggedIn ? props.customer.customerInfo._id : '',
                cart_products, 
                subTotal
            }
        )
    }, [props.busket.busketNumbers, subTotal])




    let closeBar = e => {
        e.preventDefault()
        props.cartSideBar('close')
        // props.history.push("/customer/cart")
    }
    let viewCartAction = e => {
        e.preventDefault()
        props.cartSideBar('close')
        props.history.push('/cart')
    }


    return (
        <div>
            <div className="cart__sidebar">
                <div className={props.sideBar.cartSideBar ? "cart__sidebar__content d-flex justify-content-between" : "cart__sidebar__content bar__off d-flex justify-content-between"}>
                                <div onClick={closeBar} className="cart__content__closeBtn"></div>
              
                                <div className={props.sideBar.cartSideBar ? "cart__sidebar__cart__details" : "cart__sidebar__cart__details bar__off"}>
                                    
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="h4">Shopping Cart</div>
                                        <div onClick={closeBar} className={props.sideBar.cartSideBar ? "cart__content__closeBtn__icon mr-2 mb-1" : " "}><MdClose/></div>
                                    </div>

                                    <div className="cart__sidebar__cart__table">
                                                {cart_products.map((p, index) => (
                                                    <div className="tableRow " key={index}>
                                                       <hr/>
                                                        <div className="d-flex">
                                                        <div className="mr-1" style={{ width: "170px"}}><img style={{ width: "100%", height: "150px" }} className="img-thumbnail" src={`http://localhost:8080/uploads/images/${p.productImage ? p.productImage : ''}`} alt="" /></div>
                                                        <div className="ml-4 " style={{ width: "130px"}}>
                                                            <p className="font-weight-bold" style={{lineHeight: "17px"}}>{p.productName}</p>
                                                            <div className="d-flex">
                                                                <p className="text-danger font-weight-bold">&#2547; {p.salePrice}</p> 
                                                                <FaTrash className="ml-4 mt-1" onClick={() => props.removeFromBusket(p._id)} style={{ marginBottom: 7, cursor: 'pointer', color: "#FE0000"}}/>       
                                                           </div>
                                                            <div className="cart__side__bar__productQuantityController d-flex justify-content-center font-weight-bolder">
                                                                <div onClick={() => props.productQuantity('decrease', p._id)} className="" style={{ cursor: 'pointer' }}>-</div>
                                                                <div className="mx-3">{p.quantity}</div>
                                                                <div onClick={() => props.productQuantity('increase', p._id)} className="" style={{ cursor: 'pointer' }}>+</div>
                                                            </div>                                                          
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                ))}
                                  
                                    </div>

                                    <hr/>
                                    <div className="cart__sidebarCheckOut text-center px-3">
                                        <div className="h5 font-weight-bold">SubTotal Amount: <strong style={{color: "#FE0000"}}>&#2547;{subTotal}</strong></div>
                                        <button onClick={viewCartAction} className="btn btn-primary" style={{width: 200}}>Checkout</button>
                                    </div>
  
                                </div>

                            </div>
            </div>        
        </div>
    );

}
const mapStateToProps = state => ({
    customer: state.customer,
    busket: state.busket,
    sideBar: state.sideBar
})
export default connect(mapStateToProps, { productQuantity, removeFromBusket, orderAction, cartSideBar })(withRouter(CartSideBar));

