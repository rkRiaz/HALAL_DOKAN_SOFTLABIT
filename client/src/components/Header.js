import React, {useState, useEffect} from 'react'
import './Header.css'
import {connect} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {NavDropdown} from 'react-bootstrap'
import logo from '../assets/images/logo.svg'
import phone from '../assets/icons/phone.svg'
import user from '../assets/icons/user.svg'
import shoppingCart from '../assets/icons/shoppingCart.svg'
import menuHeart from '../assets/icons/menuHeart.svg'
import menuUser from '../assets/icons/menuUser.svg'
import menuPhone from '../assets/icons/menuPhone.svg'
import {FaRegUser} from 'react-icons/fa'
import {HiMenu} from 'react-icons/hi'
import searchIcon from '../assets/icons/search.svg'
import axios from 'axios';


function Header(props) {
    const[categories, setCategories] = useState([])
    const[showSideBar, setShowSideBar] = useState(false)
    const[searchProducts, setSearchProducts] = useState('')
    const[searchTabHide, setSearchTabHide] = useState(false)

    

    const history = useHistory()

    const search = e => {
        axios.get(`/api/product/get-products-by-text-search?q=${e.target.value}`)
        .then(res => {
            setSearchProducts(res.data.searchProducts)
            setSearchTabHide(!searchTabHide)
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const hideSearchTab = productId => e => {
        e.preventDefault()
        setSearchProducts('')
        history.push(`/product/${productId}`)
    } 

    const action = name => e => {
        e.preventDefault()
        setShowSideBar(!showSideBar)
        if(name === 'login') {
            history.push('/customerLogin')
        } else {
            history.push('/customerRegistration')
        }
    }

    useEffect(() => {
        axios.get(`/api/category/get-all-category`)
        .then(res => {
            setCategories(res.data.allCategory)
        })
        .catch(err => {
            console.log(err.response)
        })
    }, [])

    return (
        <div className="header">

            {/* header__top starts */}
            <div className="header__top">
                <div className="header__topContent">
                    <div className="header__topPhone">
                        <div className="header__topPhoneIcon"><img src={phone} alt=""/></div>
                        <div className="header__topPhoneNumber">01122334455 (10PM - 5PM)</div>
                    </div>
                    <div className="header__topNews">
                        <marquee>**আমাদের অনলাইন অর্ডার যথারীতি চালু আছে **</marquee>
                    </div>
                     <div className="header__topLogin">
                        <div className="header__topLoginIcon"><img src={user} alt=""/></div>
                        <p className="header__topLoginText">
                            { props.customer.customerLoggedIn ? <Link to="/customerDashboard">{props.customer.customerInfo.name} </Link> :
                            <><Link to="/customerLogin">Login</Link> or <Link to="/customerRegistration">Registration</Link></>
                            }    
                        </p>
                    </div>
                </div>
            </div>
            {/* header__top ends */}


            {/* header__middle starts */}
            <div className="header__middle my_bg">
                <div className="header__middleContent">
                    <Link to="/" className="header__middleLogo">
                        <img src={logo} alt=""/>
                    </Link>
                    <form className="header__middleSearch">
                        <input type="text" placeholder="Search" onChange={search}/>
                        <div className="header__middleSearchIcon"><img src={searchIcon} alt=""/></div>
            
                        {/* //search results component  starts*/}
                            <div className={searchProducts ? "header__middleSearchResult header__middleSearchResult__show" : "header__middleSearchResult"}>
                                {
                                searchProducts === '' ? 
                                <p className="h6 p-3">Loading</p> :
                                searchProducts.length === 0 ? 
                                <p className="h6 p-3">No Product Found</p> :
                                    searchProducts.map(searchProduct => (
                                    <Link onClick={hideSearchTab(searchProduct._id)} key={searchProduct._id} className="header__middleSearchResultProduct">
                                        <div className="header__middleSearchResultImage mr-3">
                                            <img className="img-thumbnail" style={{ width: 70, height: 70 }} src={`/uploads/images/${searchProduct.productImages[0]}`} alt="" />
                                        </div>
                                        <div className="header__middleSearchResultInfo">
                                            <div className="header__middleSearchResultName">{searchProduct.productName}</div>
                                            <div className="header__middleSearchResultPrice"><strike>Tk. {searchProduct.regularPrice}</strike>&nbsp; Tk. {searchProduct.salePrice}</div>
                                            <div className="header__middleSearchResultCategory">{searchProduct.categorySlug}</div>

                                        </div>
                                    </Link>
                                    ))
                                }
                                

                            </div>
                        {/* //search results component  ends*/}
                    </form>

                    <div className="header__middleIcons">
                        <Link to="/cart"> <img src={shoppingCart} alt=""/><sup className="header__middleIconsSup">{props.busket.busketNumbers}</sup> </Link>
                        <Link to="#"> <img src={menuHeart} alt=""/><sup className="header__middleIconsSup">0</sup> </Link>
                        <Link to={props.customer.customerLoggedIn  ? `/customerDashboard` : '/customerLogin'}><img src={menuUser} alt=""/></Link>
                        <Link to="#"> <img src={menuPhone} alt=""/></Link>
                    </div>

                    {/*Responsive: will show under 768px starts*/}
                    <div> 
                        <HiMenu onClick={e => setShowSideBar(!showSideBar)} className="header__middleMenuBarIcon"/>
                    </div>
                    {/*Responsive: will show under 768px ends*/}
                </div>
            </div>
            {/* header__middle ends */}


            {/* header__menu starts */}
            <div className={`${showSideBar ? "header__menu header__menuShow my_bg" : "header__menu my_bg"}`}>
                <div className="header__menuContent">
                   {/* will show inside the side bar under 768px starts*/}
                   {props.customer.customerLoggedIn 
                   ? 
                   <Link to="/customerDashboard" 
                        className="header__menuContentUser" 
                        onClick={e => setShowSideBar(!showSideBar)}
                        style={{fontSize: 16, display: 'flex'}}>
                        <FaRegUser 
                            className="mr-2 mb-2"
                            style={{color: 'red', fontSize: 20}}/>
                                <p style={{color: "#FE0000"}}>{props.customer.customerInfo.name}</p>
                    </Link> 
                   :   
                    <div className="header__menuContentSidebarLogin">
                        <span onClick={action("login")}>Login</span>
                        <span>OR</span>
                        <span onClick={action("registration")}>Registration</span>
                    </div>}
                    <Link onClick={e => setShowSideBar(!showSideBar)} to="/" className="header__menuLogo">
                        <img src={logo} alt=""/>
                    </Link>
                   {/* will show inside the side bar under 768px ends*/}
                    {
                        categories.map((category) => (
                            Array.isArray(category.subCategory) ?
                            //have to fix the key value
                            <NavDropdown key={category._id} title={category.category} id="collasible-nav-dropdown">
                                {category.subCategory.map((subC) => (
                                    <NavDropdown.Item onClick={e => setShowSideBar(!showSideBar)} key={subC._id}><Link to={`/subCategory/${subC.subCategorySlug}`}>{subC.name}</Link></NavDropdown.Item>
                                ))}
                            </NavDropdown> :
                            <Link key={category._id} to={category.categorySlug}>{category.category}</Link>
                        ))
                    }
                   
                </div>
              
            </div>
            {/* header__menu ends */}
            

            {/*Responsive: side bar close btn */}
            <div onClick={e => {setShowSideBar(!showSideBar)}} className={`${showSideBar ? "header__sidebarRightClose " : ""}`}></div>
            {/*Responsive: side bar close btn */}


        </div>
    )
}

const mapStateToProps = state => ({
    customer: state.customer,
    busket: state.busket
})

export default connect(mapStateToProps, { })(Header)
