const router = require('express').Router()
const customerSignupValidator= require('../validators/customerSignupValidator')
const customerLoginValidator= require('../validators/customerLoginValidator')
const customerEditInfoValidator= require('../validators/customerEditInfoValidator')
const checkUserAuth = require('../middlewares/check-user-auth')
const checkAdminAuth = require('../middlewares/check-admin-auth')
const {
    registration,
    login,
    getLoginCustomerInfo,
    changepassword,
    editInfo,
    dashboard
} = require('../controllers/customerController')

router.post('/registration', customerSignupValidator, registration) //http://localhost:8080/api/customer/registration
router.put('/editInfo', customerEditInfoValidator, checkUserAuth, editInfo) //http://localhost:8080/api/customer/editInfo
router.put('/login', customerLoginValidator, login) //http://localhost:8080/api/customer/login
router.get('/loginCustomerInfo', checkUserAuth, getLoginCustomerInfo) //http://localhost:8080/api/customer/loginCustomerInfo
router.put('/changePassword', checkUserAuth, changepassword) //http://localhost:8080/api/customer/changePassword

module.exports = router