import React, {useState} from 'react'
import './CustomerChangePassword.css'
import {connect} from 'react-redux'
import {logout} from '../../store/actions/customerAction'
import {Button, Form} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import home from '../../assets/icons/home.svg'
import rightArrow from '../../assets/icons/right-arrow.svg'
import {AiOutlineLock} from 'react-icons/ai'


const CustomerChangePassword = (props) => {
    const[oldPassword, setOldPassword] = useState('')
    const[newPassword, setNewPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')
    const [warning, setWarning] = useState(null)

    let history = useHistory() 
    

     let submit = e => {
        e.preventDefault()
        axios.put("/api/customer/changePassword", {oldPassword, newPassword, confirmPassword}, {
            headers: {
                'Authorization': `Bearer ${props.customer.customerToken}` 
            }
        })
            .then(res => {
                setWarning(res.data.message)
                if(res.data.message === "Successfully changed password") {
                    props.logout()
                    history.push('/customerLogin')
                }
            })
            .catch(e => alert(e.response.data.message))
    }


    return (
            <div className="changePassword">
                <div className="changePassword__Container">
                     {/* loginTop starts */}
                    <div className="changePassword__Top">
                        <img src={home} alt=""/>
                        <Link to={props.customer.customerLoggedIn ? '/customerDashboard' : "#"}>ACCOUNT</Link>
                        <img className="changePassword__TopIcon" src={rightArrow} alt=""/>
                        <Link to="#">CHANGE PASSWORD</Link>
                    </div>
                    {/* loginTop ends */}
                    {/* login__headline starts */}
                    <div className="changePassword__headline">CHANGE PASSWORD</div>
                    {/* login__headline ends */}


                    <Form onSubmit={submit} className="changePassword__form">
                    {/* warning alert starts */}
                        <div style={warning === null ? {'opacity': 0} : {'opacity': 1}}  className="alert alert-warning alert-dismissible fade show text-center" role="alert">
                            <strong>&nbsp;&nbsp;&nbsp;{warning}</strong>
                            <button onClick={e => setWarning(null)} type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {/* warning alert ends */}
                        <Form.Group controlId="formGroupOldPassword" className="changePassword__FormGroup">
                            <Form.Control 
                                onChange={e => setOldPassword(e.target.value)} 
                                className="changePassword__formInput" 
                                type="password" 
                                placeholder="Enter Your Current Password" 
                            />
                            <AiOutlineLock className="changePassword__FormGroupIcon"/>
                        </Form.Group>
                        <Form.Group controlId="formGroupNewPassword" className="changePassword__FormGroup">
                            <Form.Control 
                                onChange={e => setNewPassword(e.target.value)} 
                                className="changePassword__formInput" 
                                type="password" 
                                placeholder="Enter Your New Password" 
                            />
                            <AiOutlineLock className="changePassword__FormGroupIcon"/>
                        </Form.Group>
                        <Form.Group controlId="formGroupConfirmPassword" className="changePassword__FormGroup">
                            <Form.Control 
                                onChange={e => setConfirmPassword(e.target.value)} 
                                className="changePassword__formInput" 
                                type="password" 
                                placeholder="Enter Your Confirm Password" 
                            />
                            <AiOutlineLock className="changePassword__FormGroupIcon"/>
                        </Form.Group>
                        <Button className="changePassword__FormBtn" type="submit" variant="danger">Change Password</Button>
                    </Form>
                </div> 
            </div>
    )
}
const mapStateToProps = state => ({
    customer: state.customer,
})
export default connect(mapStateToProps, {logout})(CustomerChangePassword)
