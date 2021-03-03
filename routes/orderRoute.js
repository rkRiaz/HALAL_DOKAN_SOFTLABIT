const router = require('express').Router()
let {allOrders,ordersByCustomerId, createOrder, updateOrder, deleteOrder} = require('../controllers/orderController')
const checkUserAuth = require('../middlewares/check-user-auth')
const checkAdminAuth = require('../middlewares/check-admin-auth')

router.get("/all-orders", checkAdminAuth, allOrders) //http://localhost:8080/api/order/all-orders
router.get("/orders-by-customer-id", checkUserAuth, ordersByCustomerId) //http://localhost:8080/api/order/orders-by-customer-id
router.post("/create-order", createOrder) //http://localhost:8080/api/order/create-order
router.put("/update-order/:orderId", updateOrder) //http://localhost:8080/api/order/update-order/orderId
router.delete("/delete-order/:orderId", deleteOrder) //http://localhost:8080/api/order/delete-order/orderId


module.exports = router