import React, {useState, useEffect} from 'react'
import './CustomerLogin.css'
import {connect} from 'react-redux'
import {login} from '../../store/actions/customerAction'
import {Link, useHistory} from 'react-router-dom'
import {Button, Form} from 'react-bootstrap'
import home from '../../assets/icons/home.svg'
import rightArrow from '../../assets/icons/right-arrow.svg'
import {AiOutlineUser, AiOutlineLock} from 'react-icons/ai'

function CustomerLogin(props) {
    const[loginPhone, setLoginPhone] = useState('')
    const[loginPassword, setLoginPassword] = useState('')
    const[error, setError] = useState({})

    useEffect(() => {
        setError(props.customer.error)
    }, [props.customer.error])
    
    let history = useHistory() 

    const submit = e => {
        e.preventDefault()
        props.login({loginPhone, loginPassword}, history)
    }

  
    return (
        <div className="login">
            <div className="login__container">
                 {/* loginTop starts */}
                 <div className="loginTop">
                    <img src={home} alt=""/>
                    <Link to="#">ACCOUNT</Link>
                    <img className="loginTopArrowIcon" src={rightArrow} alt=""/>
                    <Link to="#">LOGIN</Link>
                </div>
                {/* loginTop ends */}

                {/* login__headline starts */}
                <div className="login__headline">ACCOUNT LOGIN</div>
                {/* login__headline ends */}

                {/* login__content starts */}
                <div className="login__content row">
                    <div className="login__contentLeft col">
                        <h3>NEW CUSTOMER</h3>
                        <p> By creating an account you will be able to shop faster, be up to date on an 
                            order's status, and keep track of the orders you have previously made.
                        </p>
                        <Link to="/customerRegistration">
                            <Button className="btn-primary login__contentLeftBtn" variant="dark">Registration Now</Button>
                        </Link>
                    </div>
                    <div className="login__contentRight col">
                        <h3>RETURNING CUSTOMER</h3>
                        <Form onSubmit={submit} className="login__contentRightForm">
                            <Form.Group controlId="formGroupEmail" className="login__contentRightFormGroup">
                                <Form.Control 
                                    onChange={e => setLoginPhone(e.target.value)} 
                                    className="login__contentRightInput" 
                                    type="text" 
                                    placeholder="Phone No"
                                    isInvalid={error.loginPhone ? true : false}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {error.loginPhone}
                                </Form.Control.Feedback>
                                <AiOutlineUser className="login__contentRightFormIcon"/>
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword" className="login__contentRightFormGroup">
                                <Form.Control 
                                    onChange={e => setLoginPassword(e.target.value)} 
                                    className="login__contentRightInput" 
                                    type="text" 
                                    placeholder="Password" 
                                    isInvalid={error.loginPassword || error.message ? true : false}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {error.loginPassword ? error.loginPassword : error.message}
                                </Form.Control.Feedback>
                                <AiOutlineLock className="login__contentRightFormIcon"/>
                            </Form.Group>
                            <p><Link to="/forgetPassword">Forget Password ?</Link></p>
                            <Button className="login__contentRightBtn" type="submit" variant="danger">Login</Button>
                        </Form>
                    </div>
                </div>
                {/* login__content ends */}

            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    customer: state.customer,
})
export default connect(mapStateToProps, {login})(CustomerLogin)
