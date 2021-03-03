import React, {useState} from 'react'
import './AdminChangePassword.css'
import {connect} from 'react-redux'
import {adminLogout} from '../../store/actions/adminAction'
import {Button, Form} from 'react-bootstrap'
import { useHistory} from 'react-router-dom'
import axios from 'axios'
import {AiOutlineLock} from 'react-icons/ai'
import AdminLayout from './AdminLayout'




const AdminChangePassword = (props) => {
    const[oldPassword, setOldPassword] = useState('')
    const[newPassword, setNewPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')
    const [warning, setWarning] = useState(null)

     let history = useHistory() 
    
     let submit = e => {
        e.preventDefault()
        axios.put("/api/admin/change-password", {oldPassword, newPassword, confirmPassword}, {
            headers: {
                'Administrator': `Bearer ${props.admin.adminToken}` 
            }
        })
            .then(res => {
                setWarning(res.data.message)
                if(res.data.message === "Successfully changed password") {
                    props.adminLogout(history)
                }
            })
            .catch(e => console.log(e))
    }


    return (
        <AdminLayout>
            <div className="adminChangePassword">
                <div className="adminChangePassword__Container">
                    <div className="adminChangePassword__headline">Change Admin Password</div>
                    <Form onSubmit={submit} className="adminChangePassword__form">
                    {/* warning alert starts */}
                        <div style={warning === null ? {'opacity': 0} : {'opacity': 1}}  className="alert alert-warning alert-dismissible fade show text-center" role="alert">
                            <strong>&nbsp;&nbsp;&nbsp;{warning}</strong>
                            <button onClick={e => setWarning(null)} type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {/* warning alert ends */}
                        <Form.Group controlId="formGroupOldPassword" className="adminChangePassword__FormGroup">
                            <Form.Control 
                                onChange={e => setOldPassword(e.target.value)} 
                                className="adminChangePassword__formInput" 
                                type="password" 
                                placeholder="Enter Your Current Password" 
                            />
                            <AiOutlineLock className="adminChangePassword__FormGroupIcon"/>
                        </Form.Group>
                        <Form.Group controlId="formGroupNewPassword" className="adminChangePassword__FormGroup">
                            <Form.Control 
                                onChange={e => setNewPassword(e.target.value)} 
                                className="adminChangePassword__formInput" 
                                type="password" 
                                placeholder="Enter Your New Password" 
                            />
                            <AiOutlineLock className="adminChangePassword__FormGroupIcon"/>
                        </Form.Group>
                        <Form.Group controlId="formGroupConfirmPassword" className="adminChangePassword__FormGroup">
                            <Form.Control 
                                onChange={e => setConfirmPassword(e.target.value)} 
                                className="adminChangePassword__formInput" 
                                type="password" 
                                placeholder="Enter Your Confirm Password" 
                            />
                            <AiOutlineLock className="adminChangePassword__FormGroupIcon"/>
                        </Form.Group>
                        <Button className="adminChangePassword__FormBtn" type="submit" variant="danger">Change Password</Button>
                    </Form>
                </div> 
            </div>
        </AdminLayout>

    )
}
const mapStateToProps = state => ({
    admin: state.admin,
})
export default connect(mapStateToProps, {adminLogout})(AdminChangePassword)
