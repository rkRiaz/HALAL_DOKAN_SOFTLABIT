import React from 'react'
import './AdminDashboard.css'
import AdminLayout from './AdminLayout'

const AdminDashboard = (props) => {

    return (
        <AdminLayout>
            <div className="display-4 text-center" style={{marginTop: 300}}>
                Welcome To Admin's Dashboard
            </div>
        </AdminLayout>
    )
}
export default AdminDashboard
