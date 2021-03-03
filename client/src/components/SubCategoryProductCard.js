import React, {useState, useEffect} from 'react'
import './SubCategoryProductCard.css'
import {Link} from 'react-router-dom'


function SubCategoryProductCard(props) {


    // useEffect(() => {
    //     setProduct(props.product)
    // }, [])


    return (
        <div className="subCategoryProductCard">
            <Link to={`/subCategory/${props.subCategory.subCategorySlug}`}>
                <div className="subCategoryProductCardLargeImage">
                    <img src={`/uploads/images/${props.subCategory.subCategoryImage}`} alt=""/> 
                </div>
                <div className="subCategoryProductCard__name px-3 mt-4">{props.subCategory.name}</div>
            </Link>

     

        </div>
    )
}

export default SubCategoryProductCard
