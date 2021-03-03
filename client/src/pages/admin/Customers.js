import React, {useState, useEffect} from 'react'
import "./Customers.css"
import AdminLayout from './AdminLayout'
import axios from 'axios'
import Moment from 'react-moment'
import Loading from '../../components/Loading'
import {connect} from 'react-redux'

const Customers = (props) => {
    const [customers, setCustomers] = useState('')

    useEffect(() => {  
        axios.get("/api/admin/all-customers", {
            headers: {
                'Administrator': `Bearer ${props.admin.adminToken}` 
            }
        })
        .then(res => {
            setCustomers(res.data.allCustomers)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    
        return (
            <AdminLayout>
                {
                    customers ?
                        customers.length === 0 ?
                        <div className="display-4 text-center">
                            Sorry! No customer found in the database
                        </div>

                        :

                        <div className="customers">
                            <div className="customers__chart">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Image</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Address</th>
                                            {/* <th scope="col">Email</th> */}
                                            <th scope="col">Registration Date</th>
                                            <th scope="col">Orders</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { customers.map(customer => (
                                        <tr className="tableRow" key={customer._id}>
                                            <td><img style={{ width: 70, height: 50 }} src={`/images/`} alt="" /></td>
                                            <td>{customer.name}</td>
                                            <td>{customer.phone}</td>
                                            <td>{customer.address}</td>
                                            {/* <td>{customer.email}</td> */}
                                            <td><Moment format="D MMMM, h:mm A">{customer.createdAt}</Moment></td>
                                            <td><div className="btn btn-warning">See</div></td>
                                        </tr>
                                        ))
                                    }    
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        :

                        <div className="loading">
                            <Loading/>
                        </div>
                }
            </AdminLayout>
        )
    }    




const mapStateToProps = state => ({
    admin: state.admin,
})

export default connect(mapStateToProps, {})(Customers)

