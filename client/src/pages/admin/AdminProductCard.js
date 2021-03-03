import React, {useState, useEffect} from 'react'
import './AdminProductCard.css'
import {Link} from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai'
import {RiDeleteBin3Line} from 'react-icons/ri'
import axios from 'axios'

function AdminProductCard({product}) {
    const [showAlert, setShowAlert] = useState(false)

    const deleteProduct = e => {
        e.preventDefault()
        axios.delete(`/api/product/delete-product/${product._id}`)
        .then(res => {
            setShowAlert(!showAlert)
        })
        .catch(err => {
            console.log(err)
        })
        
    }

    return (
        <div className="adminProductCard">
            <Link to={`/product/${product._id}`}>
                <div className="adminProductCardLargeImage">
                    <img src={`/uploads/images/${product.productImages[0]}`} alt=""/> 
                </div>
                <div className="adminProductCard__name px-3 mt-1">{product.productName}</div>
                <div className="adminProductCard__name px-3  text-danger">{product.salePrice} TK</div>
                <div className="adminProductCardActions mt-1 text-center">
                    <Link to={`/admin/edit-product/${product._id}`}><AiOutlineEdit/></Link>
                    <Link onClick={e => {setShowAlert(!showAlert)}} to="#" className="ml-2"><RiDeleteBin3Line/></Link>
                </div>
            </Link>

            {
                showAlert ? 
                    <div className="deleteAlertBox">
                        <p style={{"width": "200px"}}>! You are going to delete this product. You can not find this product anymore after choosing yes.</p>
                        <div className="d-flex justify-content-between">
                            <div onClick={deleteProduct} className="btn btn-danger">Yes</div>
                            <div onClick={e => {setShowAlert(!showAlert)}} className="ml-2 btn btn-success">No</div>
                        </div>
                    </div>
                : 
                ''
            }
        </div>
    )
}

export default AdminProductCard
