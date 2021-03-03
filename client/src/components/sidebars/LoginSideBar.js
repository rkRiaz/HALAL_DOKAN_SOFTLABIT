import React, {useState, useEffect} from 'react';
import './LoginSideBar.css'
import {Link, useHistory, withRouter} from 'react-router-dom' 
import {connect} from 'react-redux'

import {login} from '../../store/actions/customerAction'
import {loginSideBar} from '../../store/actions/sideBarAction'

import {FaStarOfLife} from 'react-icons/fa'
import { MdClose } from 'react-icons/md'



const LoginSideBar = (props) => {
    const [loginPhone, setLoginPhone] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [error, setError] = useState({})


    const history = useHistory()

    useEffect(() => {
        setError(props.customer.error)
    },[props.customer.error])

    let toggle = e => {
        e.preventDefault()
        props.loginSideBar()
    }

    let loginSubmitHandler = event => {
        event.preventDefault()
        props.login({loginPhone, loginPassword}, history)
    }

    let signUpHandler = e => {
        e.preventDefault()
        props.loginSideBar()
        props.history.push("/customerRegistration")
    }


    return (
        <div>
            <div className={props.sideBar.loginSideBar ? "login__sidebar" : "login__sidebar login__sidebar__off"}>
                    <div className="p-3">
                        {/* {props.history.location.pathname === "/cart" ? 
                        <div className="h3">Please login </div> 
                        
                        } */}
                        <div className="h3">Login</div> 
                        <div onClick={toggle} className={props.sideBar.loginSideBar ? "login__closebtn" : ''}><MdClose/></div>
                        <hr/>
                        <form onSubmit={loginSubmitHandler}>
                            <div className="form-group">
                                <label className="text-dark" htmlFor="name">Enter phone number <sup><FaStarOfLife style={{color: 'red', fontSize:'6px'}}/></sup></label>
                                <input name="loginPhone" type="number" onChange={e => setLoginPhone(e.target.value)} className={error.loginPhone ? "is-invalid form-control" : "form-control"} placeholder="0168-XXXXXXX" />
                                <div className="invalid-feedback">{error.loginPhone}</div>
                            </div>
                            <div className="form-group">
                                <label className="text-dark" htmlFor="type">Enter password</label>
                                <input name="loginPassword" type="password" onChange={e => setLoginPassword(e.target.value)} className={error.loginPassword || error.message ? "is-invalid form-control" : "form-control"} placeholder="" />
                                <div className="invalid-feedback">{error.loginPassword ? error.loginPassword : error.message}</div>
                            </div>
                            <button type="submit" className="my-3 btn btn-outline-dark">Login</button>
                            <div onClick={signUpHandler}><p>Not have an account? <span className="text-primary">Click here to register</span></p></div>
                        </form>

                           {props.history.location.pathname === "/cart" ? 
                           <>
                                <div className="mt-5 h4">Or</div>
                                <div className="">
                                    <Link to="/shippingInformation"><button className="btn btn-danger mt-2">continue as a guest</button></Link>
                                </div> 
                            </>
                            : ""
                            }
                    </div>
                </div>
                <div onClick={toggle} className={props.sideBar.loginSideBar ? "loginSideBar__closeBtn" : "loginSideBar__closeBtn login__sidebar__off"}></div>
        </div>
    );
}

const mapStateToProps = state => ({
    admin: state.admin,
    customer: state.customer,
    sideBar: state.sideBar
})

export default connect(mapStateToProps, {login, loginSideBar})(withRouter(LoginSideBar));
