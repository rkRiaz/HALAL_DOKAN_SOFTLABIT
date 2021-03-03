import React from 'react'
import { Link } from 'react-router-dom'
import notfound from '../assets/images/notfound.jpg'

function NotFound() {
    return (
        <div className="container" style={{display: 'grid', placeItems: 'center', height: '100vh'}}>
            <img width= "40%" src={notfound} alt=""/>
            <Link className="text-danger" to="/"><h3>Go back to shop</h3></Link> 
        </div>
    )
}

export default NotFound
