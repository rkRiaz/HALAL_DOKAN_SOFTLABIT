import React, { useEffect, useState } from 'react'
import './AllProducts.css'
import AdminLayout from './AdminLayout'
import AdminProductCard from './AdminProductCard'
import axios from 'axios'
import { FiSearch } from 'react-icons/fi'
import { Pagination } from 'react-bootstrap'
import Loading from '../../components/Loading'

const AllProducts = (props) => {
    const [products, setProducts] = useState('')

    const [totalPage, setTotalPage] = useState('')

    const [pageNumber, setPageNumber] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(20)
    const [searchTerm, setSearchTerm] = useState('')
    const [categorySlug, setCategorySlug] = useState('')
    const [subCategorySlug, setSubCategorySlug] = useState('')
    const [lowerPrice, setLowerPrice] = useState()
    const [higherPrice, setHigherPrice] = useState()


    // const search = e => {
    //     axios.get(`http://localhost:8080/api/product/get-all-products-list-by-mega-search?searchTerm=${e.target.value}&&page=${pageNumber}&&itemPerPage=${itemPerPage}&&lowerPrice=${lowerPrice}&&higherPrice=${higherPrice}&&category=${categorySlug}&&subCategory=${subCategorySlug}`)

    //     .then(res => {
    //         setProducts(res.data.allProducts)
    //         setTotalPage(res.data.totalPage)
    //     })
    //     .catch(err => {
    //         console.log(err.response)
    //     })
    // }


    useEffect(() => {
        axios.get(`http://localhost:8080/api/product/get-all-products-list-by-mega-search?searchTerm=${searchTerm}&&page=${pageNumber}&&itemPerPage=${itemPerPage}&&lowerPrice=${lowerPrice}&&higherPrice=${higherPrice}&&category=${categorySlug}&&subCategory=${subCategorySlug}`)
        .then(res => {
            setProducts(res.data.allProducts)
            setTotalPage(res.data.totalPage)
        })
        .catch(err => {
            console.log(err)
        })
    }, [pageNumber, itemPerPage, searchTerm, categorySlug, subCategorySlug, lowerPrice, higherPrice, totalPage])

    


    let changePage = pageNumber => e => {
        e.preventDefault()
        setPageNumber(pageNumber)
    }

    return (
        <AdminLayout>
            <div className="allProducts">
                <div className="allProductsSearch">
                    <input type="text" placeholder="Search" onChange={e => setSearchTerm(e.target.value)}/> 
                    <div className="allProductsSearchIcon"><FiSearch/></div>
                </div>
                <div className="allProductsList">
                    {
                        
                        products ? 
                        products.length === 0 ?
                        <h2>Sorry! no product found</h2>
                        :
                        products.map(product => (
                            <AdminProductCard key={product._id} product={product}/> 
                        )) : 
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
                                        <Pagination.Item onClick={changePage(i+1)}>{i+1}</Pagination.Item>
                                    ))
                                }
                        </Pagination>
                        </div>
                        :
                        ""
                    }
            </div>
        </AdminLayout>
    )
}
export default AllProducts
