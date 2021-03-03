const {Schema, model} = require('mongoose')

const orderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
    },
    shippingInformation: {
        type: Object,
    },
    cart_products: {
        type: [Object],
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    },
    payment: {
        method: {
            type: String,
            required: true
        },
        transactionId: {
            type: String,
        }
    },
    status: {
        paid: {
            message: String,
            time: String,
        },
        delivered: {
            message: String,
            time: String,  
        },
    },

}, {timestamps: true})

const Order = model('Order', orderSchema)
module.exports = Order

