const Customer = require('../models/Customer')
const { body } = require('express-validator')
const bcrypt = require('bcrypt')

const customerLoginValidator = [
    
        body('loginPhone')
        .not().isEmpty().withMessage('Phone number required')
        .isNumeric().withMessage('Please provide a valide phone number')
        .custom(async phone => {
            let customer = await Customer.findOne({phone})
            if(!customer) {return Promise.reject('The phone number is not registered yet')}
            return true
        })
        .trim(),


        body('loginPassword')
        .not().isEmpty().withMessage('Please Enter Your Password')
        // .custom(async(loginPassword, {req}) => {
        //     let customer = await Customer.findOne({phone: req.body.loginPhone})
        //     let match = await bcrypt.compare(loginPassword, customer.password)
        //     if(!match) {return Promise.reject('Invalid Phone or Password')}
        //     return true
        // })

        



]

module.exports = customerLoginValidator