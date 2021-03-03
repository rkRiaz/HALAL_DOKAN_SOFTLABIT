import React, {useState, useEffect} from 'react'
import './SubCategory.css'
import {Link, useParams} from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import home from '../assets/icons/home.svg'
import rightArrow from '../assets/icons/right-arrow.svg'
import noProduct from '../assets/images/noProduct.jpg'
import axios from 'axios'
import Loading from '../components/Loading'
import { Pagination } from 'react-bootstrap'
import { HiChevronDown, HiMenu } from 'react-icons/hi'


function SubCategory() {
    const[products, setProducts] =useState('')
    const[showExploreLeft, setShowExploreLeft] = useState(false)
    const [itemPerPage, setItemPerPage] = useState(8)
    const [pageNumber, setPageNumber] = useState(1)
    const [totalPage, setTotalPage] = useState('')
    const {subCategorySlug} = useParams()

    useEffect(() => {
        axios.get(`/api/product/get-product-list-by-sub-category?subCategorySlug=${subCategorySlug}&&page=${pageNumber}&&itemPerPage=${itemPerPage}`)
        .then(res => {
            setTotalPage(res.data.totalPage)
            setProducts(res.data.products)
        })
        .catch(err => {
            console.log(err.response)
        })
    }, [itemPerPage, pageNumber, subCategorySlug])

    let changePage = pageNumber => e => {
        e.preventDefault()
        setPageNumber(pageNumber)
    }

    return (
        <div className="subCategory">
            <div className="subCategory__content">
                {/* subCategory__header starts */}
                <div className="subCategory__header">
                    <img src={home} alt=""/>
                    <Link to="/">Home</Link>
                    <img className="subCategory__headerArrowIcon" src={rightArrow} alt=""/>
                    <Link to={`/category/${products ? products.length === 0 ? "#": products[0].categorySlug : '#'}`}>{products ? products.length === 0 ? "" : products[0].categorySlug : "No product"} </Link>
                    <img className="subCategory__headerArrowIcon" src={rightArrow} alt=""/>
                    <Link to="#">{subCategorySlug}</Link>
                </div>
                {/* subCategory__header ends */}

                {/* subCategory__headline starts */}
                {/* <div className="subCategory__headline">KEYBOARD</div> */}
                {/* subCategory__headline ends */}
            
                <div className="subCategory__explore">
                    {/* subCategory__exploreLeft starts */}
                    <div className={showExploreLeft ? "subCategory__exploreLeft subCategory__exploreLeftShow" : "subCategory__exploreLeft"}>
                        <div className="subCategory__exploreLeftDrawer">
                            <div to="#" className="subCategory__exploreLeftItem">
                                <span>Price </span>
                                <HiChevronDown/>
                            </div>
                            <div to="#" className="subCategory__exploreLeftItem">
                                <span>Brand</span>
                                <HiChevronDown/>
                            </div>
                            <div to="#" className="subCategory__exploreLeftItem">
                                <span>Weight</span>
                                <HiChevronDown/>
                            </div>
                            <div to="#" className="subCategory__exploreLeftItem">
                                <span>Quantity</span>
                                <HiChevronDown/>
                            </div>
                            <div to="#" className="subCategory__exploreLeftItem">
                                <span>Type</span>
                                <HiChevronDown/>
                            </div>
                            <div to="#" className="subCategory__exploreLeftItem">
                                <span>Variable</span>
                                <HiChevronDown/>
                            </div>
                            <div to="#" className="subCategory__exploreLeftItem">
                                <span>features</span>
                                <HiChevronDown/>
                            </div>
                            <div to="#" className="subCategory__exploreLeftItem">
                                <span>others</span>
                                <HiChevronDown/>
                            </div>
                
                        </div>
                        <div onClick={e => {setShowExploreLeft(!showExploreLeft)}} className="subCategory__exploreLeftClose"></div>

                    </div>
                    {/* subCategory__exploreLeft ends */}

                    {/* subCategory__exploreRight starts */}
                    
                    <div className="subCategory__exploreRight">
                        <div className="subCategory__exploreRightSort">
                        <div onClick={e => setShowExploreLeft(!showExploreLeft)} className="subCategory__exploreRightSortMenuIcon"><HiMenu/></div>
                        <div className="subCategory__exploreRightSortDropDown">
                                <select onChange={e => console.log(e.target.value)}>
                                    <option value="default">sort by default</option> 
                                    <option value="meat">Alphabetically</option>       
                                </select>
                            </div>
                            <div className="subCategory__exploreRightSortDropDown">
                                <select onChange={e => setItemPerPage(e.target.value)}>  
                                    <option value="8">show 8</option>    
                                    <option value="12">show 12</option>    
                                    <option value="24">show 24</option>  
                                </select>
                            </div>
                   
                        </div>


                        <div className="subCategory__exploreRightProductssubCategory">
                            {
                               products ? 
                                    products.length === 0 ?
                                        <div>
                                            <img width="100%" src={noProduct} alt=""/>
                                        </div>
                                    :
                                    products.map(product => (
                                        <ProductCard key={product._id} product={product}/> 
                                    ))
                                    :
                                    <div className="loading">
                                        <Loading/>
                                    </div>
                            }


                        </div>
                            {
                                totalPage ? 
                                <div className="allProducts__pagination">
                                <Pagination>
                                        {
                                            Array(totalPage).fill().map((_, i) => (
                                                <Pagination.Item key={i} onClick={changePage(i+1)}>{i+1}</Pagination.Item>
                                            ))
                                        }
                                </Pagination>
                                </div>
                                :
                                ""
                            }

                    </div>
                    {/* subCategory__exploreRight ends */}
                </div>

            </div>
        </div>
    )
}

export default SubCategory
