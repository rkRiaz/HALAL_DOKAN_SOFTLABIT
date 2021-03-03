import React, {useState, useEffect} from 'react'
import './ProductCard.css'
import {Link} from 'react-router-dom'

import shoppingCartDark from '../assets/icons/shoppingCartDark.svg'
import heartOutlined from '../assets/icons/heartOutlined.svg'
import starYellow from '../assets/icons/starYellow.svg'
import starDark from '../assets/icons/starDark.svg'

import { connect } from 'react-redux'
import { addToBusket } from '../store/actions/busketActions'
import {cartSideBar} from "../store/actions/sideBarAction"





function ProductCard(props) {

    const [product, setProduct] = useState(props.product)

    // useEffect(() => {
    //     setProduct(props.product)
    // }, [])

    const addToCartAction = id => e => {
        e.preventDefault()
        props.addToBusket(id)
        props.cartSideBar('open')  
    }
    return (
        <div className="productCard">
            
                <Link to={`/product/${product?._id}`}>
                    <div className="productCardLargeImage">
                    {/* <iframe width="100%" height="100%" src="https://www.youtube.com/embed/5RluSnRPRbI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                        <img src={`/uploads/images/${product?.productImages[0]}`} alt=""/> 
                    </div>
                    <div className="productCard__name px-3 mt-4">{product?.productName}</div>
                    <div className="productCard__price px-3 my-2">
                        <strike>Tk. {product.regularPrice}</strike> &nbsp; Tk. {product?.salePrice}
                    </div>
                </Link>
                <div className="productCard__footer p-3 mt-3">
                <div className="productCard__footerRating">
                    {
                        Array(product?.ratings || 3).fill().map((_, i) => (
                            <img key={i} src={starYellow} alt=""/>
                        )) 
                    }
                    {
                        Array(5-product?.ratings || 2).fill().map((_, i) => (
                            <img key={i} src={starDark} alt=""/>
                        )) 
                    }
                </div>
                <div className="productCard__footerIcons">
                    <Link onClick={addToCartAction(product?._id)} to="#"><img src={shoppingCartDark} alt=""/></Link>
                    <Link to="#"><img className="ml-3" src={heartOutlined} alt=""/></Link>
                </div>
            </div>
        </div>
    )
}

export default connect(null, {addToBusket, cartSideBar})(ProductCard)
