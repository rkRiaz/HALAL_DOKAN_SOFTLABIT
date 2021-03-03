import React, {useState} from 'react';
import './AdminLayout.css'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {adminLogout} from '../../store/actions/adminAction'
import { FiUsers, FiMenu } from 'react-icons/fi'
import { FaExchangeAlt} from 'react-icons/fa'
import { BiAddToQueue, BiLogOutCircle } from 'react-icons/bi'
import { RiShoppingCartLine } from 'react-icons/ri'
import { GoHome } from 'react-icons/go'
import adminImg from '../../assets/images/admin.jpg'

const AdminLayout = (props) => {
    const [isOpen, setIsOpen] = useState(true)
    
    let toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="layout">
            <div className="topbar p-3">
                 {/* <div className="h4"> <Link to="#">Admin Panel</Link></div> */}
                <Link to="/" className="h5"><BiLogOutCircle/>&nbsp;&nbsp;&nbsp;Go Back To Shop</Link>
                <div onClick={toggle} className="toggleIcon "><FiMenu color="white" style={{fontSize: '25px'}}/></div>
            </div>

            <div className={isOpen ? "leftBar showLeftBar" : "leftBar"} id="leftBarId">
                <Link to="/adminDashboard">
                <div className="p-4 text-center">
                    <div className="profilePic"><img src={adminImg} style={{width: 80, height: 80, borderRadius: "50%"}} alt=""/></div>
                    <div className="profileName h5 mt-2">{props.admin.adminInfo.userName}</div>
                </div>
                </Link>
                <div className="d-flex flex-column p-4">
                    <Link to="/adminDashboard" className="h5 mt-4"><GoHome/>&nbsp;&nbsp;&nbsp;Dashboard</Link> 
                    <Link to="/admin/all-orders" className="h5 mt-4"><RiShoppingCartLine/>&nbsp;&nbsp;&nbsp;Orders</Link> 
                    <Link to="/adminCustomers" className="h5 mt-4"><FiUsers/>&nbsp;&nbsp;&nbsp;Customers</Link> 
                    <Link to="/admin/all-products" className="h5 mt-4"><FiUsers/>&nbsp;&nbsp;&nbsp;All Products</Link> 
                    <Link to="/admin/add-product" className="h5 mt-4"><BiAddToQueue/>&nbsp;&nbsp;&nbsp;Add Product</Link> 
                    <Link to="/adminChangePassword" className="h5 mt-4"><FaExchangeAlt/>&nbsp;&nbsp;&nbsp;Change Password</Link> 
                    <Link to="" onClick={() => props.adminLogout(props.history)} className="h5 mt-4"><BiLogOutCircle/>&nbsp;&nbsp;&nbsp;LogOut</Link>
                </div>
            </div>
            <div className={isOpen ? "content" : "content contentMargin"}>
                {props.children}
            </div>
        </div>
        
      
    );
}

const mapStateToProps = state => ({
    admin: state.admin
})

export default connect(mapStateToProps, {adminLogout})(withRouter(AdminLayout));
