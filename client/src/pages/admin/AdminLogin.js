import React, {useState} from 'react'
import {FaStarOfLife} from 'react-icons/fa'
import { adminLogin } from '../../store/actions/adminAction'
import { connect } from 'react-redux'
import './AdminLogin.css'

function AdminLoginPage(props) {
    const [loginName, setLoginName] = useState(null)
    const [loginPassword, setLoginPassword] = useState(null)


    let {error} = props.admin

    return (
            <div className="admin__login">
                <div className="admin__login__content">
                    <div className="h4 my-3 text-dark">ADMIN LOGIN</div>
                
                    <div className="form-group">
                        <label className="text-dark" htmlFor="name">Enter name <sup><FaStarOfLife style={{color: 'red', fontSize:'6px'}}/></sup></label>
                        <input name="loginName" type="text" onChange={e => setLoginName(e.target.value)} className={error.loginName ? "is-invalid form-control" : "form-control"} placeholder="Enter Name" />
                        <div className="invalid-feedback">{error.loginName}</div>
                    </div>
                    <div className="form-group">
                        <label className="text-dark" htmlFor="type">Enter password <sup><FaStarOfLife style={{color: 'red', fontSize:'6px'}}/></sup></label>
                        <input name="loginPassword" type="password" onChange={e => setLoginPassword(e.target.value)} className={error.loginPassword || error.message ? "is-invalid form-control" : "form-control"} placeholder="Enter Password" />
                        <div className="invalid-feedback">{error.loginPassword || error.message}</div>
                    </div>
                    <button onClick={() => props.adminLogin({loginName, loginPassword}, props.history)} className="btn btn-outline-dark">Login</button>
                    
                </div>
            </div>
    )
}

const mapStateToProps = state => ({
    admin: state.admin
})

export default connect(mapStateToProps, {adminLogin})(AdminLoginPage)


