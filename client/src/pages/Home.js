import React, {useState, useEffect} from 'react';
import './Home.css'
import Banner from '../components/Banner';
import NavTab from '../components/NavTab';
import ProductCard from '../components/ProductCard'
import CategoryProductCard from '../components/CategoryProductCard'
import SubCategoryProductCard from '../components/SubCategoryProductCard'
import axios from 'axios';
//multi carousel 
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Loading from '../components/Loading'


function Home() {

    const [products, setProducts] = useState('')
    const [categories, setCategories] = useState('')

    useEffect(() => {
        axios(`/api/product/get-all-products-list`)
        .then(res => {
            setProducts(res.data.allProducts.reverse().slice(0, 8))
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        axios.get(`/api/category/get-all-category`)
        .then(res => {
            setCategories(res.data.allCategory)
        })
        .catch(err => {
            console.log(err.response)
        })
    }, [])

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 7,
            slidesToSlide: 6

        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6,
            slidesToSlide: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4,
            slidesToSlide: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
            slidesToSlide: 1
        }
    };

    return (
        <div className="home">
            <div className="home__banner">
                <Banner/>
            </div>
            <div className="home__tab">
                <NavTab />
            </div>



            <div className="home__category">
                {/* make this font product sans */}
                <div className="home__headline">Categories</div> 
                
                    <Carousel responsive={responsive}>
                    {
                        categories ? categories.map(category => (
                            <CategoryProductCard key={category._id} category={category}/> 
                        )) : <div className="loading">
                                <Loading/>
                            </div>
                    }
                    </Carousel>
                
            </div>

            
            
            <div className="home__collection ">
                {/* make this font product sans */}
                <div className="home__headline">In Collections</div> 
                <div className="home__collectionList">
                    {
                        products ? products.map(product => (
                            <ProductCard key={product._id} product={product}/> 
                        )) : <div className="loading">
                                <Loading/>
                            </div>
                        
                    }
                </div>
            </div>



            <div className="home__allCategories">
                    {
                          categories ? categories.map(category => (
                            <div key={category._id} className="mt-5">
                                <div className="home__headline">{category.category}</div>
                                <div className="home__allCategoriesList ">
                                {
                                    category.subCategory ? category.subCategory.map(s => (
                                        < SubCategoryProductCard key={s._id} subCategory={s}/> 
                                    )) : <div className="loading">
                                            <Loading/>
                                        </div>
                                }
                                </div>
                            </div>
                            
                        )) : 
                            <div className="loading">
                                <Loading/>
                            </div>
                            
                            
                    }
            </div>

   
        </div>
    )
}

export default Home;
