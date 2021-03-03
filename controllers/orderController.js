const Customer = require('../models/Customer')
const Order = require('../models/Order')

exports.allOrders = async (req, res, next) => {
    try{
        let orders = await Order.find()
                                .populate({
                                    path:'customer'
                                })
        res.status(200).json({
            orders: orders.reverse()
        })
    } catch(e) {
        next(e)
    }
}

exports.ordersByCustomerId = async (req, res, next) => {
    const loginCustomerId = req.userData.userId;
    try{
        let orders = await Order.find({customer: loginCustomerId}).populate({
            path: 'customer'
        })
        console.log(orders)
        res.status(200).json({
            orders: orders.reverse()
        })
    } catch(e) {
        next(e)
    }
}

exports.createOrder = async (req, res, next) => {
    try{
        let findCustomer = await Customer.findOne({name: 'guest'})
        let {customerId, shippingInformation, cart_products, subTotal, payment} = req.body
    
        let order = new Order({
            customer: customerId ? customerId : findCustomer._id,
            shippingInformation: shippingInformation,
            cart_products,
            subTotal,
            payment,
            status: {
                paid: {
                    message: '',
                    time: '',
                },
                delivered: {
                    message: '',
                    time: '',  
                },
            }
        })
      
        let newOrder = await order.save()
        res.status(200).json({
            message: "Welcome! Your order placed successfully",
            newOrder
        })
    } catch(e) {
        next(e)
    }
}


exports.updateOrder = async (req, res, next) => {
    let {orderId} = req.params
    let order = await Order.findById(orderId)
    try{
        let {paid, delivered} = req.body
        
            if(paid) {
                let update = {
                    status: {
                        paid: paid,
                        delivered: {
                            message: '',
                            time: '',  
                        },
                    } 
                }
                await Order.findOneAndUpdate(
                    {_id: orderId},
                    {$set: update},
                    {new: true}
                )
                res.status(200).json({
                    message: `payment status updated `
                })
            }
            if(delivered) {
                let update = {
                    status: {
                        paid: order.status.paid.message ? {message: order.status.paid.message, time: order.status.paid.time} : {message: 'payment completed', time: new Date()},
                        delivered: delivered
                    } 
                }
                await Order.findOneAndUpdate(
                    {_id: orderId},
                    {$set: update},
                    {new: true}
                )
                res.status(200).json({
                    message: `delivery status updated `
                })
            }

    
    } catch(e) {
        next(e)
    }
}

exports.deleteOrder = async (req, res, next) => {
    let {orderId} = req.params
    try{
        let deltedOrder = await Order.findByIdAndDelete(orderId)
                                
        if(deltedOrder) {
            res.status(200).json({
                message: `Successfully deleted order ${deltedOrder._id}`
            })
        }
    } catch(e) {
        next(e)
    }
}
