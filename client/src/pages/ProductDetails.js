import React, {useState, useEffect} from 'react'
import './ProductDetails.css'
import {Link} from 'react-router-dom'
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux'
import { addToBusket } from '../store/actions/busketActions'
import {cartSideBar} from "../store/actions/sideBarAction"
import { Button} from 'react-bootstrap'
import {AiOutlineZoomIn, AiOutlineZoomOut} from 'react-icons/ai'
import {MdZoomOutMap} from 'react-icons/md'
import rightArrow from '../assets/icons/right-arrow.svg'
import home from '../assets/icons/home.svg'
import starYellow from '../assets/icons/starYellow.svg'
import starDark from '../assets/icons/starDark.svg'
import shoppingCart from '../assets/icons/shoppingCart.svg'
import heartWhite from '../assets/icons/heartWhite.svg'
import facebook from '../assets/icons/facebook.svg'
import twitter from '../assets/icons/twitter.svg'
import instagram from '../assets/icons/instagram-t.svg'
import linkedin from '../assets/icons/linkedin.svg'
import axios from 'axios';
//multi carousel 
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// product zoom react-zoom-pan-pinch
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";



function ProductDetails(props) {
    const [product, setProduct] = useState('')
    const [relatedProducts, setRelatedProducts] = useState([])

    
    const [quantity, setQuantity] = useState(1)
    const [largeImage, setLargeImage] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const { productId } = useParams();
    const  history  = useHistory()


    const addToCartAction = (quantity) => e => {
        props.addToBusket(productId, quantity, history)
        props.cartSideBar('open')  

    }

    const deleteProduct = e => {
        e.preventDefault()
        axios.delete(`/api/product/delete-product/${product._id}`)
        .then(res => {
            alert(res.data.message)
            setShowAlert(!showAlert)
            history.push('/')
        })
        .catch(err => {
            console.log(err)
        })
    }

    const addHandler = e => {
        e.preventDefault()
        setQuantity(quantity+1)
    }
    const subtractHandler = e => {
        e.preventDefault()
        if(quantity !== 1){
            setQuantity(quantity-1)
        }
    }

    const navigate = type => e => {
        e.preventDefault()
        var x = document.getElementsByClassName("navClass");
        var y = document.getElementsByClassName("nav__btn");
        for (let i = 0; i < x.length; i++) {
          x[i].style.display = "none";
          y[i].style.backgroundColor = "#D6D6D6"
        }
        e.target.style.backgroundColor = "#DA0707"
        document.getElementById(type).style.display = "block";
    }

    useEffect(() => {
      const fetchData = async() => {
        let {data} =  await axios.get(`/api/product/get-single-product-by-id/${productId}`)
        setLargeImage(data.product.productImages[0])
        setProduct(data.product)

        axios.get(`/api/product/get-product-list-by-sub-category?subCategorySlug=${data.product.subCategorySlug}`)
        .then(res => {
            setRelatedProducts(res.data.products.reverse().splice(0, 4))
        })
        .catch(err => {
            console.log(err.response)
        })
        // console.log(fetchProduct)
      }
      fetchData()
    }, [productId])

    

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
            slidesToSlide: 4

        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            slidesToSlide: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3,
            slidesToSlide: 2
        }
    };

    return (
        <div className="details">

        {/* details__header starts */}
            <div className="details__header">
                <div className="details__headerContainer">
                    <img src={home} alt=""/>
                    <Link to="/">Home</Link>
                    <img className="details__headerArrowIcon" src={rightArrow} alt=""/>
                    <Link to={`/category/${product.categorySlug}`}>{product.categorySlug}</Link>
                    <img className="details__headerArrowIcon" src={rightArrow} alt=""/>
                    <Link to="#">{product.productName}</Link>
                </div>
            </div>
        {/* details__header ends */}

        {/* delete close btn starts */}
            {
                showAlert ? 
                    <div onClick={e => {setShowAlert(!showAlert)}} className="deleteAlertBoxCloseBtn"></div>
                : 
                ''
            }
        {/* delete close btn ends */}

       
            <div className="details__container">
                 {/* details__top starts */}
                <div className="details_top">
                    <div className="details__topLeft">

                    <div className="details__topLeftLargeImg">
                            <TransformWrapper
                                defaultScale={1}
                                defaultPositionX={200}
                                defaultPositionY={100}
                            >
                                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                                <React.Fragment>
                                    <TransformComponent>
                                        
                                        <img src={`/uploads/images/${largeImage}`} alt=""/>
                                      
                                    </TransformComponent>
                                    <div className="details__topLeftTransformWrapperBtnGroup text-right">
                                        <Button onClick={zoomIn} variant="info" className=""><AiOutlineZoomIn/></Button>
                                        <Button onClick={zoomOut} variant="warning" className="ml-1"><AiOutlineZoomOut/></Button>
                                        <Button onClick={resetTransform} variant="primary" className="ml-1"><MdZoomOutMap/></Button>
                                    </div>
                                </React.Fragment>
                                )}
                            </TransformWrapper>
                            </div>
             

                    
                        <div className="details__topLeftSmallImgs">
                            <Carousel 
            
                                responsive={responsive}
                            >
                                { 
                                    product? product.productImages.map((image, i) => (
                                    <div key={i}onClick={e => {setLargeImage(image)}} className="details__topLeftSmallImg">
                                        <img src={`/uploads/images/${image}`} alt=""/>
                                    </div>
                                    )) : '' 
                                }
                            </Carousel>
                        </div>
                    </div>

                    <div className="details__topRight">
                        <div className="product__name">{product.productName}</div>
                        <div className="product__info">
                            <ul>
                                <li><span>Price</span>&nbsp;&nbsp;&nbsp;{product?.salePrice}&#2547;</li>
                                <li><span>Status&nbsp;&nbsp;&nbsp;</span>{product.available ? "In Stock" : "Out of Stock"}</li>
                                <li><span>Product Code&nbsp;&nbsp;&nbsp;</span>{product?.productCode}</li>
                                <li><span>Brand&nbsp;&nbsp;&nbsp;</span>{product?.brand}</li>
                            </ul>
                        </div>
                        <div className="product__details">{product?.shortDescription}</div>
                        <div className="product__moreInfo">
                            <Link to="#" >View More Info</Link>
                        </div>
                        <div className="product__review">
                            {product.reviews?.length} Customer Review &nbsp;&nbsp;
                            {
                                Array(product.rating ? product.rating : 3).fill().map((_, i) => (
                                    <img className="product__reviewIcon" key={i} src={starYellow} alt=""/>
                                )) 
                            }
                            {
                                Array(product.rating ? 5-product.rating : 2).fill().map((_, i) => (
                                    <img className="product__reviewIcon" key={i} src={starDark} alt=""/>
                                )) 
                            }
                        </div>
                        <div className="product__infoPrice">
                            {/* product-sans font not imported */}
                            {quantity * product?.salePrice}&#2547;
                        </div>
                        <div className="product__action">
                            <div className="product__actionQuantity">
                                <div onClick={subtractHandler} className="" style={{cursor: 'pointer', borderRight: '1px solid #dbdbdb'}}>-</div>
                                <div className="" style={{borderRight: ' 1px solid #dbdbdb', width: "100%"}}>{quantity}</div>
                                <div onClick={addHandler} className="" style={{cursor: 'pointer'}}>+</div>
                            </div>
                            <Link onClick={addToCartAction(quantity)} to="#" className="product__actionBuy"><img src={shoppingCart} alt=""/> BUY NOW</Link>
                            <Link to="#" className="product__actionWish"><img src={heartWhite} alt=""/></Link>
                            <Link to="/cart" className="product__actionCart"><img src={shoppingCart} alt=""/></Link>
                        </div>
                        {/* admin product edit starts  */}
                            {
                                props.admin.adminLoggedIn 
                                ?
                                <div className="product__admin d-flex mt-2">
                                    <Link to={`/admin/edit-product/${product ? product._id : ''}`} className="product__adminEdit btn btn-primary ml-1"> EDITT</Link>
                                    <Link onClick={e => {setShowAlert(!showAlert)}} to="#" className="product__adminDelete btn btn-danger ml-1"> DELETE</Link>
                                    {
                                        showAlert ? 
                                            <div className="deleteAlertBox">
                                                <p style={{"width": "200px"}}>! You are going to delete this product. You can not find this product anymore after choosing yes.</p>
                                                <div className="d-flex justify-content-between">
                                                    <div onClick={deleteProduct} className="btn btn-danger">Yes</div>
                                                    <div onClick={e => {setShowAlert(!showAlert)}} className="ml-2 btn btn-warning">No</div>
                                                </div>
                                            </div>
                                        : 
                                        ''
                                    }
                                </div> 
                                :
                                ""
                            }
                        {/* admin product edit ends  */}
                        <div className="productSocial">
                            <h4>Share In</h4>
                            <div className="productSocial__icons">
                                <Link to="#"><img src={facebook} alt=""/></Link>
                                <Link to="#"><img src={twitter} alt=""/></Link>
                                <Link to="#"><img src={instagram} alt=""/></Link>
                                <Link to="#"><img src={linkedin} alt=""/></Link>
                            </div>
                        </div>
                    </div>
                </div>

                 {/* details__top ends */}


                {/* details__bottom starts */}
                <div className="details__bottom">
          
                    <div className="details__bottomLeft ">
                            <div className="details__bottomLeftHeader">
                                <div className="nav__btn" onClick={navigate('description')}>Description</div>
                                <div className="nav__btn" onClick={navigate('reviews')}>Reviews (15)</div>
                            </div>
                            <div id="description" className="navClass details__bottomLeftContent">
                                <h3>Description :</h3>
                                <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                                </p>
                                <div className="details__bottomLeftContentVideo">
                                    <iframe width="100%" height="500px" src={`https://www.youtube.com/embed/${product.productVideo ? product.productVideo : ''}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                  
                                </div>
                            </div>

                            <div id="reviews" className="navClass details__bottomLeftContentRivews p-4" style={{display: 'none'}}>
                                <div className="details__bottomLeftContentRivewsItem">
                                    <h3>Saiful Islam</h3>
                                    <div className="product__review my-3">
                                        {
                                            Array(4).fill().map((_, i) => (
                                                <img className="product__reviewIcon" key={i} src={starYellow} alt=""/>
                                            )) 
                                        }
                                        {
                                            Array(1).fill().map((_, i) => (
                                                <img className="product__reviewIcon" key={i} src={starDark} alt=""/>
                                            )) 
                                        }
                                    </div>
                                    <p> Halaldokan.com is an online shop in Dhaka, Bangladesh. We believe time is valuable to our fellow Dhaka residents, and that they should not 
                                        have to waste hours in traffic, brave bad weather and wait in line just to buy basic necessities like eggs! This is why Halaldokan delivers 
                                        everything you need right at your door-step and at no additional cost.
                                    </p>
                                </div>
                                
 
                            </div>
                    </div>

         



                    <div className="details__bottomRight">
                
                        <div className="details__bottomRightList">
                            <div className="details__bottomRightListItemHeader">
                                Related Product
                            </div>
                            {
                                relatedProducts.length === 0 ? "" :
                                relatedProducts.map(r => (
                                    <Link to={`/product/${r._id}`} key={r._id} className="details__bottomRightListItem">
                                        <img src={`/uploads/images/${r.productImages[0]}`} alt=""/>
                                        <div className="details__bottomRightListItemInfo">
                                            <div className="details__bottomRightListItemName">{r.productName}</div>
                                            <div className="details__bottomRightListItemPrice">{r.salePrice}&#2547;</div>
                                        </div>
                                    </Link>
                                ))
                                
                            }
                         
                        </div>
                    </div>
                </div>
                {/* details__bottom ends */}

            </div>
       

        </div>
    )
}

const mapStateToProps = state => ({
    admin: state.admin,
    customer: state.customer,
    busket: state.busket
})
export default connect(mapStateToProps, { addToBusket, cartSideBar })(ProductDetails)
