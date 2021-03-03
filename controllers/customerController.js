const bcrypt = require('bcrypt') 
const { validationResult } = require('express-validator')
const {errorFormatter} = require('../utils/errorFormatter')
const Customer = require('../models/Customer')
const Order = require('../models/Order')
const jwt = require('jsonwebtoken')

exports.registration = async (req, res, next) => {
    const { name, phone, email, address, password, confirmPassword } = req.body
    
    let errors = validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()) {
        return res.status(422).json(errors.mapped())
    }
    
    try{
        // let customer = await Customer.findOne({phone})
        let hashedPassword = await bcrypt.hash(password, 11)
        let match = await bcrypt.compare(confirmPassword, hashedPassword)
        if(match) {
            const customer = new Customer({
                name,
                phone,
                address,
                email,   
                password: hashedPassword 
            })
            let newCustomer = await customer.save() 
            res.status(200).json({
                message: "Successfully Registered",
                newCustomer
            })
        }

    }catch (e) {
        next(e)
    }

}

exports.login = async (req, res, next) => {
    const { loginPhone, loginPassword } = req.body
    let errors = validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()) {
        return res.status(422).json(errors.mapped())
    }
    
    try{
        let findCustomer = await Customer.findOne({phone: loginPhone})
        let match = await bcrypt.compare(loginPassword, findCustomer.password)
        if(!match) {
            return res.status(401).json({message: 'password is not correct'})
        } else {
            let token = jwt.sign({
                _id: findCustomer._id,
                name: findCustomer.name,
            }, 'SECRET', {expiresIn: '24h'})

            res.status(200).json({
                message: 'Login Success',
                token: token,
                expiresIn: 86400 
            })
        }
    }

    catch(e) {
        next(e)
    }
}

exports.getLoginCustomerInfo = async(req, res, next) => {
    // console.log(req.userData.userId)
    // User Shop ID from check-user-auth token..
    const loginCustomerId = req.userData.userId;
    try {
        let findCustomer = await Customer.findOne({_id: loginCustomerId})
        
        if(findCustomer) {
            res.status(200).json({
                customerInfo: findCustomer,
                message: 'Successfully Get Customer info.'
            })
        } else {
            res.status(200).json({
                message: 'You are not registered customer'
            })
        }
    } catch(e) {
        next(e)
    }
    
}

exports.editInfo = async (req, res, next) => {
    try{
        const loginCustomerId = req.userData.userId;
        const { name, phone, address } = req.body
        const cart = req.body
       
        if(!Array.isArray(cart)) {
            let errors = validationResult(req).formatWith(errorFormatter)
            if(!errors.isEmpty()) {
                return res.status(422).json(errors.mapped())
            }
        }
        //using passport js login customer accessed globally
        let findCustomer = await Customer.findOne({_id: loginCustomerId})
        if(Array.isArray(cart)) {
            await Customer.findOneAndUpdate(
                {_id: loginCustomerId},
                {$set: {cart}},
                {new: true}
            )
        } else {
            const updateInfo = {
                name,
                phone,
                address
            }
            let updatedCustomer = await Customer.findOneAndUpdate(
                {_id: loginCustomerId},
                {$set: updateInfo},
                {new: true}
            )
            return res.status(200).json({
                message: "Information updated successfully",
                updatedCustomer: updatedCustomer
            })
        }
 
    } catch (e) {
        next(e)
    }

}



exports.changepassword = async(req, res, next) => {
    let{ oldPassword, newPassword, confirmPassword } = req.body
    const loginCustomerId = req.userData.userId;
    try {
        let findCustomer = await Customer.findOne({_id: loginCustomerId})
        if(findCustomer) {
            if(newPassword !== confirmPassword) {
               return res.status(200).json({
                   message: "Confirm password does not match"
               })
            }
            if(oldPassword && newPassword && confirmPassword !== "" || null) {
                let match = await bcrypt.compare(oldPassword, findCustomer.password)
                if(match) {
                    let hash = await bcrypt.hash(newPassword, 11)
                    await Customer.findOneAndUpdate(
                        {_id: loginCustomerId},
                        {$set: {password: hash}},
                        {new: true},
                    )
                    return res.status(200).json({
                        message: "Successfully changed password"
                    }) 
                } else {
                    return res.status(200).json({
                        message: 'Old password does not match'
                    }) 
                }
             } else {
                 res.status(200).json({
                    message: "Must Fillup All Fields"
                })
             }
        }
    }catch(e) {
        next(e)
    }
}


exports.dashboard = async(req, res, next) => {
    const loginCustomerId = req.userData.userId;
    let orderedProducts = await Order.find({loginCustomerId})
    try{
    
             res.status(200).json({
                customer,
                orderedProducts: orderedProducts.reverse()
            })
     
         res.status(400).json("error")
       
    }catch(e) {
        next(e)
    }
     
}