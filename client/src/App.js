import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Category from './pages/Category'
import SubCategory from './pages/SubCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'

// customer route
import CustomerLogin from './pages/customer/CustomerLogin'
import CustomerRegistration from './pages/customer/CustomerRegistration'
import CustomerEdit from './pages/customer/CustomerEdit'
import CustomerChangePassword from './pages/customer/CustomerChangePassword'
import CustomerDashboard from './pages/customer/CustomerDashboard'
import CustomerOrder from './pages/customer/CustomerOrder'

import ShippingPage from './pages/customer/ShippingPage'
import PaymentPage from './pages/customer/PaymentPage'

import NotFound from './pages/NotFound'


// import Ordered from './pages/customer/Ordered'
// import OrderedDetails from './pages/customer/OrderedDetails'


// admin Routes
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLogin from './pages/admin/AdminLogin'
import AdminChangePassword from './pages/admin/AdminChangePassword'

import Customers from './pages/admin/Customers';
import AllProducts from './pages/admin/AllProducts'
import AddProduct from './pages/admin/AddProduct'
import EditProduct from './pages/admin/EditProduct'
import AllOrders from './pages/admin/AllOrders'


// import EditProduct from './pages/admin/EditProduct'
// import Customers from './pages/admin/Customers'
// import AllOrders from './pages/admin/AllOrders'

import CartSideBar from './components/sidebars/CartSideBar'
import LoginSideBar from './components/sidebars/LoginSideBar'

import PrivateRoute from './components/PrivateRoute'

import { connect } from 'react-redux';
import ScrollToTop from './ScrollToTop';



function App(props) {
  return (
    <div className="app">
      <div className="app__body">
          <Router>
              <ScrollToTop/>
            {/* login sidebar starts */}
              <LoginSideBar/>
            {/* login sidebar ends */}
            {/* cart sidebar starts */}
              <CartSideBar/>
            {/* cart sidebar ends */}
            
            <Switch>
              <Route exact path="/"><Header/><Home/><Footer/></Route>
              <Route exact path="/subCategory/:subCategorySlug"><Header/><SubCategory/><Footer/></Route>
              <Route exact path="/category/:categorySlug"><Header/><Category/><Footer/></Route>
              <Route exact path="/product/:productId"><Header/><ProductDetails/><Footer/></Route>

              {/* customer Routes */}
              <Route exact path="/customerRegistration"><Header/><CustomerRegistration/><Footer/></Route>
              <PrivateRoute exact path="/customerEdit"><Header/><CustomerEdit/><Footer/></PrivateRoute>
              <Route exact path="/customerLogin"><Header/><CustomerLogin/><Footer/></Route>
              <PrivateRoute exact path="/customerDashboard"><Header/><CustomerDashboard/><Footer/></PrivateRoute>
              <PrivateRoute exact path="/customerOrder"><Header/><CustomerOrder/><Footer/></PrivateRoute>
              <PrivateRoute exact path="/customerChangePassword"><Header/><CustomerChangePassword/><Footer/></PrivateRoute>
              <Route exact path="/shippingInformation"><Header/><ShippingPage/><Footer/></Route>
              <Route exact path="/paymentInformation"><Header/><PaymentPage/><Footer/></Route>
              {/* <Route exact path="/customer/ordered" component={Ordered} />
              <Route exact path="/customer/ordered/:orderId" component={OrderedDetails} /> */}

              {/* Admin Routes */}
                <Route exact path="/adminDashboard"  component={props.admin.adminLoggedIn ? AdminDashboard : AdminLogin} />
                <Route exact path="/adminChangePassword"  component={props.admin.adminLoggedIn ? AdminChangePassword : AdminLogin} />
                <Route exact path="/adminCustomers"  component={props.admin.adminLoggedIn ? Customers : AdminLogin} /> 
                <Route exact path="/admin/all-orders"  component={AllOrders} /> 
                <Route exact path="/admin/all-products"  component={props.admin.adminLoggedIn ? AllProducts : AdminLogin} /> 
                <Route exact path="/admin/add-product" component={props.admin.adminLoggedIn ? AddProduct : AdminLogin} /> 
                <Route exact path="/admin/edit-product/:productId" component={props.admin.adminLoggedIn ? EditProduct : AdminLogin} /> 
                <Route exact path="/adminLogin"  component={props.admin.adminLoggedIn ? AdminDashboard : AdminLogin} />
              
                <Route exact path="/cart"><Header/><Cart/><Footer/></Route>
                <Route path="*"><NotFound/></Route>
            </Switch>
            
        </Router>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  admin: state.admin
})

export default connect(mapStateToProps, {})(App);
