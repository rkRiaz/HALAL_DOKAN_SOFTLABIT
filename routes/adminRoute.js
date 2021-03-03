const router = require('express').Router()
const adminLoginValidator = require('../validators/adminValidator')
const checkAdminAuth = require('../middlewares/check-admin-auth')
let {loginController, registration ,changePassword, allCustomers} = require('../controllers/adminController')

router.put("/admin-login", adminLoginValidator, loginController)//http://localhost:8080/api/admin/admin-login
router.put('/change-password', checkAdminAuth, changePassword) //http://localhost:8080/api/admin/change-password
router.get("/all-customers", checkAdminAuth, allCustomers)//http://localhost:8080/api/admin/all-customers
router.post('/registration', registration) //http://localhost:8080/api/admin/registration


module.exports = router

