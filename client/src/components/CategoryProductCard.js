import React, {useState, useEffect} from 'react'
import './CategoryProductCard.css'
import {Link} from 'react-router-dom'



function CategoryProductCard(props) {

    const [category, setCategory] = useState(props.category)

    return (
        <div className="categoryProductCard">
            <Link to={`category/${category.categorySlug}`}>
                <img className="categoryProductCardLargeImage" src={`/uploads/images/${category.categoryImage}`} alt=""/> 
                <div className="categoryProductCard__name px-3 mt-4">{category.category}</div>
            </Link>
        </div>
    )
}

export default CategoryProductCard
