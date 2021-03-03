import React, {useState, useEffect} from 'react'
import './Category.css'
import {Link, useParams} from 'react-router-dom'
import SubCategoryProductCard from '../components/SubCategoryProductCard'
import {HiMenu} from 'react-icons/hi'
import {HiChevronDown} from 'react-icons/hi'
import home from '../assets/icons/home.svg'
import rightArrow from '../assets/icons/right-arrow.svg'
import axios from 'axios'
import Loading from '../components/Loading'

function Category() {

    const [categories, setCategories] = useState([])
    const[subCategories, setSubCategories] =useState('')
    const[showExploreLeft, setShowExploreLeft] = useState(false)

    const {categorySlug} = useParams()

    useEffect(() => {
        
        axios.get(`/api/category/find-sub-categories-by-category-slug/${categorySlug}`)
        .then(res => {
            setTimeout(() => {
                setSubCategories(res.data.subCategories)
            }, 3000)
            
        })
        .catch(err => {
            console.log(err.response)
        })
    }, [categorySlug])

    useEffect(() => {
        axios.get(`/api/category/get-all-category`)
        .then(res => {
            setCategories(res.data.allCategory)
        })
        .catch(err => {
            console.log(err.response)
        })
    }, [categorySlug])
    
    return (
        <div className="category">
            <div className="category__content">
                {/* category__header starts */}
                <div className="category__header">
                        <img src={home} alt=""/>
                        <Link to="/">Home</Link>
                        <img className="category__headerArrowIcon" src={rightArrow} alt=""/>
                        <Link to="#">{categorySlug}</Link>
                </div>
                {/* category__header ends */}
           
            
                <div className="category__explore">
                    {/* category__exploreLeft starts */}
                    <div className={showExploreLeft ? "category__exploreLeft category__exploreLeftShow" : "category__exploreLeft"}>
                        <div className="category__exploreLeftDrawer">
                            <div to="#" className="category__exploreLeftItem">
                                <span>Price </span>
                                <HiChevronDown/>
                            </div>
                            <div to="#" className="category__exploreLeftItem">
                                <span>Brand</span>
                                <HiChevronDown/>
                            </div>
                            <div to="#" className="category__exploreLeftItem">
                                <span>Weight</span>
                                <HiChevronDown/>
                            </div>
                            <div to="#" className="category__exploreLeftItem">
                                <span>Quantity</span>
                                <HiChevronDown/>
                            </div>
                            <div to="#" className="category__exploreLeftItem">
                                <span>Type</span>
                                <HiChevronDown/>
                            </div>
                            <div to="#" className="category__exploreLeftItem">
                                <span>Variable</span>
                                <HiChevronDown/>
                            </div>
                            <div to="#" className="category__exploreLeftItem">
                                <span>features</span>
                                <HiChevronDown/>
                            </div>
                            <div to="#" className="category__exploreLeftItem">
                                <span>others</span>
                                <HiChevronDown/>
                            </div>
                
                        </div>
                        <div onClick={e => {setShowExploreLeft(!showExploreLeft)}} className="category__exploreLeftClose"></div>

                    </div>
                    {/* category__exploreLeft ends */}


                    {/* category__exploreRight starts */}
                    
                    <div className="category__exploreRight">
                        <div className="category__exploreRightCategory">
                            {
                                
                                categories.map(category => (
                                    <Link key={category._id} to={`${category.categorySlug}`}>{category.category}</Link>
                                ))
                            }
                    
                        </div>
                        <div className="category__exploreRightSort">
                            <div onClick={e => setShowExploreLeft(!showExploreLeft)} className="category__exploreRightSortMenuIcon"><HiMenu/></div>
                            <div className="category__exploreRightSortDropDown">
                                <select onChange={e => console.log(e.target.value)}>
                                    <option value="default">sort by default</option> 
                                    <option value="meat">Alphabetically</option>     
                                </select>
                            </div>
                            <div className="category__exploreRightSortDropDown">
                                <select onChange={e => console.log(e.target.value)}>
                                    <option value="">show</option> 
                                    <option value="2">2</option>    
                                    <option value="3">3</option>    
                                    <option value="4">4</option>    
                                </select>
                            </div>
                        </div>


                        <div className="category__exploreRightProductsCategory">
                            {
                                subCategories ?
                                    subCategories.length === 0 ?
                                    <div className="display-4">Sorry! No sub-category found!</div>
                                    :
        
                                    subCategories.map(subCategory => (
                                        <SubCategoryProductCard key={subCategory._id} subCategory={subCategory}/> 
                                    )) 
                                :
                                <div className="loading">
                                    <Loading/>
                                </div>
                            }
                        </div>


                    </div>
                    {/* category__exploreRight ends */}
                </div>

            </div>
        </div>
    )
}

export default Category
