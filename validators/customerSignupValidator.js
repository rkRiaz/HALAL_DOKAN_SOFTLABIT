const Customer = require('../models/Customer')
const { check } = require('express-validator')

const customerSignupValidator = [
    
        check('name')
        .not().isEmpty().withMessage('Please enter your name')
        .trim(),
       
        check('phone')
            .not().isEmpty().withMessage('Phone number required')
            .isNumeric().withMessage('Please provide a valid phone number')
            // .normalizeEmail() //makes problem in console don't show required that means with email save user in db
        
            .custom(async phone => {
                let customer = await Customer.findOne({phone})
                if(customer) { throw new Error('Phone number already in use')}
                return true
            })
            .trim(),
          

        check('password')
        .not().isEmpty().withMessage('Please Enter Your Password')
        .isLength({ min: 5 }).withMessage('must be at least 5 chars long')
        .matches(/\d/).withMessage('must contain a number'),

        check('confirmPassword')
        .not().isEmpty().withMessage('Please Enter Your Confirm Password')
        .custom((confirmPassword, {req}) => {
            if(confirmPassword !== req.body.password) {
                throw new Error('Password does not match')
            }
            return true
        }),


        check('address')
        .not().isEmpty().withMessage('Must enter your address')
        .trim(),

        // check('email')
        // .trim()
        // .custom(async email => {
        //     let customer = await Customer.findOne({email})
        //     if(customer) {
        //         return Promise.reject('Email already exists ')
        //     }
        //     return true
        // })

]

module.exports = customerSignupValidator