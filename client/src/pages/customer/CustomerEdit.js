import React, {useState, useEffect} from 'react'
import './CustomerEdit.css'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button, Form} from 'react-bootstrap'
import home from '../../assets/icons/home.svg'
import rightArrow from '../../assets/icons/right-arrow.svg'
import {GoLocation} from 'react-icons/go'
import {AiOutlineUser, AiOutlinePhone} from 'react-icons/ai'

function CustomerEdit(props) {
    const[values, setValues] = useState({
        name: '',
        phone: '',
        address: '',
        // password: '',
        // confirmPassword: '',
        error: {}
    })


    useEffect(() => {
        axios.get(`http://localhost:8080/api/customer/loginCustomerInfo`, {
            headers: {
                Authorization: `Bearer ${props.customer.customerToken}`
            }
        }) 
        .then(res => {
            setValues({
                ...values,
                name: res.data.customerInfo.name,
                phone: res.data.customerInfo.phone,
                address: res.data.customerInfo.address
            })
        })
        .catch(err => console.log(err))
    }, [])


    const change = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };

    const submit = e => {
        e.preventDefault() 
        axios.put(`/api/customer/editInfo`, values, {
            headers: {
                'Authorization': `Bearer ${props.customer.customerToken}` 
            }
        })
        .then(res => {
            alert(res.data.message)
        })
        .catch(err => {
            setValues({ ...values, error: err.response.data });
        })
    }

    return (
        <div className="edit">
            <div className="edit__container">
                 {/* editTop starts */}
                 <div className="editTop">
                    <img src={home} alt=""/>
                    <Link to={props.customer.customerLoggedIn ? '/customerDashboard' : "#"}>ACCOUNT</Link>
                    <img className="editTopArrowIcon" src={rightArrow} alt=""/>
                    <Link to="#">EDIT</Link>
                </div>
                {/* editTop ends */}

                {/* edit__headline starts */}
                <div className="edit__headline">ACCOUNT EDIT</div>
                {/* edit__headline ends */}


                {/* edit__content starts */}
                <div className="edit__content">
                    <h3>EDIT INFORMATION</h3>
                    <Form onSubmit={submit} className="edit__contentForm">
                        <div className="edit__contentFormInputs">
                            <Form.Group controlId="formGroupEmail" className="edit__contentFormGroup">
                                <Form.Control onChange={change('name')} isInvalid={values.error.name ? true : false} className="edit__contentInput" type="text" value={values.name ? values.name : ''} />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {values.error.name ? values.error.name : ""}
                                </Form.Control.Feedback>
                                <AiOutlineUser className="edit__contentFormIcon"/>
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword" className="edit__contentFormGroup">
                                <Form.Control onChange={change('phone')} isInvalid={ values.error.phone ? true : false} className="edit__contentInput" type="number" value={values.phone ? values.phone : ''} />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {values.error.phone ? values.error.phone : ""}
                                </Form.Control.Feedback>
                                <AiOutlinePhone className="edit__contentFormIcon"/>
                            </Form.Group>  
                            <Form.Group controlId="formGroupPassword" className="edit__contentFormGroup">
                                <Form.Control onChange={change('address')} isInvalid={values.error.address ? true : false} className="edit__contentInput" type="text" value={values.address ? values.address : ''} />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {values.error.address ? values.error.address  : ""}
                                </Form.Control.Feedback>
                                <GoLocation className="edit__contentFormIcon"/>
                            </Form.Group>           
                        </div>
                        <Button className="edit__contentBtn" type="submit">SAVE INFORMATION</Button>
                    </Form>
                </div>
                {/* edit__content ends */}

            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    customer: state.customer
})
export default connect(mapStateToProps, {})(CustomerEdit)
